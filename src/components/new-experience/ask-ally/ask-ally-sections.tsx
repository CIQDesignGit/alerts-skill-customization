"use client";

import { Sparkles } from "lucide-react";

import { Button } from "@ciq-dev/ciq-design-system";

import type { NoticedInsight } from "@/lib/ask-ally-data";
import { cn } from "@/lib/utils";

type AskAllyNoticedProps = {
  items: NoticedInsight[];
  onSelect: (question: string) => void;
};

export function AskAllyNoticed({ items, onSelect }: AskAllyNoticedProps) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 type-body-strong text-fg-primary">
        <Sparkles className="size-4 text-brand-600" aria-hidden />
        Ally noticed this week
      </h2>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.question)}
            className={cn(
              "rounded-xl border border-border-default bg-surface p-4 text-left shadow-sm",
              "transition-colors hover:border-brand-200 hover:bg-brand-50/40",
            )}
          >
            <p className="flex items-center gap-2 type-caption text-fg-tertiary">
              <span
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  item.tone === "danger" ? "bg-feedback-danger" : "bg-feedback-warning",
                )}
                aria-hidden
              />
              {item.context}
            </p>
            <p className="mt-2 type-body-strong text-fg-primary">{item.question}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

type AskAllyStartersProps = {
  columns: { id: string; title: string; questions: string[] }[];
  onSelect: (question: string) => void;
};

export function AskAllyStarters({ columns, onSelect }: AskAllyStartersProps) {
  return (
    <section className="space-y-4">
      <h2 className="type-body-strong text-fg-primary">Or start from a question</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {columns.map((column) => (
          <div key={column.id} className="space-y-2">
            <p className="type-caption-strong tracking-wider text-fg-tertiary uppercase">
              {column.title}
            </p>
            <ul className="space-y-2">
              {column.questions.map((question) => (
                <li key={question}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onSelect(question)}
                    className="h-auto min-h-10 w-full justify-start rounded-xl border-border-default bg-surface-subtle py-3 text-left font-normal whitespace-normal text-fg-primary hover:bg-surface-muted"
                  >
                    {question}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AskAllyConversations({
  items,
}: {
  items: { id: string; preview: string; timestamp: string }[];
}) {
  return (
    <section className="space-y-3 pb-4">
      <h2 className="type-body-strong text-fg-primary">Your conversations</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="flex w-full items-baseline justify-between gap-4 rounded-lg px-2 py-2 text-left transition-colors hover:bg-surface-muted"
            >
              <span className="type-body text-fg-secondary">{item.preview}</span>
              <span className="shrink-0 type-caption text-fg-tertiary">{item.timestamp}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
