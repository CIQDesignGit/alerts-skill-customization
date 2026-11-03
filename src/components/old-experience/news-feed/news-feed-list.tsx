"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import {
  LEGACY_ISSUE_GROUPS,
  type LegacyIssueGroup,
  type LegacySkuRow,
} from "@/lib/legacy-news-feed-data";
import { cn } from "@/lib/utils";

import { NewsFeedListHeader } from "./news-feed-toolbar";

type NewsFeedListProps = {
  selectedId: string;
  onSelect: (sku: LegacySkuRow) => void;
};

function IssueGroupSection({
  group,
  expanded,
  onToggle,
  selectedId,
  onSelect,
}: {
  group: LegacyIssueGroup;
  expanded: boolean;
  onToggle: () => void;
  selectedId: string;
  onSelect: (sku: LegacySkuRow) => void;
}) {
  const hasItems = group.items.length > 0;

  return (
    <div className="px-2 pb-2">
      <div className="overflow-hidden rounded-lg border border-border-default bg-surface-subtle">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center gap-2 border-b border-border-default px-3 py-2.5 text-left hover:bg-surface-muted"
        >
          <span className="text-fg-tertiary">
            {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </span>
          <span className="min-w-0 flex-1 type-body-strong text-fg-primary">{group.label}</span>
          <span className="shrink-0 text-right type-caption text-fg-tertiary">
            <span className="block">{group.skuCount} SKUs</span>
            <span className="block font-medium text-fg-secondary">OPS {group.opsTotal}</span>
          </span>
        </button>

        {expanded && hasItems && (
          <ul className="divide-y divide-border-default">
            {group.items.map((item) => {
              const selected = item.id === selectedId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(item)}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-2.5 text-left transition-colors",
                      selected
                        ? "border-l-4 border-l-brand-500 bg-brand-50"
                        : "border-l-4 border-l-transparent hover:bg-surface-muted",
                    )}
                  >
                    <img
                      src="https://placehold.co/40x40"
                      alt=""
                      className="size-10 shrink-0 rounded border border-border-default bg-surface"
                    />
                    <span className="min-w-0 flex-1 line-clamp-2 type-caption text-fg-primary">
                      {item.name}
                    </span>
                    <span className="shrink-0 type-caption-strong text-fg-secondary">{item.ops}</span>
                  </button>
                </li>
              );
            })}
            {group.viewMoreCount != null && group.viewMoreCount > 0 && (
              <li>
                <button
                  type="button"
                  className="w-full px-3 py-2 text-left type-caption text-brand-600 hover:underline"
                >
                  View more ({group.viewMoreCount} more)
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export function NewsFeedList({ selectedId, onSelect }: NewsFeedListProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "missing-promo-badge": true,
  });

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex h-full w-[24rem] shrink-0 flex-col border-r border-border-default bg-slate-50">
      <NewsFeedListHeader />
      <div className="min-h-0 flex-1 overflow-y-auto py-2">
        {LEGACY_ISSUE_GROUPS.map((group) => (
          <IssueGroupSection
            key={group.id}
            group={group}
            expanded={expanded[group.id] ?? false}
            onToggle={() => toggle(group.id)}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
