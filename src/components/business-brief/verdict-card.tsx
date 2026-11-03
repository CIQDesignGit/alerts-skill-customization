"use client";

import { useState } from "react";
import { Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@ciq-dev/ciq-design-system";

import {
  CAUSES,
  PERIODS,
  formatGap,
  formatMoney,
  nodeNote,
  pctOfPlan,
  shortLabel,
  type GapNode,
  type PeriodId,
  type Reason,
} from "@/lib/business-brief-data";
import { cn } from "@/lib/utils";

type VerdictCardProps = {
  scope: GapNode;
  period: PeriodId;
  reasons: Reason[];
};

export function VerdictCard({ scope, period, reasons }: VerdictCardProps) {
  const meta = PERIODS[period];
  const gap = scope.gap[period];
  const projected = period === "this";
  const soFar = projected && scope.level === "overall" ? meta.soFar : undefined;

  return (
    <section className="space-y-5 rounded-2xl border border-border-default bg-surface p-6 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="space-y-1">
          <p className="type-caption-strong tracking-wider text-fg-secondary uppercase">
            {projected ? "Projected gap to plan" : "Gap to plan"}
          </p>
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              className={cn(
                "type-display tabular-nums",
                gap < 0 ? "text-feedback-danger" : "text-feedback-success",
              )}
            >
              {formatGap(gap)}
            </span>
            <span className="type-body-lg text-fg-secondary">
              {pctOfPlan(scope, period)}% of {formatMoney(scope.plan[period])} plan
            </span>
          </p>
          {projected && <p className="type-body text-fg-secondary">Likely range {likelyRange(gap)}</p>}
        </div>

        {projected && <WeekProgress elapsed={PERIODS.this.soFar!.elapsed} />}
      </div>

      {soFar && (
        <p className="rounded-xl bg-surface-muted px-4 py-3 type-body text-fg-secondary">
          <span className="font-semibold text-fg-primary">
            So far {formatGap(soFar.actual - soFar.plan)}
          </span>{" "}
          · {formatMoney(soFar.actual)} of {formatMoney(soFar.plan)}. {soFar.note}
        </p>
      )}

      <AiSummary text={summarize(scope, period, reasons)} />
    </section>
  );
}

function WeekProgress({ elapsed }: { elapsed: number }) {
  const pct = Math.round(elapsed * 100);
  return (
    <div className="w-full max-w-56 space-y-1.5">
      <p className="type-caption text-fg-secondary">{pct}% of the week gone</p>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-subtle" aria-hidden>
        <div className="h-full rounded-full bg-brand-600" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function AiSummary({ text }: { text: string }) {
  const [rating, setRating] = useState<"up" | "down" | null>(null);
  return (
    <div className="flex items-start gap-3 border-t border-border-default pt-4">
      <Sparkles className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="type-caption-strong text-fg-brand">Ally summary</p>
        <p className="type-body-lg text-fg-primary">{text}</p>
      </div>
      <div className="flex shrink-0 gap-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Helpful"
          aria-pressed={rating === "up"}
          onClick={() => setRating(rating === "up" ? null : "up")}
          className={cn("size-8 text-fg-tertiary", rating === "up" && "bg-brand-50 text-fg-brand")}
        >
          <ThumbsUp aria-hidden />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Not helpful"
          aria-pressed={rating === "down"}
          onClick={() => setRating(rating === "down" ? null : "down")}
          className={cn("size-8 text-fg-tertiary", rating === "down" && "bg-brand-50 text-fg-brand")}
        >
          <ThumbsDown aria-hidden />
        </Button>
      </div>
    </div>
  );
}

function likelyRange(gap: number): string {
  const [low, high] = [gap * 1.12, gap * 0.9].sort((a, b) => a - b);
  return `${formatGap(low)} to ${formatGap(high)}`;
}

function summarize(scope: GapNode, period: PeriodId, reasons: Reason[]): string {
  const gap = scope.gap[period];
  const projected = period === "this";
  const [top] = reasons;

  if (gap >= 0 || !top) {
    const note = nodeNote(scope, period);
    return `${scope.label} is ${projected ? "on track to beat" : "ahead of"} plan${note ? `. ${note}.` : "."}`;
  }

  if (scope.level === "sku") {
    const next = projected ? ` Start with: ${top.action}.` : "";
    return `${nodeNote(scope, period)}.${next}`;
  }

  const who = top.skus.length === 1 ? shortLabel(top.skus[0].label) : `${top.skus.length} SKUs`;
  const share = `${formatGap(top.value).slice(1)} of the ${projected ? "projected " : ""}${formatGap(gap).slice(1)} gap`;
  return projected
    ? `${CAUSES[top.cause].label} on ${who} is driving ${share}. Start with: ${top.action}.`
    : `${CAUSES[top.cause].label} on ${who} drove ${share}.`;
}
