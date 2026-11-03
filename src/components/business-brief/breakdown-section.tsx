"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import {
  Badge,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ciq-dev/ciq-design-system";

import { BriefCard } from "@/components/business-brief/brief-card";
import { SalesTrendCard } from "@/components/business-brief/sales-trend-card";
import {
  PERIODS,
  formatGap,
  formatMoney,
  pctOfPlan,
  type GapNode,
  type Metric,
  type PeriodId,
} from "@/lib/business-brief-data";
import { WIDGETS } from "@/lib/business-brief-widgets";
import { cn } from "@/lib/utils";

type BreakdownSectionProps = {
  scope: GapNode;
  period: PeriodId;
  onDrill: (id: string) => void;
  onAsk: (question: string) => void;
};

export function BreakdownSection({ scope, period, onDrill, onAsk }: BreakdownSectionProps) {
  const [open, setOpen] = useState(false);
  if (scope.level === "sku") return null;

  const isOverall = scope.level === "overall";
  const childLabel = isOverall ? "categories" : `SKUs in ${scope.label.toLowerCase()}`;

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="space-y-4">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between rounded-2xl bg-surface">
          <span>
            {open ? "Hide full breakdown" : "Show full breakdown"}
            <span className="font-normal text-fg-secondary">
              {" "}
              · {isOverall ? "categories, sales trend and baseline" : `all ${childLabel}`}
            </span>
          </span>
          <ChevronDown className={cn("transition-transform", open && "rotate-180")} aria-hidden />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4">
        <ChildrenTable scope={scope} period={period} title={`All ${childLabel} against plan`} onDrill={onDrill} />
        {isOverall && (
          <>
            <BaselineCard period={period} />
            <SalesTrendCard trend={WIDGETS[period].trend} onAsk={onAsk} />
          </>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

type ChildrenTableProps = {
  scope: GapNode;
  period: PeriodId;
  title: string;
  onDrill: (id: string) => void;
};

function ChildrenTable({ scope, period, title, onDrill }: ChildrenTableProps) {
  const rows = [...(scope.children ?? [])].sort((a, b) => a.gap[period] - b.gap[period]);
  return (
    <BriefCard title={title}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Plan</TableHead>
            <TableHead className="text-right">{period === "this" ? "Projected" : "Actual"}</TableHead>
            <TableHead className="text-right">vs plan</TableHead>
            <TableHead className="text-right">% of plan</TableHead>
            <TableHead className="w-8">
              <span className="sr-only">Open</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((node) => (
            <TableRow key={node.id} className="cursor-pointer" onClick={() => onDrill(node.id)}>
              <TableCell>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDrill(node.id);
                  }}
                  className="type-body-strong text-fg-primary hover:underline focus-visible:outline-2 focus-visible:outline-border-focus"
                >
                  {node.label}
                </button>
              </TableCell>
              <MoneyCells node={node} period={period} />
              <TableCell>
                <ChevronRight className="size-4 text-fg-tertiary" aria-hidden />
              </TableCell>
            </TableRow>
          ))}
          {scope.other && (
            <TableRow>
              <TableCell className="text-fg-secondary">Other SKUs ({scope.other.count})</TableCell>
              <TableCell />
              <TableCell />
              <TableCell className="text-right tabular-nums text-fg-secondary">
                {formatGap(scope.other.gap[period])}
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </BriefCard>
  );
}

function MoneyCells({ node, period }: { node: GapNode; period: PeriodId }) {
  const gap = node.gap[period];
  return (
    <>
      <TableCell className="text-right tabular-nums text-fg-secondary">{formatMoney(node.plan[period])}</TableCell>
      <TableCell className="text-right tabular-nums">{formatMoney(node.plan[period] + gap)}</TableCell>
      <TableCell
        className={cn(
          "text-right font-semibold tabular-nums",
          gap < 0 ? "text-feedback-danger" : "text-feedback-success",
        )}
      >
        {formatGap(gap)}
      </TableCell>
      <TableCell className="text-right tabular-nums">{pctOfPlan(node, period)}%</TableCell>
    </>
  );
}

function BaselineCard({ period }: { period: PeriodId }) {
  const meta = PERIODS[period];
  return (
    <BriefCard
      title="Against the 7-week baseline"
      description={meta.summary}
      aside={
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="How the baseline works" className="size-8 text-fg-tertiary">
                <Info aria-hidden />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">{meta.baselineNote}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {meta.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </BriefCard>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  const below = metric.status === "below";
  return (
    <div className="space-y-1 rounded-xl border border-border-default p-4">
      <p className="type-body text-fg-secondary">{metric.label}</p>
      <p className="type-heading tabular-nums text-fg-primary">{metric.value}</p>
      <p className="type-caption text-fg-secondary">{metric.delta}</p>
      <Badge
        variant="secondary"
        className={cn(
          "mt-1 font-medium shadow-none",
          below
            ? "bg-feedback-danger/10 text-feedback-danger hover:bg-feedback-danger/10"
            : "bg-surface-subtle text-fg-secondary hover:bg-surface-subtle",
        )}
      >
        {below ? "Below normal" : "Normal"}
      </Badge>
    </div>
  );
}
