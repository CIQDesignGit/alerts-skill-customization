"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import {
  GAP_TREE,
  OVERALL,
  formatGap,
  type GapNode,
  type PeriodId,
} from "@/lib/business-brief-data";
import { cn } from "@/lib/utils";

type GapTreeProps = {
  period: PeriodId;
  caption: string;
  selectedId: string;
  onSelect: (id: string) => void;
};

export function GapTree({ period, caption, selectedId, onSelect }: GapTreeProps) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["jar-candles"]));

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section
      aria-label="Gap to plan"
      className="rounded-2xl border border-border-default bg-surface p-2 shadow-sm"
    >
      <p className="px-2 pt-1 pb-2 type-caption text-fg-secondary">{caption}</p>
      <ul className="space-y-0.5">
        <li>
          <GapRow node={OVERALL} period={period} selected={selectedId === OVERALL.id} onSelect={onSelect} />
        </li>
        {GAP_TREE.map((node) => {
          const isOpen = expanded.has(node.id);
          return (
            <li key={node.id}>
              <GapRow
                node={node}
                period={period}
                selected={selectedId === node.id}
                onSelect={onSelect}
                expandable
                expanded={isOpen}
                onToggle={() => toggle(node.id)}
              />
              {isOpen && node.children && (
                <ul className="space-y-0.5">
                  {node.children.map((child) => (
                    <li key={child.id}>
                      <GapRow
                        node={child}
                        period={period}
                        selected={selectedId === child.id}
                        onSelect={onSelect}
                        nested
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

type GapRowProps = {
  node: GapNode;
  period: PeriodId;
  selected: boolean;
  onSelect: (id: string) => void;
  nested?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
};

function GapRow({ node, period, selected, onSelect, nested, expandable, expanded, onToggle }: GapRowProps) {
  const value = node.gap[period];
  return (
    <div
      className={cn(
        "relative flex items-start gap-1 rounded-lg transition-colors",
        selected ? "bg-brand-50" : "hover:bg-surface-muted",
        nested ? "pl-7" : "pl-1",
      )}
    >
      {selected && (
        <span className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-brand-600" aria-hidden />
      )}
      {expandable ? (
        <button
          type="button"
          aria-label={expanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
          aria-expanded={expanded}
          onClick={onToggle}
          className="mt-2 flex size-5 shrink-0 items-center justify-center rounded text-fg-tertiary hover:text-fg-primary"
        >
          <ChevronRight className={cn("size-3.5 transition-transform", expanded && "rotate-90")} aria-hidden />
        </button>
      ) : (
        !nested && <span className="w-5 shrink-0" aria-hidden />
      )}
      <button
        type="button"
        aria-current={selected ? "true" : undefined}
        onClick={() => onSelect(node.id)}
        className="flex min-w-0 flex-1 flex-col gap-0.5 py-2 pr-2 text-left"
      >
        <span className="flex items-baseline justify-between gap-3">
          <span className={cn("truncate", nested ? "type-body" : "type-body-strong", "text-fg-primary")}>
            {node.label}
          </span>
          <span
            className={cn(
              "shrink-0 type-body-strong tabular-nums",
              value < 0 ? "text-feedback-danger" : "text-feedback-success",
            )}
          >
            {formatGap(value)}
          </span>
        </span>
        <span className="truncate type-caption text-fg-secondary">{node.note}</span>
      </button>
    </div>
  );
}
