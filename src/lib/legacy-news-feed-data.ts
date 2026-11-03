export type CheckStatus = "pass" | "fail" | "neutral";

export type LegacySkuRow = {
  id: string;
  name: string;
  asin: string;
  category: string;
  model: string;
  ops: string;
  gap: string;
};

export type LegacyIssueGroup = {
  id: string;
  label: string;
  skuCount: number;
  opsTotal: string;
  items: LegacySkuRow[];
  viewMoreCount?: number;
};

export type LegacyAlertDetail = {
  skuId: string;
  issueLabel: string;
  insight: string;
  checks: { label: string; status: CheckStatus }[];
  originalPrice: string;
  mrp: string;
  sellingPrice: string;
};

export const LEGACY_FEED_META = {
  brandGap: "-$15.81M",
  skuTotal: 149,
  lastUpdated: "Today, 11:24 AM",
  lastUpdatedAgo: "5 hrs ago",
};

export const LEGACY_ISSUE_GROUPS: LegacyIssueGroup[] = [
  {
    id: "missing-promo-badge",
    label: "Missing Promo Badge",
    skuCount: 67,
    opsTotal: "$8.1M",
    viewMoreCount: 62,
    items: [
      {
        id: "mpb-nv360",
        name: "Shark Navigator Lift-Away Vacuum, HEPA, Carpet and Pet Hair, Blue, NV360",
        asin: "B00JH98GR4",
        category: "Uprights",
        model: "NV360",
        ops: "$1.3M",
        gap: "-$371.9K",
      },
      {
        id: "mpb-stratos",
        name: "Shark Stratos Upright Vacuum",
        asin: "B0B1B2B3B4",
        category: "Uprights",
        model: "AZ2002",
        ops: "$1M",
        gap: "-$290K",
      },
      {
        id: "mpb-powerpro-flex",
        name: "Shark PowerPro Flex",
        asin: "B0C1D2E3F4",
        category: "Uprights",
        model: "IF250",
        ops: "$544.7K",
        gap: "-$180K",
      },
      {
        id: "mpb-possiblecooker",
        name: "Ninja PossibleCooker",
        asin: "B0D5E6F7G8",
        category: "Small Appliances",
        model: "MC1001",
        ops: "$512K",
        gap: "-$165K",
      },
      {
        id: "mpb-neverchange",
        name: "Shark NeverChange Air Purifier",
        asin: "B0H1I2J3K4",
        category: "Air Purifiers",
        model: "HP201",
        ops: "$498K",
        gap: "-$142K",
      },
    ],
  },
  {
    id: "deal-page-visibility",
    label: "Deal Page Visibility",
    skuCount: 46,
    opsTotal: "$3.4M",
    items: [],
  },
  {
    id: "oos",
    label: "OOS",
    skuCount: 17,
    opsTotal: "$2.0M",
    items: [],
  },
  {
    id: "lost-buy-box",
    label: "Lost Buy Box",
    skuCount: 15,
    opsTotal: "$1.2M",
    items: [],
  },
  {
    id: "active-coupon",
    label: "Active Coupon",
    skuCount: 4,
    opsTotal: "$872.3K",
    items: [],
  },
];

export const LEGACY_ALERT_DETAILS: Record<string, LegacyAlertDetail> = {
  "mpb-nv360": {
    skuId: "mpb-nv360",
    issueLabel: "Missing Promo Badge",
    insight:
      "Your product is on discount from 25 Oct to 7 Nov, but there is some issue with the display.",
    checks: [
      { label: "Promo Badge Visible?", status: "fail" },
      { label: "Selling Price is Correct?", status: "fail" },
      { label: "Original price is struck through?", status: "pass" },
    ],
    originalPrice: "$124.99",
    mrp: "$199.99",
    sellingPrice: "$119.99",
  },
};

export const DEFAULT_LEGACY_SKU_ID = "mpb-nv360";

export function legacySkuById(id: string): LegacySkuRow | undefined {
  for (const group of LEGACY_ISSUE_GROUPS) {
    const found = group.items.find((item) => item.id === id);
    if (found) return found;
  }
  return undefined;
}

export function legacyDetailForSku(id: string): LegacyAlertDetail | undefined {
  if (LEGACY_ALERT_DETAILS[id]) return LEGACY_ALERT_DETAILS[id];
  const sku = legacySkuById(id);
  if (!sku) return undefined;
  return {
    skuId: id,
    issueLabel: "Missing Promo Badge",
    insight: "Review promo display and pricing on the product detail page.",
    checks: [
      { label: "Promo Badge Visible?", status: "fail" },
      { label: "Selling Price is Correct?", status: "fail" },
      { label: "Original price is struck through?", status: "pass" },
    ],
    originalPrice: "$124.99",
    mrp: "$199.99",
    sellingPrice: "$119.99",
  };
}
