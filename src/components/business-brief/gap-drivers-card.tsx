import type { ReactNode } from "react";

import { AskChips, BriefCard, LegendDot } from "@/components/business-brief/brief-card";
import { formatK, GAP_CAUSES, type GapCause, type GapDrivers } from "@/lib/business-brief-widgets";

const W = 640;
const ROW = 44;
const BAR = 28;
const BAR_X = 290;
const BAR_MAX = 260;
const MIN_BAR = 14;

const FILL: Record<GapCause, string> = {
  none: "fill-slate-300",
  stock: "fill-amber-500",
  search: "fill-fuchsia-700",
  buyBox: "fill-indigo-800",
  promo: "fill-yellow-700",
};

const BG: Record<GapCause, string> = {
  none: "bg-slate-300",
  stock: "bg-amber-500",
  search: "bg-fuchsia-700",
  buyBox: "bg-indigo-800",
  promo: "bg-yellow-700",
};

type GapDriversCardProps = {
  data: GapDrivers;
  onAsk: (question: string) => void;
};

export function GapDriversCard({ data, onAsk }: GapDriversCardProps) {
  const total = data.rows.reduce((sum, row) => sum + row.value, 0);
  const width = (value: number) => Math.max(MIN_BAR, (value / total) * BAR_MAX);
  const byCause = GAP_CAUSES.map(({ id }) => ({
    cause: id,
    value: data.rows.filter((r) => r.cause === id).reduce((sum, r) => sum + r.value, 0),
  })).filter((s) => s.value > 0);

  const segments = byCause.reduce<((typeof byCause)[number] & { x: number; w: number })[]>((acc, s) => {
    const prev = acc.at(-1);
    return [...acc, { ...s, x: prev ? prev.x + prev.w + 4 : BAR_X, w: width(s.value) }];
  }, []);
  const lastSegment = segments.at(-1);
  const cursor = lastSegment ? lastSegment.x + lastSegment.w + 4 : BAR_X;

  return (
    <BriefCard title={data.title} description={data.description}>
      <svg
        viewBox={`0 0 ${W} ${(data.rows.length + 1) * ROW}`}
        className="w-full"
        role="img"
        aria-label={`${data.title}. ${data.rows.map((r) => `${r.label} ${formatK(r.value)}`).join(", ")}.`}
      >
        <BarRow index={0} label="Total" strong>
          {segments.map((s) => (
            <BarSegment key={s.cause} x={s.x} w={s.w} cause={s.cause} value={s.value} />
          ))}
          <ValueLabel x={cursor + 6} value={total} />
        </BarRow>
        {data.rows.map((row, i) => {
          const w = width(row.value);
          return (
            <BarRow key={row.label} index={i + 1} label={row.label}>
              <BarSegment x={BAR_X} w={w} cause={row.cause} value={row.value} />
              <ValueLabel x={BAR_X + w + 10} value={row.value} />
            </BarRow>
          );
        })}
      </svg>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {GAP_CAUSES.map((c) => (
          <LegendDot key={c.id} className={BG[c.id]} label={c.label} />
        ))}
      </div>

      <p className="rounded-xl bg-feedback-success-subtle px-4 py-3 type-body text-feedback-success">
        {data.offset}
      </p>

      <AskChips questions={data.questions} onAsk={onAsk} />
    </BriefCard>
  );
}

function BarRow({
  index,
  label,
  strong,
  children,
}: {
  index: number;
  label: string;
  strong?: boolean;
  children: ReactNode;
}) {
  const top = index * ROW;
  return (
    <g transform={`translate(0 ${top})`}>
      <text
        x={0}
        y={ROW / 2}
        dy="0.35em"
        className={strong ? "fill-fg-primary text-[15px] font-semibold" : "fill-fg-secondary text-[15px]"}
      >
        {label}
      </text>
      {children}
    </g>
  );
}

function BarSegment({ x, w, cause, value }: { x: number; w: number; cause: GapCause; value: number }) {
  return (
    <>
      <rect x={x} y={(ROW - BAR) / 2} width={w} height={BAR} rx={7} className={FILL[cause]} />
      {w > 70 && (
        <text x={x + w / 2} y={ROW / 2} dy="0.35em" textAnchor="middle"
          className={cause === "none" ? "fill-fg-secondary text-[13px]" : "fill-white text-[13px]"}
        >
          {formatK(value)}
        </text>
      )}
    </>
  );
}

function ValueLabel({ x, value }: { x: number; value: number }) {
  return (
    <text x={x} y={ROW / 2} dy="0.35em" className="fill-fg-primary text-[15px] font-semibold tabular-nums">
      {formatK(value)}
    </text>
  );
}
