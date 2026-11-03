import { Badge } from "@ciq-dev/ciq-design-system";

import { BriefCard } from "@/components/business-brief/brief-card";
import type { Metric, Period } from "@/lib/business-brief-data";
import { cn } from "@/lib/utils";

type BriefSummaryCardProps = {
  period: Period;
  scopeLabel: string;
};

export function BriefSummaryCard({ period, scopeLabel }: BriefSummaryCardProps) {
  return (
    <BriefCard className="space-y-6">
      <header className="space-y-2">
        <p className="type-caption-strong tracking-wider text-fg-brand uppercase">
          Business brief · {scopeLabel}
        </p>
        <h2 className="type-heading text-fg-primary">
          {scopeLabel} weekly business brief: {period.range}
        </h2>
        <p className="max-w-3xl type-body-lg text-fg-secondary">{period.summary}</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {period.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <p className="type-caption text-fg-tertiary">{period.baselineNote}</p>
    </BriefCard>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  const below = metric.status === "below";
  return (
    <div className="space-y-1 rounded-xl border border-border-default p-4">
      <p className="type-body text-fg-secondary">{metric.label}</p>
      <p className="type-heading tabular-nums text-fg-primary">{metric.value}</p>
      <p className="type-body text-fg-secondary">{metric.delta}</p>
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
