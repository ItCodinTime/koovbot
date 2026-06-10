"use client";

import { MessageCircleIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { KoovLogo, KoovMark } from "@/components/koov-logo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useActiveChat } from "@/hooks/use-active-chat";
import {
  initialArtifactData,
  useArtifact,
  useArtifactSelector,
} from "@/hooks/use-artifact";
import type { Attachment, ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Artifact } from "./artifact";
import { type ChatDisplayMode, ChatHeader } from "./chat-header";
import { DataStreamHandler } from "./data-stream-handler";
import { submitEditedMessage } from "./message-editor";
import { Messages } from "./messages";
import { MultimodalInput } from "./multimodal-input";

export function ChatShell() {
  const {
    chatId,
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
    regenerate,
    addToolApprovalResponse,
    input,
    setInput,
    visibilityType,
    isReadonly,
    isLoading,
    votes,
    currentModelId,
    setCurrentModelId,
    showCreditCardAlert,
    setShowCreditCardAlert,
  } = useActiveChat();

  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(
    null
  );
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [displayMode, setDisplayMode] = useState<ChatDisplayMode | "closed">(
    "closed"
  );
  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);
  const { setArtifact } = useArtifact();

  const stopRef = useRef(stop);
  stopRef.current = stop;

  const prevChatIdRef = useRef(chatId);
  useEffect(() => {
    if (prevChatIdRef.current !== chatId) {
      prevChatIdRef.current = chatId;
      stopRef.current();
      setArtifact(initialArtifactData);
      setEditingMessage(null);
      setAttachments([]);
    }
  }, [chatId, setArtifact]);

  useEffect(() => {
    if (isArtifactVisible && displayMode === "panel") {
      setDisplayMode("fullscreen");
    }
  }, [displayMode, isArtifactVisible]);

  const isOpen = displayMode !== "closed";
  const isFullscreen = displayMode === "fullscreen";

  return (
    <>
      <WidgetBackdrop isDocked={displayMode === "panel"} />

      <div
        className={cn(
          "fixed z-50 flex overflow-hidden border-primary/15 bg-background shadow-[0_24px_80px_-20px_rgba(24,24,27,0.35)] transition-[inset,width,height,border-radius,opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isFullscreen
            ? "inset-0 h-dvh w-full rounded-none border"
            : "inset-y-0 right-0 h-dvh w-full rounded-none border-l sm:w-[420px] sm:rounded-l-2xl",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <div className="flex h-full w-full flex-row overflow-hidden">
          <div
            className={cn(
              "flex min-w-0 flex-col bg-background transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              isArtifactVisible && isFullscreen ? "w-[40%]" : "w-full"
            )}
          >
            <ChatHeader
              chatId={chatId}
              displayMode={isFullscreen ? "fullscreen" : "panel"}
              isReadonly={isReadonly}
              onClose={() => setDisplayMode("closed")}
              onDisplayModeChange={setDisplayMode}
              selectedVisibilityType={visibilityType}
            />

            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-background">
              <Messages
                addToolApprovalResponse={addToolApprovalResponse}
                chatId={chatId}
                compact={!isFullscreen}
                isArtifactVisible={isArtifactVisible}
                isLoading={isLoading}
                isReadonly={isReadonly}
                messages={messages}
                onEditMessage={(msg) => {
                  const text = msg.parts
                    ?.filter((p) => p.type === "text")
                    .map((p) => p.text)
                    .join("");
                  setInput(text ?? "");
                  setEditingMessage(msg);
                }}
                regenerate={regenerate}
                selectedModelId={currentModelId}
                setMessages={setMessages}
                status={status}
                votes={votes}
              />

              <div
                className={cn(
                  "sticky bottom-0 z-1 mx-auto flex w-full gap-2 border-t-0 bg-gradient-to-t from-background via-background/95 to-transparent px-2 pt-4 pb-3",
                  isFullscreen ? "max-w-4xl md:px-4 md:pb-4" : "max-w-none"
                )}
              >
                {!isReadonly && (
                  <MultimodalInput
                    attachments={attachments}
                    chatId={chatId}
                    compact={!isFullscreen}
                    editingMessage={editingMessage}
                    input={input}
                    isLoading={isLoading}
                    messages={messages}
                    onCancelEdit={() => {
                      setEditingMessage(null);
                      setInput("");
                    }}
                    onModelChange={setCurrentModelId}
                    selectedModelId={currentModelId}
                    selectedVisibilityType={visibilityType}
                    sendMessage={
                      editingMessage
                        ? async () => {
                            const msg = editingMessage;
                            setEditingMessage(null);
                            await submitEditedMessage({
                              message: msg,
                              text: input,
                              setMessages,
                              regenerate,
                            });
                            setInput("");
                          }
                        : sendMessage
                    }
                    setAttachments={setAttachments}
                    setInput={setInput}
                    setMessages={setMessages}
                    status={status}
                    stop={stop}
                  />
                )}
              </div>
            </div>
          </div>

          {isFullscreen && (
            <Artifact
              addToolApprovalResponse={addToolApprovalResponse}
              attachments={attachments}
              chatId={chatId}
              input={input}
              isReadonly={isReadonly}
              messages={messages}
              regenerate={regenerate}
              selectedModelId={currentModelId}
              selectedVisibilityType={visibilityType}
              sendMessage={sendMessage}
              setAttachments={setAttachments}
              setInput={setInput}
              setMessages={setMessages}
              status={status}
              stop={stop}
              votes={votes}
            />
          )}
        </div>
      </div>

      <Button
        aria-label={isOpen ? "Close KOOV chat" : "Open KOOV chat"}
        className={cn(
          "fixed right-3 bottom-3 z-50 size-14 overflow-hidden rounded-2xl border border-primary/20 bg-[#f2f2f2] p-0 text-primary-foreground shadow-[0_16px_40px_-12px_rgba(255,117,31,0.55)] transition-all duration-300 hover:scale-105 hover:bg-[#f2f2f2] active:scale-95 sm:right-5 sm:bottom-5 sm:size-16",
          isOpen && "pointer-events-none scale-75 opacity-0"
        )}
        onClick={() => setDisplayMode(isOpen ? "closed" : "panel")}
        size="icon"
      >
        {isOpen ? (
          <XIcon className="size-5" />
        ) : (
          <KoovMark className="size-12" />
        )}
      </Button>

      <DataStreamHandler />

      <AlertDialog
        onOpenChange={setShowCreditCardAlert}
        open={showCreditCardAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Activate AI Gateway</AlertDialogTitle>
            <AlertDialogDescription>
              This application requires{" "}
              {process.env.NODE_ENV === "production" ? "the owner" : "you"} to
              activate Vercel AI Gateway.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                window.open(
                  "https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card",
                  "_blank"
                );
                window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`;
              }}
            >
              Activate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function WidgetBackdrop({ isDocked }: { isDocked: boolean }) {
  return (
    <main
      className={cn(
        "koov-canvas min-h-dvh w-full bg-background px-6 py-8 text-foreground transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10",
        isDocked && "sm:w-[calc(100%-420px)]"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <KoovLogo className="text-lg" markClassName="size-5" />
        <span className="rounded-full border border-primary/15 bg-card/70 px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur">
          KOOV AI workspace
        </span>
      </nav>
      <section className="mx-auto flex min-h-[calc(100dvh-7rem)] max-w-6xl items-center">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium text-primary uppercase tracking-[0.14em]">
            <MessageCircleIcon className="size-3.5" />
            AI help, wherever you work
          </div>
          <h1 className="text-balance font-semibold text-5xl tracking-[-0.055em] sm:text-7xl">
            Your work, moving forward.
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base text-muted-foreground leading-relaxed sm:text-lg">
            KOOV turns scattered context into clear decisions, polished work,
            and practical next steps. Open the assistant whenever you need it.
          </p>
        </div>
      </section>
    </main>
  );
}
