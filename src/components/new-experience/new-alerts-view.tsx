"use client";

import { useState } from "react";
import { Search, SendHorizontal, Sparkles } from "lucide-react";
import {
  Button,
  PromptInput,
  PromptInputLeading,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTrailing,
} from "@ciq-dev/ciq-design-system";

import { Placeholder } from "@/components/shell/placeholder";

export function NewAlertsView() {
  const [allyPrompt, setAllyPrompt] = useState("");

  function submitAllyPrompt() {
    const trimmed = allyPrompt.trim();
    if (!trimmed) return;
    setAllyPrompt("");
  }

  return (
    <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden bg-slate-100">
      <header className="flex items-end justify-between gap-4 px-6 pt-4 pb-3">
        <div className="shrink-0">
          <p className="type-caption-strong tracking-wider whitespace-nowrap text-fg-tertiary uppercase">
            Thursday, Oct 8
          </p>
          <h1 className="type-heading whitespace-nowrap text-indigo-950">
            Michelle, 18 decisions today
          </h1>
        </div>
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="outline" className="shrink-0">
            + New alert
          </Button>
          <div className="flex h-9 w-72 min-w-0 items-center gap-2 rounded-lg border border-border-default bg-surface px-3 type-body text-fg-tertiary">
            <Search className="size-4 shrink-0" aria-hidden />
            <span className="flex-1 truncate">SKU, ASIN, category or brand</span>
            <kbd className="rounded border border-border-default px-1.5 type-caption">/</kbd>
          </div>
          <img
            src="https://placehold.co/36x36"
            alt="Michelle"
            className="size-9 shrink-0 rounded-full"
          />
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[17.5rem_1fr] gap-3 px-6 pb-3">
        <div className="flex min-h-0 flex-col gap-3">
          <Placeholder label="Protected summary" hint="$ protected by Ally · autopilot" className="h-24 bg-slate-900/5" />
          <Placeholder label="Alert list" hint="To decide · Autopilot · My list" className="flex-1" />
        </div>
        <div className="flex min-h-0 flex-col gap-3">
          <Placeholder label="Decision summary" hint="Open value · issue-type breakdown" className="h-24" />
          <Placeholder label="Alert detail" hint="Selected alert diagnosis and options" className="flex-1" />
        </div>
      </div>

      <div className="px-6 pb-3">
        <div className="mx-auto w-full max-w-xl">
          <PromptInput
            variant="compact"
            value={allyPrompt}
            onValueChange={setAllyPrompt}
            onSubmit={submitAllyPrompt}
          >
            <PromptInputLeading>
              <Sparkles className="size-4 text-brand-600" aria-hidden />
            </PromptInputLeading>
            <PromptInputTextarea
              placeholder="Ask Ally about your business"
              aria-label="Ask Ally about your business"
            />
            <PromptInputTrailing>
              <PromptInputSubmit aria-label="Send">
                <SendHorizontal aria-hidden />
              </PromptInputSubmit>
            </PromptInputTrailing>
          </PromptInput>
        </div>
        <p className="mt-1.5 text-center type-caption text-fg-tertiary">
          Ally is AI and can make mistakes. Please double-check responses.
        </p>
      </div>
    </div>
  );
}
