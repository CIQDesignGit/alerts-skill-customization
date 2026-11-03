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

type BriefPromptProps = {
  isLoading: boolean;
  onSubmit: (question: string) => void;
};

export function BriefPrompt({ isLoading, onSubmit }: BriefPromptProps) {
  const [value, setValue] = useState("");

  function submit() {
    const question = value.trim();
    if (!question || isLoading) return;
    onSubmit(question);
    setValue("");
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <PromptInput variant="compact" value={value} onValueChange={setValue} onSubmit={submit} isLoading={isLoading}>
        <PromptInputLeading>
          <Sparkles className="size-4 text-brand-600" aria-hidden />
        </PromptInputLeading>
        <PromptInputTextarea placeholder="Ask Ally about business brief" aria-label="Ask Ally about business brief" />
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
