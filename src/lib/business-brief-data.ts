export type PeriodId = "last" | "this";

export const PERIOD_IDS: PeriodId[] = ["last", "this"];

export const BRANDS = ["All brands", "Aurelle", "Hearthwood", "Bright Citrus"] as const;
export type Brand = (typeof BRANDS)[number];

export type GapLevel = "overall" | "category" | "sku";

export type GapCause = "buyBox" | "stock" | "search" | "promo";

export const CAUSES: Record<GapCause, { label: string }> = {
  buyBox: { label: "Lost buy box" },
  stock: { label: "Out of stock" },
  search: { label: "Search rank" },
  promo: { label: "Promotions" },
};

export type Reason = {
  cause: GapCause;
  value: number;
  action: string;
  question?: string;
  skus: GapNode[];
};

export type GapNode = {
  id: string;
  label: string;
  note: string;
  level: GapLevel;
  gap: Record<PeriodId, number>;
  plan: Record<PeriodId, number>;
  children?: GapNode[];
  other?: { count: number; gap: Record<PeriodId, number> };
  diagnosis?: Record<PeriodId, { evidence: string[] }>;
};

type RawGapNode = {
  id: string;
  label: string;
  note: string;
  gap: Record<PeriodId, number>;
  children?: RawGapNode[];
  diagnosis?: Record<PeriodId, { evidence: string[] }>;
};

const RAW_GAP_TREE: RawGapNode[] = [
  {
    id: "jar-candles",
    label: "Jar candles",
    note: "Amber Floral Soy Jar: CandleDepot holds the buy box below your MAP",
    gap: { last: -138_000, this: -118_000 },
    children: [
      { id: "amber", label: "Amber Floral Soy Jar, 16 oz", note: "CandleDepot holds the buy box below your MAP", gap: { last: -4_100, this: 15 } },
      { id: "coastal", label: "Coastal Linen Large Jar, 22 oz", note: "Lost the buy box to Glow&Co by $0.15", gap: { last: -3_900, this: -3_900 } },
      { id: "noir", label: "Noir Cherry Large Jar, 22 oz", note: 'Rank #24 on "fall candles"', gap: { last: -2_800, this: -5_500 } },
      { id: "cedar", label: "Cedar & Smoke Jar, 18 oz", note: "4 days of cover left", gap: { last: -3_100, this: -2_200 } },
      { id: "bright-citrus", label: "Bright Citrus Mini Jar, 8 oz", note: "Out of stock at 3 of 5 fulfilment centres", gap: { last: -1_700, this: -3_700 } },
    ],
  },
  {
    id: "gift-sets",
    label: "Gift sets",
    note: "Aurelle Holiday Trio Gift Set: Oct 12 lightning deal was not approved",
    gap: { last: -55_000, this: -73_000 },
    children: [
      { id: "holiday-trio", label: "Aurelle Holiday Trio Gift Set", note: "Oct 12 lightning deal was not approved", gap: { last: -31_000, this: -44_000 } },
      { id: "hearth-duo", label: "Hearthwood Fireside Duo", note: "Missing promo badge on PDP", gap: { last: -24_000, this: -29_000 } },
    ],
  },
  {
    id: "wax-melts",
    label: "Wax melts",
    note: "Aurelle Wax Melt Sampler: Delivery promise slipped to 5 days",
    gap: { last: -37_000, this: 4_400 },
    children: [
      { id: "melt-sampler", label: "Aurelle Wax Melt Sampler", note: "Delivery promise slipped to 5 days", gap: { last: -37_000, this: 4_400 } },
    ],
  },
  {
    id: "travel-tins",
    label: "Travel tins",
    note: "Aurelle Travel Tin Trio: Inbound PO shorted 40%",
    gap: { last: -10_000, this: -14_000 },
    children: [
      { id: "tin-trio", label: "Aurelle Travel Tin Trio", note: "Inbound PO shorted 40%", gap: { last: -10_000, this: -14_000 } },
    ],
  },
];

const RAW_OVERALL: RawGapNode = {
  id: "overall",
  label: "Overall business",
  note: "Amber Floral Soy Jar: CandleDepot holds the buy box below your MAP",
  gap: { last: -240_000, this: -200_000 },
};

const LEVELS: Record<string, GapLevel> = {
  overall: "overall",
  "jar-candles": "category",
  "gift-sets": "category",
  "wax-melts": "category",
  "travel-tins": "category",
};

