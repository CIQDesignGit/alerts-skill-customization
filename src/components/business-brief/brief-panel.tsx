import { BriefActions } from "@/components/business-brief/brief-actions";
import { BriefSummaryCard } from "@/components/business-brief/brief-summary-card";
import { CategoryBaselineCard } from "@/components/business-brief/category-baseline-card";
import { GapDriversCard } from "@/components/business-brief/gap-drivers-card";
import { SalesTrendCard } from "@/components/business-brief/sales-trend-card";
import { ACTIONS, type Period } from "@/lib/business-brief-data";
import { WIDGETS } from "@/lib/business-brief-widgets";

type BriefPanelProps = {
  period: Period;
  scopeLabel: string;
  onAsk: (question: string) => void;
  onDrill: (scopeId: string) => void;
};

export function BriefPanel({ period, scopeLabel, onAsk, onDrill }: BriefPanelProps) {
  const widgets = WIDGETS[period.id];
  return (
    <div className="space-y-4">
      <BriefSummaryCard period={period} scopeLabel={scopeLabel} />
      <SalesTrendCard trend={widgets.trend} onAsk={onAsk} />
      <CategoryBaselineCard data={widgets.categories} onDrill={onDrill} onAsk={onAsk} />
      <GapDriversCard data={widgets.drivers} onAsk={onAsk} />
      <BriefActions {...ACTIONS[period.id]} onAsk={onAsk} />
    </div>
  );
}
