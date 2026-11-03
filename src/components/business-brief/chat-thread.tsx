import { Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import {
  Button,
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TextShimmerLoader,
} from "@ciq-dev/ciq-design-system";

import type { ChatReply, ChatTable } from "@/lib/business-brief-data";
import { cn } from "@/lib/utils";

export type ChatTurn = {
  id: string;
  question: string;
  reply?: ChatReply;
};

export function ChatThread({ turns }: { turns: ChatTurn[] }) {
  if (turns.length === 0) return null;

  return (
    <section aria-label="Conversation with Ally" className="space-y-6 border-t border-border-default pt-6">
      {turns.map((turn) => (
        <div key={turn.id} data-turn-id={turn.id} className="scroll-mt-6 space-y-4">
          <Message className="justify-end">
            <MessageContent variant="user" className="type-body">
              {turn.question}
            </MessageContent>
          </Message>

          <Message>
            <Sparkles className="mt-1 size-4 shrink-0 text-brand-600" aria-label="Ally" />
            {turn.reply ? (
              <div className="flex max-w-[80%] flex-col gap-2">
                <div className="space-y-3 rounded-2xl border border-border-default bg-surface p-4 type-body text-fg-primary shadow-sm">
                  <p>{turn.reply.text}</p>
                  {turn.reply.table && <ReplyTable table={turn.reply.table} />}
                </div>
                <MessageActions>
                  <MessageAction tooltip="Helpful">
                    <Button variant="ghost" size="icon" className="size-7 text-fg-tertiary" aria-label="Helpful">
                      <ThumbsUp aria-hidden />
                    </Button>
                  </MessageAction>
                  <MessageAction tooltip="Not helpful">
                    <Button variant="ghost" size="icon" className="size-7 text-fg-tertiary" aria-label="Not helpful">
                      <ThumbsDown aria-hidden />
                    </Button>
                  </MessageAction>
                </MessageActions>
              </div>
            ) : (
              <TextShimmerLoader text="Ally is looking into it" size="md" />
            )}
          </Message>
        </div>
      ))}
    </section>
  );
}

function ReplyTable({ table }: { table: ChatTable }) {
  const last = table.columns.length - 1;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {table.columns.map((column, i) => (
            <TableHead key={column} className={cn("table-cell type-caption-strong", i > 0 && "text-right")}>
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.rows.map((row) => (
          <TableRow key={row.cells[0]}>
            {row.cells.map((cell, i) => (
              <TableCell
                key={i}
                className={cn(
                  "type-body tabular-nums",
                  i > 0 && "text-right",
                  i === last &&
                    row.delta !== undefined &&
                    (row.delta < 0 ? "text-feedback-danger" : "text-feedback-success"),
                )}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