const PLANS: Record<string, Record<PeriodId, number>> = {
  overall: { last: 3_660_000, this: 3_700_000 },
  "jar-candles": { last: 1_318_000, this: 1_138_000 },
  "gift-sets": { last: 605_000, this: 568_000 },
  "wax-melts": { last: 235_000, this: 235_000 },
  "travel-tins": { last: 80_000, this: 72_000 },
  amber: { last: 86_000, this: 85_000 },
  coastal: { last: 52_000, this: 52_000 },
  noir: { last: 48_000, this: 52_500 },
  cedar: { last: 41_000, this: 39_800 },
  "bright-citrus": { last: 34_000, this: 37_700 },
  "holiday-trio": { last: 310_000, this: 371_000 },
  "hearth-duo": { last: 264_000, this: 323_000 },
  "melt-sampler": { last: 235_000, this: 235_000 },
  "tin-trio": { last: 80_000, this: 72_000 },
};

const OTHER_BY_ID: Partial<Record<string, GapNode["other"]>> = {
  overall: { count: 62, gap: { last: -43_200, this: -118_000 } },
  "jar-candles": { count: 12, gap: { last: -95_000, this: -82_000 } },
  "gift-sets": { count: 4, gap: { last: -11_000, this: -8_000 } },
};

const SKU_CAUSE: Record<string, GapCause> = {
  amber: "buyBox",
  coastal: "buyBox",
  noir: "search",
  cedar: "stock",
  "bright-citrus": "stock",
  "holiday-trio": "promo",
  "hearth-duo": "promo",
  "melt-sampler": "stock",
  "tin-trio": "stock",
};

const REASON_ACTIONS: Record<GapCause, string> = {
  buyBox: "Enforce MAP with CandleDepot and Glow&Co",
  stock: "Rebalance stock to fulfilment centres that ran out",
  search: 'Bid "fall candles" through Halloween',
  promo: "Resubmit the Oct 12 lightning deal",
};

const REASON_QUESTIONS: Partial<Record<GapCause, string>> = {
  buyBox: "Which sellers are pricing below MAP on hero SKUs?",
  stock: "Which SKUs have gone out of stock most often in the last 4 weeks?",
};

function enrich(raw: RawGapNode): GapNode {
  const plan = PLANS[raw.id] ?? {
    last: Math.max(10_000, raw.gap.last + 100_000),
    this: Math.max(10_000, raw.gap.this + 100_000),
  };
  return {
    ...raw,
    level: LEVELS[raw.id] ?? "sku",
    plan,
    other: OTHER_BY_ID[raw.id],
    children: raw.children?.map(enrich),
  };
}

export const GAP_TREE: GapNode[] = RAW_GAP_TREE.map(enrich);
export const OVERALL: GapNode = enrich(RAW_OVERALL);

export function findNode(id: string): GapNode {
  if (id === OVERALL.id) return OVERALL;
  for (const node of GAP_TREE) {
    if (node.id === id) return node;
    const child = node.children?.find((c) => c.id === id);
    if (child) return child;
  }
  return OVERALL;
}

export type Metric = {
  label: string;
  value: string;
  delta: string;
  status: "below" | "normal";
};

export type PeriodSoFar = {
  elapsed: number;
  actual: number;
  plan: number;
  note: string;
};

export type Period = {
  id: PeriodId;
  tabLabel: string;
  gapCaption: string;
  range: string;
  rangeLabel: string;
  baselineLabel: string;
  summary: string;
  baselineNote: string;
  metrics: Metric[];
  soFar?: PeriodSoFar;
};

export const PERIODS: Record<PeriodId, Period> = {
  last: {
    id: "last",
    tabLabel: "Last week",
    gapCaption: "Gap to plan · last week",
    range: "Sep 28 – Oct 4",
    rangeLabel: "Last week (Sep 28 – Oct 4)",
    baselineLabel: "7-week baseline (Aug 3 – Sep 27)",
    summary:
      "Last week (Sep 28 – Oct 4), ordered sales were $3.42M, 5.2% below the baseline of $3.61M and below the usual weekly range. Units were 4.9% below baseline, and page visits 6.6% below.",
    baselineNote:
      "Baseline is the average of the 7 weeks Aug 3 – Sep 27, leaving out Labor Day week (Aug 31). Normal means last week fell between the highest and lowest of those weeks.",
    metrics: [
      { label: "Sales", value: "$3.42M", delta: "−5.2% vs baseline", status: "below" },
      { label: "Units", value: "150K", delta: "−4.9% vs baseline", status: "below" },
      { label: "Page visits", value: "1.25M", delta: "−6.6% vs baseline", status: "below" },
      { label: "Conversion", value: "12.0%", delta: "+1.8% vs baseline", status: "normal" },
    ],
  },
  this: {
    id: "this",
    tabLabel: "This week",
    gapCaption: "Gap to plan · this week, projected",
    range: "Oct 5–8",
    rangeLabel: "This week so far (Oct 5–8)",
    baselineLabel: "7-week baseline (Aug 10 – Oct 1)",
    summary:
      "This week so far (Oct 5–8), ordered sales were $1.9M, 6.8% below the baseline of $2.04M and below the usual weekly range. Units were 5.7% below baseline, and page visits 7.6% below.",
    baselineNote:
      "Baseline is the average of the 7 weeks Aug 10 – Oct 1, leaving out Labor Day week (Aug 31). Normal means this week fell between the highest and lowest of those weeks. This week is so far, so every week here is its Mon–Thu, like for like.",
    metrics: [
      { label: "Sales", value: "$1.9M", delta: "−6.8% vs baseline", status: "below" },
      { label: "Units", value: "84K", delta: "−5.7% vs baseline", status: "below" },
      { label: "Page visits", value: "698K", delta: "−7.6% vs baseline", status: "below" },
      { label: "Conversion", value: "12.1%", delta: "+2.1% vs baseline", status: "normal" },
    ],
    soFar: {
      elapsed: 0.57,
      actual: 1_900_000,
      plan: 2_110_000,
      note: "Mon–Thu pacing is behind the weekly plan.",
    },
  },
};

