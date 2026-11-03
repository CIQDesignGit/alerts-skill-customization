import type { PeriodId } from "@/lib/business-brief-data";

export type TrendPoint = {
  label: string;
  value: number;
  kind: "baseline" | "event" | "current";
  note?: string;
};

export type SalesTrend = {
  title: string;
  description: string;
  currentLabel: string;
  points: TrendPoint[];
  baseline: number;
  band: [number, number];
  domain: [number, number];
  ticks: number[];
  questions: string[];
};

export type CategoryStatus = "below" | "normal" | "above";

export type CategoryRow = {
  id: string;
  label: string;
  sales: number;
  units: number;
  visits: number;
};

export type CategoryBaseline = {
  rows: CategoryRow[];
  questions: string[];
};

export type GapCause = "none" | "stock" | "search" | "buyBox" | "promo";

export const GAP_CAUSES: { id: GapCause; label: string }[] = [
  { id: "none", label: "No single cause" },
  { id: "stock", label: "Out of stock" },
  { id: "search", label: "Search rank" },
  { id: "buyBox", label: "Lost buy box" },
  { id: "promo", label: "Promotions" },
];

export type GapDrivers = {
  title: string;
  description: string;
  rows: { label: string; value: number; cause: GapCause }[];
  offset: string;
  questions: string[];
};

export type BriefWidgets = {
  trend: SalesTrend;
  categories: CategoryBaseline;
  drivers: GapDrivers;
};

const week = (label: string, value: number, kind: TrendPoint["kind"] = "baseline", note?: string): TrendPoint => ({
  label,
  value,
  kind,
  note,
});

