"use client";

import { useState } from "react";
import { SendHorizontal, Sparkles } from "lucide-react";
import {
  PromptInput,
  PromptInputLeading,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTrailing,
} from "@ciq-dev/ciq-design-system";

type AskAllyPromptProps = {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
};

export function AskAllyPrompt({ value, onValueChange, onSubmit }: AskAllyPromptProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-6">
      <PromptInput variant="compact" value={value} onValueChange={onValueChange} onSubmit={onSubmit}>
        <PromptInputLeading>
          <Sparkles className="size-4 text-brand-600" aria-hidden />
        </PromptInputLeading>
        <PromptInputTextarea
          placeholder="Ask Ally anything about your business"
          aria-label="Ask Ally anything about your business"
        />
        <PromptInputTrailing>
          <PromptInputSubmit aria-label="Send">
            <SendHorizontal aria-hidden />
          </PromptInputSubmit>
        </PromptInputTrailing>
      </PromptInput>
      <p className="mt-1.5 text-center type-caption text-fg-tertiary">
        Ally is AI and can make mistakes. Please double-check responses.
      </p>
    </div>
  );
}

export function useAskAllyPrompt() {
  const [value, setValue] = useState("");

  function fillAndFocus(question: string) {
    setValue(question);
  }

  function submit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    setValue("");
  }

  return { value, setValue, fillAndFocus, submit };
}
