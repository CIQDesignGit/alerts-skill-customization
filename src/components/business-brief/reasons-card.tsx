"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  PackageX,
  Search,
  ShoppingCart,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from "@ciq-dev/ciq-design-system";

import { AskChip, BriefCard } from "@/components/business-brief/brief-card";
import {
  CAUSES,
  formatGap,
  nodeNote,
  shortLabel,
  unattributed,
  type GapCause,
  type GapNode,
  type PeriodId,
  type Reason,
} from "@/lib/business-brief-data";
import { cn } from "@/lib/utils";

const ICON: Record<GapCause, LucideIcon> = {
  buyBox: ShoppingCart,
  stock: PackageX,
  search: Search,
  promo: Tag,
};

const VISIBLE = 3;

type ReasonsCardProps = {
  scope: GapNode;
  period: PeriodId;
  reasons: Reason[];
  onDrill: (id: string) => void;
  onAsk: (question: string) => void;
};

export function ReasonsCard({ scope, period, reasons, onDrill, onAsk }: ReasonsCardProps) {
  const [openCause, setOpenCause] = useState<GapCause | null>(
    scope.level === "sku" ? (reasons[0]?.cause ?? null) : null,
  );
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reasons : reasons.slice(0, VISIBLE);
  const hidden = reasons.length - visible.length;
  const spread = unattributed(scope, period);

  return (
    <BriefCard
      title={
        reasons.length === 0
          ? "Nothing to fix here"
          : period === "last"
            ? "Why we missed"
            : "What will close the gap"
      }
      description={
        reasons.length > 1 ? "Ranked by impact. Open a reason to see what's behind it." : undefined
      }
      aside={
        <Link
          href="/"
          className="inline-flex items-center gap-1 type-body-strong text-fg-brand hover:underline"
        >
          All actions in For You
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      }
    >
      {reasons.length === 0 ? (
        <div className="flex items-start gap-3 rounded-xl bg-feedback-success-subtle px-4 py-3">
          <CircleCheck className="mt-0.5 size-4 shrink-0 text-feedback-success" aria-hidden />
          <p className="type-body text-feedback-success">{nodeNote(scope, period)}.</p>
        </div>
      ) : (
        <ol className="divide-y divide-border-default border-y border-border-default">
          {visible.map((reason, index) => (
            <ReasonRow
              key={reason.cause}
              rank={index + 1}
              reason={reason}
              scope={scope}
              period={period}
              open={openCause === reason.cause}
              onOpenChange={(open) => setOpenCause(open ? reason.cause : null)}
              onDrill={onDrill}
              onAsk={onAsk}
            />
          ))}
        </ol>
      )}

      {reasons.length > VISIBLE && (
        <Button variant="ghost" size="sm" onClick={() => setShowAll(!showAll)} className="text-fg-brand">
          {showAll ? "Show fewer reasons" : `Show ${hidden} more ${hidden === 1 ? "reason" : "reasons"}`}
        </Button>
      )}

      {spread && spread.value < 0 && (
        <p className="type-body text-fg-secondary">
          The other {formatGap(spread.value).slice(1)} is spread across {spread.count} smaller SKUs, with no
          single cause.
        </p>
      )}
    </BriefCard>
  );
}

type ReasonRowProps = {
  rank: number;
  reason: Reason;
  scope: GapNode;
  period: PeriodId;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDrill: (id: string) => void;
  onAsk: (question: string) => void;
};

function ReasonRow({ rank, reason, scope, period, open, onOpenChange, onDrill, onAsk }: ReasonRowProps) {
  const Icon = ICON[reason.cause];
  const isSku = scope.level === "sku";
  const who =
    reason.skus.length === 1 ? shortLabel(reason.skus[0].label) : `${reason.skus.length} SKUs`;

  return (
    <li>
      <Collapsible open={open} onOpenChange={onOpenChange}>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-start gap-3 rounded-lg py-4 text-left transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-border-focus"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-fg-secondary">
              <Icon className="size-4" aria-hidden />
            </span>
            <span className="min-w-0 flex-1 space-y-1">
              <span className="flex items-baseline justify-between gap-4">
                <span className="type-body-strong text-fg-primary">
                  <span className="sr-only">{rank}. </span>
                  {CAUSES[reason.cause].label}
                  {!isSku && <span className="font-normal text-fg-secondary"> · {who}</span>}
                </span>
                <span className="shrink-0 type-body-strong tabular-nums text-feedback-danger">
                  {formatGap(reason.value)}
                </span>
              </span>
              <span className="block type-body text-fg-secondary">
                Fix: <span className="text-fg-primary">{reason.action}</span>
              </span>
            </span>
            <ChevronDown
              className={cn("mt-1.5 size-4 shrink-0 text-fg-tertiary transition-transform", open && "rotate-180")}
              aria-hidden
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-4 pb-4 pl-11">
            {isSku ? (
              <ul className="list-disc space-y-1 pl-5 type-body text-fg-secondary">
                {reason.skus[0].diagnosis?.[period]?.evidence.map((fact) => <li key={fact}>{fact}</li>)}
              </ul>
            ) : (
              <ul className="divide-y divide-border-default rounded-xl border border-border-default">
                {reason.skus.map((sku) => (
                  <li key={sku.id}>
                    <button
                      type="button"
                      onClick={() => onDrill(sku.id)}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-border-focus"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate type-body text-fg-primary">{sku.label}</span>
                        <span className="block truncate type-caption text-fg-secondary">
                          {nodeNote(sku, period)}
                        </span>
                      </span>
                      <span className="shrink-0 type-body-strong tabular-nums text-feedback-danger">
                        {formatGap(sku.gap[period])}
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-fg-tertiary" aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="h-8 rounded-full" asChild>
                <Link href="/">Open in For You</Link>
              </Button>
              {reason.question ? <AskChip question={reason.question} onAsk={onAsk} /> : null}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}
