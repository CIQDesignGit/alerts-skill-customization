import { ChevronUp } from "lucide-react";
import { Button, Tabs, TabsList, TabsTrigger } from "@ciq-dev/ciq-design-system";

import type { PeriodId } from "@/lib/business-brief-data";

type PeriodTabsProps = {
  value: PeriodId;
  onValueChange: (period: PeriodId) => void;
  onCollapse: () => void;
};

const triggerClass =
  "h-auto min-w-0 flex-1 flex-wrap justify-start gap-x-2 gap-y-0.5 whitespace-normal rounded-xl border px-3 py-2 text-left type-body text-fg-secondary data-[state=active]:border-brand-600 data-[state=active]:bg-brand-50 data-[state=active]:shadow-none";

export function PeriodTabs({ value, onValueChange, onCollapse }: PeriodTabsProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border-default bg-surface p-1.5 shadow-sm">
      <Tabs value={value} onValueChange={(next) => onValueChange(next as PeriodId)} className="flex-1">
        <TabsList className="flex h-auto w-full gap-1.5 bg-transparent p-0">
          <TabsTrigger value="last" className={triggerClass}>
            <span className="type-body-strong text-fg-primary">Last week</span>
            <span className="type-body-strong tabular-nums text-feedback-danger">−$240K</span>
            <span>vs plan · 93%</span>
          </TabsTrigger>
          <TabsTrigger value="this" className={triggerClass}>
            <span className="type-body-strong text-fg-primary">This week</span>
            <span className="type-body-strong tabular-nums text-feedback-danger">−$200K</span>
            <span>projected · 95%</span>
            <span className="type-body-strong tabular-nums text-feedback-danger">−$214K</span>
            <span>so far</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Back to week overview"
        onClick={onCollapse}
        className="shrink-0 text-fg-secondary"
      >
        <ChevronUp className="size-4" aria-hidden />
      </Button>
    </div>
  );
}
