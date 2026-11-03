"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@ciq-dev/ciq-design-system";

import { BriefHeader, BriefTopBar } from "@/components/business-brief/brief-header";
import { BriefPanel } from "@/components/business-brief/brief-panel";
import { BriefPrompt } from "@/components/business-brief/brief-prompt";
import { ChatThread, type ChatTurn } from "@/components/business-brief/chat-thread";
import { GapTree } from "@/components/business-brief/gap-tree";
import { PeriodOverview } from "@/components/business-brief/period-overview";
import { PeriodTabs } from "@/components/business-brief/period-tabs";
import {
  OVERALL,
  PERIODS,
  findNode,
  replyFor,
  type Brand,
  type PeriodId,
} from "@/lib/business-brief-data";

const REPLY_DELAY_MS = 1200;

export function BusinessBriefView() {
  const [activePeriod, setActivePeriod] = useState<PeriodId | null>(null);
  const [scopeId, setScopeId] = useState(OVERALL.id);
  const [brand, setBrand] = useState<Brand>("All brands");
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scope = findNode(scopeId);
  const period = activePeriod ? PERIODS[activePeriod] : null;
  const listPeriod = activePeriod ?? "this";
  const isReplying = turns.some((turn) => !turn.reply);

  function ask(question: string) {
    if (isReplying) return;
    const id = crypto.randomUUID();
    const scopeLabel = scope.label;
    setTurns((prev) => [...prev, { id, question }]);
    window.setTimeout(() => {
      setTurns((prev) =>
        prev.map((turn) => (turn.id === id ? { ...turn, reply: replyFor(question, scopeLabel) } : turn)),
      );
    }, REPLY_DELAY_MS);
  }

  const latestTurn = turns.at(-1);
  const latestTurnId = latestTurn?.id;
  const latestHasReply = Boolean(latestTurn?.reply);
  useEffect(() => {
    const container = scrollRef.current;
    if (!latestTurnId || !container) return;
    const turn = container.querySelector<HTMLElement>(`[data-turn-id="${latestTurnId}"]`);
    if (!turn) return;
    const offset =
      turn.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 24;
    container.scrollTo({ top: offset, behavior: "smooth" });
  }, [latestTurnId, latestHasReply]);

  function updateScrollDown() {
    const el = scrollRef.current;
    if (!el) return;
    setShowScrollDown(el.scrollHeight - el.scrollTop - el.clientHeight > 48);
  }

  useEffect(updateScrollDown, [activePeriod, turns]);

  function scrollToBottom() {
    const el = scrollRef.current;
    el?.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }

  return (
    <div className="relative flex h-screen min-w-0 flex-1 flex-col overflow-hidden bg-surface-muted">
      <div ref={scrollRef} onScroll={updateScrollDown} className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto max-w-7xl space-y-6 px-6 pt-4 pb-8">
          <BriefTopBar />
          <BriefHeader title={scope.label} period={period} brand={brand} onBrandChange={setBrand} />

          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(15rem,20rem)_minmax(0,1fr)]">
            <GapTree
              period={listPeriod}
              caption={PERIODS[listPeriod].gapCaption}
              selectedId={scopeId}
              onSelect={setScopeId}
            />
            <div className="min-w-0 space-y-4">
              {period ? (
                <>
                  <PeriodTabs
                    value={period.id}
                    onValueChange={setActivePeriod}
                    onCollapse={() => setActivePeriod(null)}
                  />
                  <BriefPanel period={period} scopeLabel={scope.label} onAsk={ask} onDrill={setScopeId} />
                </>
              ) : (
                <PeriodOverview onOpen={setActivePeriod} />
              )}
            </div>
          </div>

          <ChatThread turns={turns} />
        </div>
      </div>

      <div className="relative shrink-0 border-t border-border-default bg-canvas px-6 pt-3 pb-2">
        {showScrollDown && (
          <Button
            variant="outline"
            size="icon"
            aria-label="Scroll to latest"
            onClick={scrollToBottom}
            className="absolute -top-12 left-1/2 size-8 -translate-x-1/2 rounded-full shadow-sm"
          >
            <ArrowDown aria-hidden />
          </Button>
        )}
        <BriefPrompt isLoading={isReplying} onSubmit={ask} />
      </div>
    </div>
  );
}
