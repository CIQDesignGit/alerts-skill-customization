import { AskChips, BriefCard, LegendDot } from "@/components/business-brief/brief-card";
import {
  categoryStatus,
  formatPct,
  type CategoryBaseline,
  type CategoryStatus,
} from "@/lib/business-brief-widgets";
import { cn } from "@/lib/utils";

const METRICS = [
  { key: "sales", label: "Sales" },
  { key: "units", label: "Units" },
  { key: "visits", label: "Page visits" },
] as const;

const DOT: Record<CategoryStatus, string> = {
  below: "fill-feedback-danger",
  normal: "fill-fg-brand",
  above: "fill-feedback-success",
};

const VALUE: Record<CategoryStatus, string> = {
  below: "text-feedback-danger",
  normal: "text-fg-primary",
  above: "text-feedback-success",
};

const STATUS_LABEL: Record<CategoryStatus, string> = {
  below: "below normal",
  normal: "normal",
  above: "above normal",
};

const ROW_GRID = "grid grid-cols-[minmax(7rem,1.2fr)_repeat(3,minmax(0,1fr))] items-center gap-x-6";

type CategoryBaselineCardProps = {
  data: CategoryBaseline;
  onDrill: (categoryId: string) => void;
  onAsk: (question: string) => void;
};

export function CategoryBaselineCard({ data, onDrill, onAsk }: CategoryBaselineCardProps) {
  return (
    <BriefCard
      title="Every category against baseline"
      aside={<p className="type-body text-fg-tertiary">Select a row to drill in</p>}
    >
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <span className="inline-flex items-center gap-2 type-body text-fg-secondary">
          <span className="h-2 w-6 rounded-full bg-slate-200" aria-hidden />
          Normal range
        </span>
        <LegendDot className="bg-fg-brand" label="Normal" />
        <LegendDot className="bg-feedback-success" label="Above normal" />
        <LegendDot className="bg-feedback-danger" label="Below normal" />
      </div>

      <div>
        <div className={cn(ROW_GRID, "pb-3 type-body text-fg-secondary")}>
          <span />
          {METRICS.map((m) => (
            <span key={m.key} className="text-center">
              {m.label}
            </span>
          ))}
        </div>
        <ul className="divide-y divide-border-default border-t border-border-default">
          {data.rows.map((row) => (
            <li key={row.id}>
              <button
                type="button"
                onClick={() => onDrill(row.id)}
                aria-label={`${row.label}: ${METRICS.map((m) => `${m.label} ${formatPct(row[m.key])}, ${STATUS_LABEL[categoryStatus(row[m.key])]}`).join("; ")}`}
                className={cn(
                  ROW_GRID,
                  "w-full rounded-md py-3 text-left transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-border-focus",
                )}
              >
                <span className="type-body-lg text-fg-primary">{row.label}</span>
                {METRICS.map((m) => (
                  <MetricCell key={m.key} delta={row[m.key]} />
                ))}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AskChips questions={data.questions} onAsk={onAsk} />
    </BriefCard>
  );
}

function MetricCell({ delta }: { delta: number }) {
  const status = categoryStatus(delta);
  const cx = Math.min(52, Math.max(8, 30 + delta * 2.4));
  return (
    <span className="flex items-center justify-between gap-2" aria-hidden>
      <svg viewBox="0 0 60 16" className="h-4 w-15 shrink-0">
        <rect x={18} y={4} width={24} height={8} rx={4} className="fill-slate-200" />
        <circle cx={cx} cy={8} r={7} className="fill-white" />
        <circle cx={cx} cy={8} r={5.5} className={DOT[status]} />
      </svg>
      <span className={cn("type-body-lg tabular-nums font-medium", VALUE[status])}>{formatPct(delta)}</span>
    </span>
  );
}
