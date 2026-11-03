"use client";

import { Switch } from "@ciq-dev/ciq-design-system";

import { useAlertsExperience } from "@/components/alerts/experience-context";
import { cn } from "@/lib/utils";

type ExperienceToggleProps = {
  className?: string;
  variant?: "ally" | "legacy";
};

/** Subtle footer control to swap CommerceIQ classic vs Ally alerts chrome. */
export function ExperienceToggle({ className, variant = "legacy" }: ExperienceToggleProps) {
  const { isAlly, setExperience } = useAlertsExperience();

  const onCheckedChange = (checked: boolean) => {
    setExperience(checked ? "ally" : "legacy");
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 border-t px-3 py-2.5",
        variant === "ally"
          ? "border-white/10 text-white/70"
          : "border-shell-border text-shell-muted",
        className,
      )}
    >
      <div className="min-w-0">
        <p
          className={cn(
            "type-caption-strong truncate",
            variant === "ally" ? "text-white/80" : "text-shell-foreground/80",
          )}
        >
          Ally alerts layout
        </p>
        <p className="type-caption truncate opacity-80">Toggle classic vs new</p>
      </div>
      <Switch
        checked={isAlly}
        onCheckedChange={onCheckedChange}
        aria-label="Use Ally alerts layout"
        className="shrink-0 data-[state=checked]:bg-brand-500"
      />
    </div>
  );
}
