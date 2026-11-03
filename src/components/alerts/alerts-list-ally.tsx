"use client";

import { Box, ShoppingCart, Tag } from "lucide-react";

import { ALLY_ALERT_ITEMS, type AlertListItem } from "@/lib/mock-alerts";
import { cn } from "@/lib/utils";

type AlertsListAllyProps = {
  selectedId: string;
  onSelect: (item: AlertListItem) => void;
};

const ICONS = {
  map: Tag,
  price: ShoppingCart,
  avail: Box,
} as const;

function iconFor(id: string) {
  if (id.startsWith("map") || id.startsWith("price")) return ICONS.price;
  return ICONS.avail;
}

export function AlertsListAlly({ selectedId, onSelect }: AlertsListAllyProps) {
  return (
    <div className="flex h-full w-[300px] shrink-0 flex-col border-r border-slate-200/80 bg-white/90 backdrop-blur-sm">
      <div className="border-b border-slate-200/80 p-3">
        <div className="rounded-xl bg-[#1a1f3a] p-3 text-white shadow-md">
          <p className="text-[10px] font-medium tracking-wide text-white/60 uppercase">
            Protected by Ally
          </p>
          <p className="mt-1 text-xl font-semibold">$8K</p>
          <div className="mt-2 h-8 rounded bg-white/10" aria-hidden />
        </div>
        <div className="mt-3 flex gap-4 text-xs">
          <span className="font-semibold text-slate-900">
            18 <span className="font-normal text-slate-500">To decide</span>
          </span>
          <span className="text-slate-500">
            6 <span className="text-slate-400">Autopilot</span>
          </span>
          <span className="text-slate-500">
            0 <span className="text-slate-400">My list</span>
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        <p className="px-2 py-1 text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
          High · 6
        </p>
        <div className="space-y-1">
          {ALLY_ALERT_ITEMS.map((item) => {
            const selected = item.id === selectedId;
            const Icon = iconFor(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                className={cn(
                  "w-full rounded-xl px-2 py-2 text-left transition-colors",
                  selected ? "bg-violet-100/90 ring-2 ring-brand-500/30" : "hover:bg-slate-50",
                )}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={cn(
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg",
                      selected ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-600",
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-slate-900">{item.title}</p>
                      <span className="shrink-0 text-sm font-semibold text-slate-800">
                        {item.valueLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{item.skuCount} SKUs</p>
                    {selected && item.productLine ? (
                      <p className="mt-2 truncate rounded-md bg-white/80 px-2 py-1 text-xs text-slate-600 ring-1 ring-slate-200">
                        {item.productLine}
                      </p>
                    ) : null}
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-2/3 rounded-full bg-brand-500" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