export const WIDGETS: Record<PeriodId, BriefWidgets> = {
  last: {
    trend: {
      title: "Last week's sales were below the normal range",
      description: "Weekly ordered sales. Shaded band is the normal range.",
      currentLabel: "Last week",
      points: [
        week("Jul 6", 3.55, "event"),
        week("Jul 13", 3.6, "event"),
        week("Jul 20", 3.49, "event"),
        week("Jul 27", 3.57, "event"),
        week("Aug 3", 3.63),
        week("Aug 10", 3.6),
        week("Aug 17", 3.55),
        week("Aug 24", 3.66),
        week("Aug 31", 3.86, "event", "Labor Day week"),
        week("Sep 7", 3.72),
        week("Sep 14", 3.6),
        week("Sep 21", 3.52),
        week("Sep 28", 3.42, "current"),
      ],
      baseline: 3.61,
      band: [3.5, 3.72],
      domain: [3.3, 4],
      ticks: [3.3, 3.5, 3.75, 4],
      questions: [
        "How did last week compare with the week before?",
        "Which categories were behind plan last week?",
      ],
    },
    categories: {
      rows: [
        { id: "wax-melts", label: "Wax melts", sales: -8.9, units: -8.1, visits: -6.0 },
        { id: "jar-candles", label: "Jar candles", sales: -6.1, units: -5.8, visits: -8.2 },
        { id: "gift-sets", label: "Gift sets", sales: -5.4, units: -6.0, visits: -4.4 },
        { id: "travel-tins", label: "Travel tins", sales: -2.2, units: -2.0, visits: 1.4 },
      ],
      questions: [
        "Which categories were behind plan last week?",
        "Which hero SKUs have missed plan in each of the last 6 weeks?",
      ],
    },
    drivers: {
      title: "Lost buy box accounts for $102K of the $240K gap",
      description: "Ordered sales below baseline, by what is behind it",
      rows: [
        { label: "Other SKUs (60)", value: 43.2, cause: "none" },
        { label: "Amber Floral Soy Jar", value: 58, cause: "buyBox" },
        { label: "Coastal Linen Large Jar", value: 44, cause: "buyBox" },
        { label: "Aurelle Wax Melt Sampler", value: 37, cause: "stock" },
        { label: "Aurelle Holiday Trio Gift Set", value: 31, cause: "promo" },
        { label: "Hearthwood Fireside Duo", value: 24, cause: "promo" },
        { label: "Noir Cherry Large Jar", value: 2.8, cause: "search" },
      ],
      offset: "$6.4K of gains from SKUs above baseline partly offset the gap.",
      questions: [
        "Which sellers priced below MAP on hero SKUs last week?",
        "Which SKUs have gone out of stock most often in the last 4 weeks?",
      ],
    },
  },
  this: {
    trend: {
      title: "This week so far's sales were below the normal range",
      description: "Weekly ordered sales, Mon–Thu. Shaded band is the normal range.",
      currentLabel: "This week so far",
      points: [
        week("Jul 13", 2.04, "event"),
        week("Jul 20", 1.97, "event"),
        week("Jul 27", 2.02, "event"),
        week("Aug 3", 1.97, "event"),
        week("Aug 10", 2.035),
        week("Aug 17", 2.0),
        week("Aug 24", 2.06),
        week("Aug 31", 2.18, "event", "Labor Day week"),
        week("Sep 7", 2.11),
        week("Sep 14", 2.04),
        week("Sep 21", 2.09),
        week("Sep 28", 1.94),
        week("Oct 5", 1.9, "current"),
      ],
      baseline: 2.04,
      band: [1.94, 2.11],
      domain: [1.8, 2.3],
      ticks: [1.8, 1.95, 2.1, 2.3],
      questions: [
        "How is the overall portfolio doing this week vs last week?",
        "Which categories are behind plan this week?",
      ],
    },
    categories: {
      rows: [
        { id: "jar-candles", label: "Jar candles", sales: -9.5, units: -9.5, visits: -13.7 },
        { id: "travel-tins", label: "Travel tins", sales: -7.5, units: -7.5, visits: -3.9 },
        { id: "gift-sets", label: "Gift sets", sales: -6.3, units: -7.5, visits: -5.1 },
        { id: "wax-melts", label: "Wax melts", sales: 5.8, units: 5.8, visits: 4.1 },
      ],
      questions: [
        "Which categories are behind plan this week?",
        "Which hero SKUs have missed plan in each of the last 6 weeks?",
      ],
    },
    drivers: {
      title: "Out of stock accounts for $8.6K of the $141K gap",
      description: "Ordered sales below baseline, by what is behind it",
      rows: [
        { label: "Other SKUs (62)", value: 118, cause: "none" },
        { label: "Noir Cherry Large Jar", value: 7.1, cause: "search" },
        { label: "Bright Citrus Mini Jar", value: 4.2, cause: "stock" },
        { label: "Coastal Linen Large Jar", value: 3.6, cause: "buyBox" },
        { label: "Aurelle Travel Tin Trio", value: 2.5, cause: "stock" },
        { label: "Aurelle Holiday Trio Gift Set", value: 2.1, cause: "promo" },
        { label: "Cedar & Smoke Jar", value: 1.9, cause: "stock" },
        { label: "Aurelle Noir & Amber Duo", value: 1.3, cause: "promo" },
        { label: "Hearthwood Cabin Gift Set", value: 0.8, cause: "none" },
      ],
      offset: "$1.9K of gains from SKUs above baseline partly offset the gap.",
      questions: [
        "Which SKUs have gone out of stock most often in the last 4 weeks?",
        "Which hero SKUs have under 7 days of cover?",
      ],
    },
  },
};

export function categoryStatus(delta: number): CategoryStatus {
  if (delta <= -3) return "below";
  if (delta >= 3) return "above";
  return "normal";
}

export function formatPct(delta: number): string {
  return `${delta < 0 ? "−" : "+"}${Math.abs(delta).toFixed(1)}%`;
}

export function formatK(value: number): string {
  return `$${value < 10 ? value.toFixed(1) : Math.round(value)}K`;
}
