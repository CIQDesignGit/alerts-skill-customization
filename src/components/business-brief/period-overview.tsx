import { Button } from "@ciq-dev/ciq-design-system";

import type { PeriodId } from "@/lib/business-brief-data";

type PeriodOverviewProps = {
  onOpen: (period: PeriodId) => void;
};

export function PeriodOverview({ onOpen }: PeriodOverviewProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <OverviewCard title="Last week" cta="Why did we miss?" onClick={() => onOpen("last")}>
        <Figure caption="Actual" value="−$240K" detail="$3.42M of $3.66M · 93%" />
        <p className="type-body text-fg-primary">
          <span className="font-semibold">Biggest drag:</span> Buy box lost on hero SKUs to sellers
          below MAP, −$102K.
        </p>
      </OverviewCard>

      <OverviewCard title="This week" cta="Close this week's gap" onClick={() => onOpen("this")}>
        <Figure caption="Projected" value="−$200K" detail="$3.5M of $3.7M · 95%" />
        <Figure caption="So far · 57% of the week gone" value="−$214K" detail="$1.9M of $2.11M · 90%" />
        <p className="type-body text-fg-primary">
          <span className="font-semibold">Start with:</span> enforce MAP on 4 hero SKUs.
        </p>
      </OverviewCard>
    </div>
  );
}

type OverviewCardProps = {
  title: string;
  cta: string;
  onClick: () => void;
  children: React.ReactNode;
};

function OverviewCard({ title, cta, onClick, children }: OverviewCardProps) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-border-default bg-surface p-5 shadow-sm">
      <h2 className="type-body-strong text-fg-primary">{title}</h2>
      <div className="flex flex-1 flex-col gap-4">{children}</div>
      <Button className="w-fit min-w-40" onClick={onClick}>
        {cta}
      </Button>
    </section>
  );
}

function Figure({ caption, value, detail }: { caption: string; value: string; detail: string }) {
  return (
    <div className="space-y-0.5">
      <p className="type-caption text-fg-secondary">{caption}</p>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="type-heading tabular-nums text-feedback-danger">{value}</span>
        <span className="type-body text-fg-secondary">{detail}</span>
      </p>
    </div>
  );
}
