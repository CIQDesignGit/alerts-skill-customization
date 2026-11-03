"use client";

import {
  ASK_ALLY_GREETING,
  NOTICED_THIS_WEEK,
  QUESTION_COLUMNS,
  RECENT_CONVERSATIONS,
} from "@/lib/ask-ally-data";

import { AskAllyPrompt, useAskAllyPrompt } from "./ask-ally/ask-ally-prompt";
import { AskAllyConversations, AskAllyNoticed, AskAllyStarters } from "./ask-ally/ask-ally-sections";
import { AskAllyTopBar } from "./ask-ally/ask-ally-top-bar";

export function AskAllyView() {
  const { value, setValue, fillAndFocus, submit } = useAskAllyPrompt();

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-canvas">
      <AskAllyTopBar />

      <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-36 pt-6">
        <div className="mx-auto max-w-5xl space-y-10">
          <h1 className="text-center type-heading text-brand-950">{ASK_ALLY_GREETING}</h1>

          <AskAllyNoticed items={NOTICED_THIS_WEEK} onSelect={fillAndFocus} />
          <AskAllyStarters columns={QUESTION_COLUMNS} onSelect={fillAndFocus} />
          <AskAllyConversations items={RECENT_CONVERSATIONS} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-canvas from-40% to-transparent pb-4 pt-8">
        <div className="pointer-events-auto">
          <AskAllyPrompt value={value} onValueChange={setValue} onSubmit={submit} />
        </div>
      </div>
    </div>
  );
}
