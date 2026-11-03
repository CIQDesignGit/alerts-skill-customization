"use client";

import {
  Button,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@ciq-dev/ciq-design-system";
import {
  Clock,
  Gauge,
  House,
  LayoutGrid,
  MessageSquare,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ExperienceToggle } from "@/components/shell/experience-toggle";
import {
  CollapsedOnly,
  ExpandedOnly,
  SidebarToggleSurfaces,
  useSidebarCollapsed,
} from "@/components/shell/sidebar-collapse";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  meta?: string;
  metaTone?: "badge" | "count" | "negative";
};

const primary: NavItem[] = [
  { label: "For You", icon: House, href: "/", meta: "3", metaTone: "badge" },
  { label: "Ask Ally", icon: MessageSquare, href: "/ask-ally", meta: "3" },
];

const insights: NavItem[] = [
  {
    label: "Business Brief",
    icon: Gauge,
    href: "/business-brief",
  },
];

const workspace: NavItem[] = [
  { label: "Dashboards", icon: LayoutGrid, meta: "5" },
  { label: "Scheduled", icon: Clock, meta: "3" },
];

const sidebarInsetX = "px-4";

function metaClassName(tone?: NavItem["metaTone"]) {
  return cn(
    "shrink-0 text-right type-caption tabular-nums",
    tone === "badge" && "rounded-md bg-brand-500 px-1.5 py-0.5 type-caption-strong text-fg-inverse",
    tone === "negative" && "rounded bg-rose-950 px-1.5 font-mono text-rose-300",
    (!tone || tone === "count") && "text-sidebar-foreground/70",
  );
}

function NavMenuItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = item.href != null && item.href === pathname;
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      {item.href ? (
        <SidebarMenuButton asChild isActive={active} tooltip={item.label} className="w-full">
          <Link href={item.href} className="flex w-full min-w-0 items-center gap-2">
            <Icon aria-hidden />
            <ExpandedOnly>
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
            </ExpandedOnly>
            {item.meta ? (
              <ExpandedOnly>
                <span className={metaClassName(item.metaTone)}>{item.meta}</span>
              </ExpandedOnly>
            ) : null}
          </Link>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton tooltip={item.label} className="w-full">
          <Icon aria-hidden />
          <ExpandedOnly>
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
          </ExpandedOnly>
          {item.meta ? (
            <ExpandedOnly>
              <span className={metaClassName(item.metaTone)}>{item.meta}</span>
            </ExpandedOnly>
          ) : null}
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
}

function NavGroup({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroupContent>
      <SidebarMenu className="[&_[data-sidebar=menu-button]]:pr-0">
        {items.map((item) => (
          <NavMenuItem key={item.label} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <>
      <ExpandedOnly>
        <div className="mb-1 flex h-8 w-full items-center gap-2">
          <span className="min-w-0 flex-1 truncate type-caption-strong tracking-wider text-sidebar-foreground/70 uppercase">
            {title}
          </span>
          {action ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 shrink-0 px-2 type-caption text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              {action}
            </Button>
          ) : null}
        </div>
      </ExpandedOnly>
      <CollapsedOnly>
        <div className="mb-1 h-8 shrink-0" aria-hidden />
      </CollapsedOnly>
    </>
  );
}

function SidebarChromeHeader() {
  const collapsed = useSidebarCollapsed();

  return (
    <SidebarHeader
      className={cn(
        "relative z-10 flex h-14 min-h-14 w-full shrink-0 flex-row items-center border-b border-sidebar-border p-0 py-3 pointer-events-none [&_button]:pointer-events-auto",
        collapsed ? "justify-center px-1.5" : cn("gap-2", sidebarInsetX),
      )}
    >
      <ExpandedOnly>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-500">
          <Sparkles className="size-4 text-fg-inverse" aria-hidden />
        </div>
      </ExpandedOnly>
      <ExpandedOnly>
        <span className="min-w-0 flex-1 truncate type-title text-sidebar-foreground">CommerceIQ</span>
      </ExpandedOnly>
      <SidebarTrigger
        className={cn(
          "relative z-10 shrink-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          collapsed ? "size-7" : "ml-auto size-8",
        )}
      />
    </SidebarHeader>
  );
}

function SidebarChromeFooter() {
  const collapsed = useSidebarCollapsed();

  return (
    <SidebarFooter
      className={cn(
        "relative z-10 mt-auto shrink-0 gap-3 border-t border-sidebar-border p-2 pointer-events-none [&_button]:pointer-events-auto [&_label]:pointer-events-auto",
        collapsed && "items-center gap-2 p-1",
      )}
    >
      <ExpandedOnly>
        <div className="rounded-lg bg-sidebar-accent/40 px-3 py-2.5">
          <div className="flex items-center gap-2 type-body-strong text-sidebar-foreground">
            <span className="size-2 shrink-0 rounded-full bg-feedback-success" aria-hidden />
            Ally is working
          </div>
          <p className="mt-0.5 type-caption text-sidebar-foreground/80">
            <span className="text-fg-inverse">5</span> shelf fixes on autopilot
          </p>
        </div>
      </ExpandedOnly>
      <CollapsedOnly>
        <div
          className="flex size-8 items-center justify-center rounded-lg bg-sidebar-accent/40"
          title="Ally is working · 5 shelf fixes on autopilot"
        >
          <span className="size-2 rounded-full bg-feedback-success" aria-hidden />
        </div>
      </CollapsedOnly>
      <ExperienceToggle experience="new" className={cn(collapsed && "justify-center px-1")} />
    </SidebarFooter>
  );
}

export function NewSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      showSeparator={false}
      className="dark border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      <SidebarToggleSurfaces />
      <SidebarChromeHeader />

      <SidebarContent
        className={cn(
          "relative z-10 min-h-0 flex-1 pointer-events-none",
          "[&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_label]:pointer-events-auto",
        )}
      >
        <SidebarGroup className={cn("p-0 py-1", sidebarInsetX)}>
          <NavGroup items={primary} />
        </SidebarGroup>

        <SidebarGroup className={cn("p-0 py-1", sidebarInsetX)}>
          <SectionHeader title="Insights" action="+ New" />
          <NavGroup items={insights} />
        </SidebarGroup>

        <SidebarGroup className={cn("p-0 py-1", sidebarInsetX)}>
          <SectionHeader title="My workspace" />
          <NavGroup items={workspace} />
        </SidebarGroup>
      </SidebarContent>

      <SidebarChromeFooter />
      <SidebarRail />
    </Sidebar>
  );
}
