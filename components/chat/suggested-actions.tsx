"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { memo } from "react";
import { suggestions } from "@/lib/constants";
import type { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Suggestion } from "../ai-elements/suggestion";
import type { VisibilityType } from "./visibility-selector";

type SuggestedActionsProps = {
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>["sendMessage"];
  selectedVisibilityType: VisibilityType;
  compact?: boolean;
};

function PureSuggestedActions({
  chatId,
  sendMessage,
  compact = false,
}: SuggestedActionsProps) {
  const suggestedActions = suggestions;

  return (
    <div
      className={cn(
        "flex w-full gap-2.5 overflow-x-auto pb-1",
        compact
          ? "grid grid-cols-2 overflow-visible"
          : "sm:grid sm:grid-cols-2 sm:overflow-visible"
      )}
      data-testid="suggested-actions"
      style={{
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
        msOverflowStyle: "none",
      }}
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "shrink-0",
            compact ? "min-w-0" : "min-w-[200px] sm:min-w-0 sm:shrink"
          )}
          exit={{ opacity: 0, y: 16 }}
          initial={{ opacity: 0, y: 16 }}
          key={suggestedAction}
          transition={{
            delay: 0.06 * index,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Suggestion
            className={cn(
              "h-auto w-full whitespace-nowrap rounded-xl border border-primary/10 bg-card/65 text-left text-[12px] leading-relaxed text-muted-foreground shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground hover:shadow-[var(--shadow-glow)]",
              compact
                ? "min-h-14 whitespace-normal px-3 py-2.5 text-[11px]"
                : "px-4 py-3 sm:whitespace-normal sm:p-4 sm:text-[13px]"
            )}
            onClick={(suggestion) => {
              window.history.pushState(
                {},
                "",
                `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/chat/${chatId}`
              );
              sendMessage({
                role: "user",
                parts: [{ type: "text", text: suggestion }],
              });
            }}
            suggestion={suggestedAction}
          >
            {suggestedAction}
          </Suggestion>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) {
      return false;
    }
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType) {
      return false;
    }
    if (prevProps.compact !== nextProps.compact) {
      return false;
    }

    return true;
  }
);
