"use client";

import { Switch } from "@ciq-dev/ciq-design-system";

import { setExperience, type Experience } from "@/lib/experience";
import { cn } from "@/lib/utils";

import { ExpandedOnly } from "@/components/shell/sidebar-collapse";

type ExperienceToggleProps = {
  experience: Experience;
  className?: string;
};

export function ExperienceToggle({ experience, className }: ExperienceToggleProps) {
  const isNew = experience === "new";
  const label = (
    <span className="min-w-0 flex-1 text-brand-300 leading-snug">
      {isNew ? "Switch to classic view" : "Try the new experience"}
    </span>
  );

  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-2 px-3 py-2 type-caption transition-colors",
        className,
      )}
    >
      {isNew ? <ExpandedOnly>{label}</ExpandedOnly> : label}
      <Switch
        checked={isNew}
        onCheckedChange={(checked) => setExperience(checked ? "new" : "old")}
        aria-label={
          isNew
            ? "Turn off to return to classic CommerceIQ"
            : "Turn on to try the new Ally experience"
        }
        className="shrink-0 scale-75"
      />
    </label>
  );
}
