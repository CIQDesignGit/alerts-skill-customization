import { AskChips, BriefCard, LegendDot } from "@/components/business-brief/brief-card";
import type { SalesTrend } from "@/lib/business-brief-widgets";

const W = 640;
const H = 280;
const PAD = { left: 64, right: 40, top: 28, bottom: 36 };

const money = (value: number) => `$${Number(value.toFixed(2))}M`;

type SalesTrendCardProps = {
  trend: SalesTrend;
  onAsk: (question: string) => void;
};

export function SalesTrendCard({ trend, onAsk }: SalesTrendCardProps) {
  const { points, domain, band, baseline, ticks } = trend;
  const x = (i: number) => PAD.left + (i * (W - PAD.left - PAD.right)) / (points.length - 1);
  const y = (v: number) =>
    PAD.top + (1 - (v - domain[0]) / (domain[1] - domain[0])) * (H - PAD.top - PAD.bottom);
  const current = points.at(-1)!;

  return (
    <BriefCard title={trend.title} description={trend.description}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={`${trend.title}. ${current.label}: ${money(current.value)} against a baseline of ${money(baseline)}.`}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(tick)} y2={y(tick)} className="stroke-slate-100" />
            <text x={PAD.left - 12} y={y(tick)} dy="0.35em" textAnchor="end" className="fill-fg-tertiary text-[12px]">
              {money(tick)}
            </text>
          </g>
        ))}

        <rect
          x={PAD.left}
          width={W - PAD.left - PAD.right}
          y={y(band[1])}
          height={y(band[0]) - y(band[1])}
          className="fill-slate-100"
        />
        <line
          x1={PAD.left}
          x2={W - PAD.right}
          y1={y(baseline)}
          y2={y(baseline)}
          strokeDasharray="4 4"
          className="stroke-slate-400"
        />
        <text
          x={PAD.left + 8}
          y={y(baseline) + 16}
          strokeWidth={4}
          paintOrder="stroke"
          className="fill-fg-secondary stroke-slate-100 text-[12px]"
        >
          Baseline {money(baseline)}
        </text>

        <polyline
          points={points.map((p, i) => `${x(i)},${y(p.value)}`).join(" ")}
          fill="none"
          strokeWidth={2}
          className="stroke-slate-300"
        />

        {points.map((p, i) => (
          <g key={p.label}>
            {p.kind === "baseline" && <circle cx={x(i)} cy={y(p.value)} r={6} className="fill-slate-400" />}
            {p.kind === "event" && (
              <circle
                cx={x(i)}
                cy={y(p.value)}
                r={p.note ? 7 : 4.5}
                strokeWidth={p.note ? 2.5 : 1.5}
                className={p.note ? "fill-white stroke-slate-500" : "fill-white stroke-slate-400"}
              />
            )}
            {p.kind === "current" && (
              <>
                <circle cx={x(i)} cy={y(p.value)} r={7} className="fill-brand-700" />
                <text x={x(i)} y={y(p.value) + 26} textAnchor="middle" className="fill-brand-800 text-[14px] font-semibold">
                  {money(p.value)}
                </text>
              </>
            )}
            {p.note && (
              <text x={x(i)} y={y(p.value) - 16} textAnchor="middle" className="fill-fg-secondary text-[12px]">
                {p.note}
              </text>
            )}
            {i % 2 === 0 && (
              <text x={x(i)} y={H - 8} textAnchor="middle" className="fill-fg-tertiary text-[12px]">
                {p.label}
              </text>
            )}
          </g>
        ))}
      </svg>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <LegendDot className="bg-slate-400" label="Baseline week" />
        <LegendDot className="border border-slate-400 bg-surface" label="Event week, not in baseline" />
        <LegendDot className="bg-brand-700" label={trend.currentLabel} />
        <span className="inline-flex items-center gap-2 type-body text-fg-secondary">
          <span className="h-3 w-6 rounded-sm bg-slate-100" aria-hidden />
          Normal range
        </span>
      </div>

      <AskChips questions={trend.questions} onAsk={onAsk} />
    </BriefCard>
  );
}
