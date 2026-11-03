"use client";

import { Check, Sparkles, ThumbsDown, ThumbsUp, X } from "lucide-react";

import { Button, Card, CardContent, Separator } from "@ciq-dev/ciq-design-system";

import type { LegacyAlertDetail, LegacySkuRow } from "@/lib/legacy-news-feed-data";
import { cn } from "@/lib/utils";

import { NewsFeedDetailHeader } from "./news-feed-detail-header";

type NewsFeedDetailProps = {
  sku: LegacySkuRow;
  detail: LegacyAlertDetail;
};

function StatusIcon({ status }: { status: LegacyAlertDetail["checks"][number]["status"] }) {
  if (status === "pass") {
    return <Check className="size-4 text-feedback-success" aria-hidden />;
  }
  if (status === "fail") {
    return <X className="size-4 text-feedback-danger" aria-hidden />;
  }
  return <Check className="size-4 text-fg-disabled" aria-hidden />;
}

export function NewsFeedDetail({ sku, detail }: NewsFeedDetailProps) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto bg-surface-muted p-4">
      <Card className="border-border-default shadow-sm">
        <CardContent className="space-y-5 p-6">
          <NewsFeedDetailHeader sku={sku} />

          <p className="type-body text-fg-secondary">{detail.insight}</p>

          <div className="rounded-xl border border-border-default bg-surface-subtle px-4 py-3">
            <ul className="divide-y divide-border-default">
              {detail.checks.map((check) => (
                <li
                  key={check.label}
                  className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <span className="type-body text-fg-secondary">{check.label}</span>
                  <StatusIcon status={check.status} />
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border-default bg-feedback-danger/5 p-4">
              <p className="type-caption text-fg-tertiary">Original</p>
              <p className="mt-2 type-heading tabular-nums text-fg-primary">{detail.originalPrice}</p>
              <p className="mt-1 type-caption text-fg-tertiary">
                M.R.P: <span className="line-through">{detail.mrp}</span>
              </p>
            </div>
            <div className="rounded-xl border border-border-default bg-surface-subtle p-4">
              <p className="type-caption text-fg-tertiary">Selling</p>
              <p className="mt-2 type-heading tabular-nums text-fg-primary">{detail.sellingPrice}</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 type-caption text-fg-tertiary">
            <span>Helpful</span>
            <Button variant="ghost" size="icon" className="size-8" aria-label="Helpful">
              <ThumbsUp className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8" aria-label="Not helpful">
              <ThumbsDown className="size-4" />
            </Button>
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="flex items-center gap-2 type-caption-strong text-fg-brand">
              <Sparkles className="size-4 text-brand-600" aria-hidden />
              Explore more
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-auto min-h-8 rounded-full border-border-default py-1.5 text-fg-brand",
                  "whitespace-normal hover:bg-surface-muted",
                )}
              >
                See trends for Last week for {detail.issueLabel}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-auto min-h-8 rounded-full border-border-default py-1.5 text-fg-brand hover:bg-surface-muted"
              >
                Last Week Scrape History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
