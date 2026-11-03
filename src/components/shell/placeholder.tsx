import { cn } from "@/lib/utils";

type PlaceholderProps = {
  label: string;
  hint?: string;
  className?: string;
};

/** Dashed block marking an area that will be designed later. */
export function Placeholder({ label, hint, className }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center",
        className,
      )}
    >
      <span className="type-body-strong text-fg-secondary">{label}</span>
      {hint && <span className="type-caption text-fg-tertiary">{hint}</span>}
    </div>
  );
}
