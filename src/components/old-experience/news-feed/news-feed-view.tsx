"use client";

import { useState } from "react";

import { LegacyChromeHeader } from "@/components/agentspace/legacy-chrome-header";
import {
  DEFAULT_LEGACY_SKU_ID,
  legacyDetailForSku,
  legacySkuById,
  type LegacySkuRow,
} from "@/lib/legacy-news-feed-data";

import { NewsFeedDetail } from "./news-feed-detail";
import { NewsFeedList } from "./news-feed-list";
import { NewsFeedToolbar } from "./news-feed-toolbar";

export function NewsFeedView() {
  const [selectedId, setSelectedId] = useState(DEFAULT_LEGACY_SKU_ID);
  const sku = legacySkuById(selectedId) ?? legacySkuById(DEFAULT_LEGACY_SKU_ID)!;
  const detail = legacyDetailForSku(selectedId)!;

  const handleSelect = (row: LegacySkuRow) => {
    setSelectedId(row.id);
  };

  return (
    <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden bg-surface">
      <LegacyChromeHeader />
      <NewsFeedToolbar />
      <div className="flex min-h-0 flex-1">
        <NewsFeedList selectedId={selectedId} onSelect={handleSelect} />
        <NewsFeedDetail sku={sku} detail={detail} />
      </div>
    </div>
  );
}
