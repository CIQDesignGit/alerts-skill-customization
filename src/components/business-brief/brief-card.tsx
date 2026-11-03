import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@ciq-dev/ciq-design-system";

import { cn } from "@/lib/utils";

type BriefCardProps = {
  title?: string;
  description?: string;
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function BriefCard({ title, description, aside, className, children }: BriefCardProps) {
  return (
    <section className={cn("space-y-5 rounded-2xl border border-border-default bg-surface p-6 shadow-sm", className)}>
      {title && (
        <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <div className="space-y-1">
            <h3 className="type-title text-fg-primary">{title}</h3>
            {description && <p className="type-body text-fg-secondary">{description}</p>}
          </div>
          {aside}
        </header>
      )}
      {children}
    </section>
  );
}

type AskChipsProps = {
  questions: string[];
  onAsk: (question: string) => void;
};

export function AskChips({ questions, onAsk }: AskChipsProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      {questions.map((question) => (
        <AskChip key={question} question={question} onAsk={onAsk} />
      ))}
    </div>
  );
}

export function AskChip({ question, onAsk }: { question: string; onAsk: (question: string) => void }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onAsk(question)}
      className="h-auto min-h-8 rounded-2xl border-brand-200 bg-brand-50 py-1.5 text-left whitespace-normal text-fg-brand hover:bg-brand-100"
    >
      <Sparkles className="text-brand-600" aria-hidden />
      {question}
    </Button>
  );
}

export function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 type-body text-fg-secondary">
      <span className={cn("size-3 rounded-full", className)} aria-hidden />
      {label}
    </span>
  );
}
