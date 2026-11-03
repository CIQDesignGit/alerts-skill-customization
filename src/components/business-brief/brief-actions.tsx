import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@ciq-dev/ciq-design-system";

import { AskChip, BriefCard } from "@/components/business-brief/brief-card";
import type { BriefAction } from "@/lib/business-brief-data";

type BriefActionsProps = {
  heading: string;
  items: BriefAction[];
  onAsk: (question: string) => void;
};

export function BriefActions({ heading, items, onAsk }: BriefActionsProps) {
  return (
    <BriefCard
      title={heading}
      className="space-y-2"
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
      <ol className="divide-y divide-border-default border-t border-border-default">
        {items.map((item, index) => (
          <li key={item.title} className="flex gap-3 py-4">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-feedback-warning-subtle type-caption-strong text-feedback-warning">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="type-body-strong text-fg-primary">
                  {item.title}
                  {item.sku && <span className="font-normal text-fg-secondary"> · {item.sku}</span>}
                </p>
                <p className="type-caption text-fg-secondary">{item.meta}</p>
              </div>
              {(item.question || item.openInForYou) && (
                <div className="flex flex-wrap gap-2">
                  {item.question && <AskChip question={item.question} onAsk={onAsk} />}
                  {item.openInForYou && (
                    <Button variant="outline" size="sm" className="h-8 rounded-full" asChild>
                      <Link href="/">Open in For You</Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </BriefCard>
  );
}
