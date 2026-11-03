import { ChevronDown, Download, LayoutGrid, Search } from "lucide-react";

import { LEGACY_FEED_META } from "@/lib/legacy-news-feed-data";

export function NewsFeedToolbar() {
  return (
    <div className="flex h-12 shrink-0 items-center justify-between border-b border-border-default bg-surface px-4">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded border border-border-default bg-surface">
          <Search className="size-4 text-fg-tertiary" aria-hidden />
        </span>
        <button
          type="button"
          className="flex items-center gap-1 rounded border border-border-default bg-surface px-3 py-1 type-body text-fg-primary"
        >
          All Brands{" "}
          <span className="font-medium text-rose-600">{LEGACY_FEED_META.brandGap}</span>
          <ChevronDown className="size-3.5 text-fg-tertiary" aria-hidden />
        </button>
      </div>
      <span className="type-caption text-fg-tertiary">
        Last Updated{" "}
        <span className="font-medium text-fg-primary">{LEGACY_FEED_META.lastUpdated}</span> (
        {LEGACY_FEED_META.lastUpdatedAgo})
      </span>
    </div>
  );
}

export function NewsFeedListHeader() {
  return (
    <div className="space-y-2 border-b border-border-default bg-surface px-3 py-3">
      <div className="flex items-center justify-between">
        <span className="type-body text-fg-secondary">
          SKUs{" "}
          <span className="font-semibold text-fg-primary">({LEGACY_FEED_META.skuTotal})</span>
        </span>
        <div className="flex items-center gap-1 text-fg-tertiary">
          <button
            type="button"
            aria-label="Download"
            className="flex size-7 items-center justify-center rounded hover:bg-surface-muted"
          >
            <Download className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Change layout"
            className="flex size-7 items-center justify-center rounded hover:bg-surface-muted"
          >
            <LayoutGrid className="size-4" aria-hidden />
          </button>
        </div>
      </div>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded border border-border-default bg-surface px-2.5 py-1.5 type-caption text-fg-secondary"
      >
        Group by: Issue type
        <ChevronDown className="size-3.5" aria-hidden />
      </button>
      <p className="type-caption text-fg-tertiary">
        Ranked by OPS based on <span className="font-medium text-fg-secondary">latest crawl</span>.
      </p>
    </div>
  );
}