export type BriefAction = {
  title: string;
  sku?: string;
  meta: string;
  question?: string;
  openInForYou?: boolean;
};

export const ACTIONS: Record<PeriodId, { heading: string; items: BriefAction[] }> = {
  last: {
    heading: "Recommended actions",
    items: [
      {
        title: "Enforce MAP with CandleDepot and Glow&Co",
        sku: "Amber Floral Soy Jar",
        meta: "Lost buy box · $102K below baseline",
        question: "Which sellers priced below MAP on hero SKUs last week?",
        openInForYou: true,
      },
      {
        title: "Resubmit the Oct 12 lightning deal",
        sku: "Aurelle Holiday Trio Gift Set",
        meta: "Promotions · $31K below baseline",
        openInForYou: true,
      },
      {
        title: "Rebalance stock to the 2 fulfilment centres that ran out",
        sku: "Aurelle Wax Melt Sampler",
        meta: "Out of stock · $37K below baseline",
        question: "Which SKUs have gone out of stock most often in the last 4 weeks?",
        openInForYou: true,
      },
      {
        title: 'Bid "fall candles" through Halloween',
        sku: "Noir Cherry Large Jar",
        meta: "Search · $2.8K below baseline",
      },
    ],
  },
  this: {
    heading: "Recommended actions",
    items: [
      {
        title: "Enforce MAP on 4 hero SKUs",
        sku: "Amber Floral Soy Jar",
        meta: "Lost buy box · $102K below baseline",
        question: "Which sellers are pricing below MAP on hero SKUs?",
        openInForYou: true,
      },
      {
        title: 'Add "fall candles" now; swap to holiday terms on Nov 2',
        sku: "Noir Cherry Large Jar",
        meta: "Listing and content · $7.1K below baseline",
        openInForYou: true,
      },
      {
        title: "Lower price $0.95 in two regions",
        sku: "Noir Cherry Large Jar",
        meta: "Lost buy box · $7.1K below baseline",
        question: "Which 3P sellers have taken the buy box most often in the last 4 weeks?",
        openInForYou: true,
      },
      {
        title: "Request a transfer and expedite the open PO",
        sku: "Bright Citrus Mini Jar",
        meta: "Out of stock · $4.2K below baseline",
        question: "Which SKUs have gone out of stock most often in the last 4 weeks?",
        openInForYou: true,
      },
      {
        title: 'Answer Brightwick: bid "fall candles" through Halloween',
        meta: "Competitor move · Tue, Oct 6",
      },
    ],
  },
};

export type ChatTable = {
  columns: string[];
  rows: { cells: string[]; delta?: number }[];
};

export type ChatReply = { text: string; table?: ChatTable };

const CATEGORY_REPLY: ChatReply = {
  text: "3 of 4 categories are behind plan this week so far. Only wax melts are ahead.",
  table: {
    columns: ["Category", "This week so far", "Plan", "vs plan"],
    rows: [
      { cells: ["Jar candles", "$1.02M", "$1.07M", "−5.0%"], delta: -5 },
      { cells: ["Gift sets", "$460K", "$495K", "−7.0%"], delta: -7 },
      { cells: ["Wax melts", "$240K", "$235K", "+2.0%"], delta: 2 },
      { cells: ["Travel tins", "$180K", "$186K", "−3.0%"], delta: -3 },
    ],
  },
};

