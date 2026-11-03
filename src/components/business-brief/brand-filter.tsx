"use client";

import { useMemo } from "react";
import {
  FilterBar,
  type FilterDataAdapter,
  type FilterState,
} from "@ciq-dev/ciq-design-system";

import { BRANDS, type Brand } from "@/lib/business-brief-data";

const BRAND_DIMENSION = "brand";

const brandFilterAdapter: FilterDataAdapter = {
  loadDimensions: async () => [
    { dimension_id: BRAND_DIMENSION, label: "Brand", type: "string" },
  ],
  loadValues: async () => BRANDS.map((brand) => ({ value: brand, label: brand })),
};

function brandToFilters(brand: Brand): FilterState {
  return {
    [BRAND_DIMENSION]: {
      type: "string",
      values: [brand],
      label: "Brand",
      ghost: true,
    },
  };
}

function filtersToBrand(filters: FilterState): Brand {
  const value = filters[BRAND_DIMENSION];
  if (value?.type === "string" && value.values.length > 0) {
    const selected = value.values[value.values.length - 1] as Brand;
    if (BRANDS.includes(selected)) return selected;
  }
  return "All brands";
}

type BrandFilterProps = {
  brand: Brand;
  onBrandChange: (brand: Brand) => void;
};

export function BrandFilter({ brand, onBrandChange }: BrandFilterProps) {
  const filters = useMemo(() => brandToFilters(brand), [brand]);

  return (
    <FilterBar
      filterDataAdapter={brandFilterAdapter}
      filters={filters}
      onFiltersApply={(next) => {
        const raw = next[BRAND_DIMENSION];
        if (raw?.type === "string" && raw.values.length > 1) {
          onBrandChange(
            filtersToBrand({
              [BRAND_DIMENSION]: {
                ...raw,
                values: [raw.values[raw.values.length - 1]!],
              },
            }),
          );
          return;
        }
        onBrandChange(filtersToBrand(next));
      }}
      hideFilterIcon
      showClearAll={false}
      chipSize="md"
    />
  );
}
