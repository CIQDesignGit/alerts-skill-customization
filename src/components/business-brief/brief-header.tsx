import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ciq-dev/ciq-design-system";

import { BrandFilter } from "@/components/business-brief/brand-filter";
import type { Brand, Period } from "@/lib/business-brief-data";

type BriefHeaderProps = {
  title: string;
  period: Period | null;
  brand: Brand;
  onBrandChange: (brand: Brand) => void;
};

export function BriefTopBar() {
  return (
    <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">For You</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Business Brief</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Avatar className="size-9">
        <AvatarImage src="https://placehold.co/36x36" alt="Michelle" />
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function BriefHeader({ title, period, brand, onBrandChange }: BriefHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="type-title text-fg-primary">{title}</h1>
      <div className="flex flex-wrap items-center gap-4">
        {period && (
          <p className="type-body text-fg-secondary">
            <span className="font-semibold text-fg-primary underline decoration-brand-300 decoration-2 underline-offset-4">
              {period.rangeLabel}
            </span>{" "}
            vs{" "}
            <span className="font-semibold text-fg-primary underline decoration-brand-300 decoration-2 underline-offset-4">
              {period.baselineLabel}
            </span>
          </p>
        )}
        <BrandFilter brand={brand} onBrandChange={onBrandChange} />
      </div>
    </div>
  );
}
