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

export function AskAllyTopBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">For You</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Ask Ally</BreadcrumbPage>
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