const SELLER_REPLY: ChatReply = {
  text: "CandleDepot and Glow&Co have held the buy box most often on your hero SKUs over the last 4 weeks, usually by pricing $0.15–$0.40 under MAP.",
  table: {
    columns: ["Seller", "Buy box share", "Avg. under MAP", "SKUs"],
    rows: [
      { cells: ["CandleDepot", "38%", "−$0.40", "3"] },
      { cells: ["Glow&Co", "21%", "−$0.15", "2"] },
      { cells: ["HomeScents Outlet", "9%", "−$0.25", "1"] },
    ],
  },
};

const STOCK_REPLY: ChatReply = {
  text: "Bright Citrus Mini Jar has gone out of stock most often — 3 of the last 4 weeks. An open PO of 2,400 units is due Oct 14.",
  table: {
    columns: ["SKU", "Weeks out of stock", "Fulfilment centres", "Est. lost sales"],
    rows: [
      { cells: ["Bright Citrus Mini Jar, 8 oz", "3 of 4", "3 of 5", "−$11.2K"], delta: -11 },
      { cells: ["Cedar & Smoke Jar, 18 oz", "1 of 4", "1 of 5", "−$2.2K"], delta: -2 },
    ],
  },
};

export function replyFor(question: string, scopeLabel: string): ChatReply {
  const q = question.toLowerCase();
  if (q.includes("categor")) return CATEGORY_REPLY;
  if (q.includes("seller") || q.includes("buy box") || q.includes("map")) return SELLER_REPLY;
  if (q.includes("stock")) return STOCK_REPLY;
  return {
    text: `For ${scopeLabel.toLowerCase()}, the biggest driver is still the lost buy box on hero jar candles. Enforcing MAP on the 4 hero SKUs would recover roughly half of this week's gap.`,
  };
}

export function formatGap(value: number): string {
  const sign = value < 0 ? "−" : "+";
  const abs = Math.abs(value);
  if (abs >= 1_000) {
    const k = abs / 1_000;
    return `${sign}$${Number.isInteger(k) ? k : k.toFixed(1)}K`;
  }
  return `${sign}$${abs}`;
}

export function formatMoney(value: number): string {
  const sign = value < 0 ? "−" : "";
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    const m = abs / 1_000_000;
    const formatted = m >= 10 ? m.toFixed(1) : m.toFixed(2);
    return `${sign}$${formatted.replace(/\.0+$/, "").replace(/(\.\d)0$/, "$1")}M`;
  }
  if (abs >= 1_000) {
    const k = abs / 1_000;
    return `${sign}$${Number.isInteger(k) ? k : k.toFixed(1)}K`;
  }
  return `${sign}$${abs}`;
}

export function pctOfPlan(node: GapNode, period: PeriodId): number {
  const plan = node.plan[period];
  if (plan <= 0) return 0;
  return Math.round(((node.plan[period] + node.gap[period]) / plan) * 100);
}

export function nodeNote(node: GapNode, period: PeriodId): string {
  void period;
  return node.note;
}

export function shortLabel(label: string): string {
  const [head] = label.split(",");
  return head.trim();
}

export function unattributed(
  scope: GapNode,
  period: PeriodId,
): { value: number; count: number } | null {
  if (!scope.other) return null;
  return { value: scope.other.gap[period], count: scope.other.count };
}

function leafSkus(scope: GapNode): GapNode[] {
  if (scope.level === "sku") return [scope];
  if (!scope.children?.length) return [];
  return scope.children.flatMap(leafSkus);
}

export function reasonsFor(scope: GapNode, period: PeriodId): Reason[] {
  const skus = leafSkus(scope).filter((sku) => sku.gap[period] < 0);
  if (skus.length === 0) return [];

  if (scope.level === "sku") {
    const cause = SKU_CAUSE[scope.id] ?? "buyBox";
    return [
      {
        cause,
        value: scope.gap[period],
        action: REASON_ACTIONS[cause],
        question: REASON_QUESTIONS[cause],
        skus: [scope],
      },
    ];
  }

  const groups = new Map<GapCause, GapNode[]>();
  for (const sku of skus) {
    const cause = SKU_CAUSE[sku.id] ?? "buyBox";
    const list = groups.get(cause) ?? [];
    list.push(sku);
    groups.set(cause, list);
  }

  return [...groups.entries()]
    .map(([cause, skuList]) => ({
      cause,
      value: skuList.reduce((sum, sku) => sum + sku.gap[period], 0),
      action: REASON_ACTIONS[cause],
      question: REASON_QUESTIONS[cause],
      skus: [...skuList].sort((a, b) => a.gap[period] - b.gap[period]),
    }))
    .filter((reason) => reason.value < 0)
    .sort((a, b) => a.value - b.value);
}
