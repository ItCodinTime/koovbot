"use client";

import { ExpandIcon, Minimize2Icon, XIcon } from "lucide-react";
import { KoovLogo } from "@/components/koov-logo";
import { Button } from "@/components/ui/button";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";

export type ChatDisplayMode = "panel" | "fullscreen";

export function ChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
  displayMode,
  onClose,
  onDisplayModeChange,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  displayMode: ChatDisplayMode;
  onClose: () => void;
  onDisplayModeChange: (mode: ChatDisplayMode) => void;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-primary/10 bg-card/90 px-3 backdrop-blur-xl">
      <KoovLogo className="text-sm text-foreground" markClassName="size-4" />
      <span className="hidden text-[11px] text-muted-foreground sm:inline">
        AI teammate
      </span>

      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          className="ml-auto"
          selectedVisibilityType={selectedVisibilityType}
        />
      )}

      <Button
        aria-label={displayMode === "panel" ? "Maximize chat" : "Restore panel"}
        className={isReadonly ? "ml-auto" : ""}
        onClick={() =>
          onDisplayModeChange(displayMode === "panel" ? "fullscreen" : "panel")
        }
        size="icon-sm"
        variant="ghost"
      >
        {displayMode === "panel" ? (
          <ExpandIcon className="size-4" />
        ) : (
          <Minimize2Icon className="size-4" />
        )}
      </Button>
      <Button
        aria-label="Close chat"
        onClick={onClose}
        size="icon-sm"
        variant="ghost"
      >
        <XIcon className="size-4" />
      </Button>
    </header>
  );
}
