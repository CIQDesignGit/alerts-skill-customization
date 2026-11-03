import { LayoutTemplate } from "lucide-react";

type DetailPlaceholderProps = {
  experience: "ally" | "legacy";
  selectedTitle?: string;
};

export function DetailPlaceholder({ experience, selectedTitle }: DetailPlaceholderProps) {
  return (
    <section
      className="flex min-w-0 flex-1 flex-col border-l border-slate-200 bg-slate-50/80"
      aria-label="Alert details placeholder"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
          <LayoutTemplate className="size-6 text-slate-400" aria-hidden />
        </div>
        <div className="max-w-sm space-y-1">
          <p className="type-title text-fg-primary">Details coming soon</p>
          <p className="type-body text-fg-secondary">
            {experience === "ally" ? "Ally" : "Classic"} alert detail, charts, and actions will
            live here.
          </p>
          {selectedTitle ? (
            <p className="type-caption text-fg-tertiary pt-2">
              Selected: <span className="font-medium text-fg-secondary">{selectedTitle}</span>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
