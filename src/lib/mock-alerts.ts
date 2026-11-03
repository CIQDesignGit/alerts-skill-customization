export type AlertListItem = {
  id: string;
  title: string;
  skuCount: number;
  valueLabel: string;
  group: string;
  productLine?: string;
};

export const LEGACY_ALERT_GROUPS: { label: string; items: AlertListItem[] }[] = [
  {
    label: "Lost Buy Box",
    items: [
      {
        id: "lbb-1",
        title: "Shark PowerPro Reveal Plus Cordless Stick Vacuum",
        skuCount: 1,
        valueLabel: "$814K",
        group: "Lost Buy Box",
        productLine: "Shark PowerPro Reveal Plus Cordless Stick Vacuum",
      },
    ],
  },
  {
    label: "Missing Promo Badge",
    items: [
      {
        id: "mpb-1",
        title: "Shark PowerPro Reveal Plus Cordless Stick Vacuum",
        skuCount: 1,
        valueLabel: "$814K",
        group: "Missing Promo Badge",
      },
    ],
  },
  {
    label: "Deal Page Visibility",
    items: [
      {
        id: "dpv-1",
        title: "Shark PowerPro Reveal Plus Cordless Stick Vacuum",
        skuCount: 1,
        valueLabel: "$814K",
        group: "Deal Page Visibility",
      },
    ],
  },
  {
    label: "OOS",
    items: [
      {
        id: "oos-1",
        title: "Shark PowerPro Reveal Plus Cordless Stick Vacuum",
        skuCount: 1,
        valueLabel: "$814K",
        group: "OOS",
      },
    ],
  },
];

export const ALLY_ALERT_ITEMS: AlertListItem[] = [
  {
    id: "map-1",
    title: "Third-party sellers below MAP",
    skuCount: 3,
    valueLabel: "$48K",
    group: "HIGH",
    productLine: "Aurelle Amber Floral Soy Jar",
  },
  {
    id: "price-1",
    title: "Third-party seller under 2% cheaper",
    skuCount: 1,
    valueLabel: "$12K",
    group: "HIGH",
  },
  {
    id: "avail-1",
    title: "Availability dropping",
    skuCount: 2,
    valueLabel: "$9K",
    group: "MEDIUM",
  },
  {
    id: "avail-2",
    title: "Availability on and off",
    skuCount: 1,
    valueLabel: "$4K",
    group: "MEDIUM",
  },
];

export const DEFAULT_SELECTED_ID = "map-1";
