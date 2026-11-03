import { ExternalLink, History } from "lucide-react";

import { Button } from "@ciq-dev/ciq-design-system";

import type { LegacySkuRow } from "@/lib/legacy-news-feed-data";
import { cn } from "@/lib/utils";

const chipBase =
  "inline-flex h-auto min-h-0 items-center gap-1.5 rounded-md border px-3 py-1.5 shadow-none";

type NewsFeedDetailHeaderProps = {
  sku: LegacySkuRow;
};

export function NewsFeedDetailHeader({ sku }: NewsFeedDetailHeaderProps) {
  return (
    <header className="flex gap-4">
      <img
        src="https://placehold.co/80x80"
        alt=""
        className="size-20 shrink-0 rounded-md border border-border-default bg-surface-subtle object-cover"
      />
      <div className="min-w-0 flex-1 space-y-3">
        <div className="space-y-1">
          <h1 className="type-title text-slate-800">{sku.name}</h1>
          <p className="type-caption text-fg-tertiary">
            {sku.category} • {sku.asin} • {sku.model}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              chipBase,
              "border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-50 hover:text-brand-800",
            )}
          >
            <History className="size-4 shrink-0 text-brand-600" aria-hidden />
            <span className="type-body-strong">PDP Snapshots</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(chipBase, "border-border-default bg-surface text-fg-primary hover:bg-surface")}
          >
            <AmazonMark />
            <span className="type-body-strong">PDP Page</span>
            <ExternalLink className="size-3.5 shrink-0 text-fg-tertiary" aria-hidden />
          </Button>

          <span
            className={cn(
              chipBase,
              "border-slate-200 bg-slate-50 text-fg-primary",
            )}
          >
            <span className="type-caption text-slate-500">OPS</span>
            <span className="type-body-strong tabular-nums">{sku.ops}</span>
          </span>

          <span
            className={cn(
              chipBase,
              "border-rose-200 bg-rose-50 text-rose-700",
            )}
          >
            <span className="type-caption text-rose-400">Gap</span>
            <span className="type-body-strong tabular-nums text-rose-600">{sku.gap}</span>
          </span>
        </div>
      </div>
    </header>
  );
}

function AmazonMark() {
  return (
    <span
      className="flex size-4 shrink-0 items-center justify-center rounded-sm bg-slate-900 type-caption-strong leading-none text-white"
      aria-hidden
    >
      a
    </span>
  );
}
