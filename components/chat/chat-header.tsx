"use client";

import { ArrowUpRightIcon, PanelLeftIcon } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { KoovLogo } from "@/components/koov-logo";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";

function PureChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const { state, toggleSidebar, isMobile } = useSidebar();

  if (state === "collapsed" && !isMobile) {
    return null;
  }

  return (
    <header className="sticky top-0 flex h-14 items-center gap-2 bg-sidebar px-3">
      <Button
        className="md:hidden"
        onClick={toggleSidebar}
        size="icon-sm"
        variant="ghost"
      >
        <PanelLeftIcon className="size-4" />
      </Button>

      <Link
        className="flex items-center text-foreground md:hidden"
        href="https://koovai.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <KoovLogo className="text-sm" markClassName="size-4" />
      </Link>

      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          selectedVisibilityType={selectedVisibilityType}
        />
      )}

      <Button
        asChild
        className="hidden rounded-lg border border-primary/20 bg-primary/8 px-3 text-primary shadow-none hover:bg-primary hover:text-primary-foreground md:ml-auto md:flex"
        variant="outline"
      >
        <Link
          href="https://koovai.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Explore KOOV
          <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </Button>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.isReadonly === nextProps.isReadonly
  );
});
