import Image from "next/image";
import { cn } from "@/lib/utils";

export function KoovMark({ className }: { className?: string }) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={cn("shrink-0 object-contain", className)}
      height={87}
      src="/koov-logo.png"
      width={108}
    />
  );
}

export function KoovLogo({
  className,
  markClassName,
  compact = false,
}: {
  className?: string;
  markClassName?: string;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-[-0.04em]",
        className
      )}
    >
      <KoovMark className={cn("size-5 text-[#ff751f]", markClassName)} />
      {!compact && <span>KOOV</span>}
    </span>
  );
}
