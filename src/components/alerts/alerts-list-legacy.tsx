"use client";

import { ChevronDown, Search } from "lucide-react";

import { Input } from "@ciq-dev/ciq-design-system";

import { LEGACY_ALERT_GROUPS, type AlertListItem } from "@/lib/mock-alerts";
import { cn } from "@/lib/utils";

type AlertsListLegacyProps = {
  selectedId: string;
  onSelect: (item: AlertListItem) => void;
};

export function AlertsListLegacy({ selectedId, onSelect }: AlertsListLegacyProps) {
  return (
    <div className="flex h-full w-90 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="space-y-3 border-b border-slate-200 p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-slate-400" />
          <Input className="h-9 pl-9" placeholder="Search" readOnly />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <button type="button" className="flex items-center gap-1 font-medium text-slate-700">
            All Brands <span className="text-slate-400">$0</span>
            <ChevronDown className="size-3.5" />
          </button>
          <span>
            SKUs <strong className="text-slate-800">128</strong>
          </span>
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md border border-slate-200 px-2.5 py-1.5 text-xs text-slate-600"
        >
          Group by: Issue type
          <ChevronDown className="size-3.5" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {LEGACY_ALERT_GROUPS.map((group) => (
          <div key={group.label} className="mb-3">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              {group.label}
              <span className="text-xs font-normal text-slate-500">$2.3M</span>
            </button>
            <div className="mt-1 space-y-1 pl-1">
              {group.items.map((item) => {
                const selected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item)}
                    className={cn(
                      "flex w-full gap-2 rounded-lg border px-2 py-2 text-left transition-colors",
                      selected
                        ? "border-brand-200 bg-brand-50/80 ring-1 ring-brand-200"
                        : "border-transparent hover:bg-slate-50",
                    )}
                  >
                    <div className="size-10 shrink-0 rounded bg-slate-100" aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-xs font-medium text-slate-800">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">OPS {item.valueLabel}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
