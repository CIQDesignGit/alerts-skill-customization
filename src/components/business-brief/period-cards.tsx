"use client";

import { useRef, type KeyboardEvent } from "react";

import {
  CAUSES,
  PERIOD_IDS,
  PERIODS,
  formatGap,
  formatMoney,
  nodeNote,
  pctOfPlan,
  reasonsFor,
  shortLabel,
  type GapNode,
  type PeriodId,
} from "@/lib/business-brief-data";
import { cn } from "@/lib/utils";

export const PERIOD_PANEL_ID = "brief-period-panel";

type PeriodCardsProps = {
  scope: GapNode;
  period: PeriodId;
  onPeriodChange: (period: PeriodId) => void;
};

export function PeriodCards({ scope, period, onPeriodChange }: PeriodCardsProps) {
  const refs = useRef<Partial<Record<PeriodId, HTMLButtonElement | null>>>({});

  function onKeyDown(event: KeyboardEvent) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = PERIOD_IDS.indexOf(period);
    const next =
      event.key === "Home"
        ? PERIOD_IDS[0]
        : event.key === "End"
          ? PERIOD_IDS.at(-1)!
          : PERIOD_IDS[(index + (event.key === "ArrowRight" ? 1 : -1) + PERIOD_IDS.length) % PERIOD_IDS.length];
    onPeriodChange(next);
    refs.current[next]?.focus();
  }

  return (
    <div role="tablist" aria-label="Week" onKeyDown={onKeyDown} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {PERIOD_IDS.map((id) => (
        <PeriodCard
          key={id}
          ref={(el) => {
            refs.current[id] = el;
          }}
          scope={scope}
          period={id}
          selected={id === period}
          onSelect={() => onPeriodChange(id)}
        />
      ))}
    </div>
  );
}

type PeriodCardProps = {
  ref: (el: HTMLButtonElement | null) => void;
  scope: GapNode;
  period: PeriodId;
  selected: boolean;
  onSelect: () => void;
};

function PeriodCard({ ref, scope, period, selected, onSelect }: PeriodCardProps) {
  const meta = PERIODS[period];
  const projected = period === "this";
  const gap = scope.gap[period];
  const plan = scope.plan[period];
  const soFar = projected && scope.level === "overall" ? meta.soFar : undefined;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={PERIOD_PANEL_ID}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      className={cn(
        "relative flex flex-col gap-2 rounded-2xl border bg-surface p-4 text-left shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-border-focus",
        selected
          ? "border-brand-600 ring-1 ring-brand-600"
          : "border-border-default hover:border-border-strong hover:bg-surface-muted",
      )}
    >
      <span className="flex items-baseline justify-between gap-4">
        <span className="type-body-strong text-fg-primary">
          {meta.tabLabel} <span className="font-normal text-fg-secondary">· {meta.range}</span>
        </span>
        <span className="type-caption-strong tracking-wider text-fg-secondary uppercase">
          {projected ? "Projected" : "Actual"}
        </span>
      </span>

      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <span
          className={cn(
            "type-heading tabular-nums",
            gap < 0 ? "text-feedback-danger" : "text-feedback-success",
          )}
        >
          {formatGap(gap)}
        </span>
        <span className="type-body text-fg-secondary tabular-nums">
          {formatMoney(plan + gap)} of {formatMoney(plan)} · {pctOfPlan(scope, period)}%
        </span>
      </span>

      {projected && meta.soFar && (
        <span className="flex items-center gap-3">
          <span className="h-1 w-24 shrink-0 overflow-hidden rounded-full bg-surface-subtle" aria-hidden>
            <span
              className="block h-full rounded-full bg-brand-600"
              style={{ width: `${Math.round(meta.soFar.elapsed * 100)}%` }}
            />
          </span>
          <span className="truncate type-caption text-fg-secondary tabular-nums">
            {Math.round(meta.soFar.elapsed * 100)}% of the week gone
            {soFar &&
              ` · so far ${formatGap(soFar.actual - soFar.plan)}, ${formatMoney(soFar.actual)} of ${formatMoney(soFar.plan)} · ${Math.round((soFar.actual / soFar.plan) * 100)}%`}
          </span>
        </span>
      )}

      <span className="line-clamp-2 type-body text-fg-secondary">{driverLine(scope, period)}</span>
    </button>
  );
}

function driverLine(scope: GapNode, period: PeriodId): string {
  const [top] = reasonsFor(scope, period);
  if (!top || scope.gap[period] >= 0) return `${nodeNote(scope, period)}.`;
  if (period === "this") return `Start with: ${top.action}.`;
  const who = top.skus.length === 1 ? shortLabel(top.skus[0].label) : `${top.skus.length} SKUs`;
  return `Biggest drag: ${CAUSES[top.cause].label.toLowerCase()} on ${who}, ${formatGap(top.value)}.`;
}
