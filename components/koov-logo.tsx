import { cn } from "@/lib/utils";

export function KoovMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("shrink-0", className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m4.25 5.25 12.5 12.5M4.25 11.25l6.5 6.5M10.25 5.25l7.5 7.5m-1.5-3.5 3.5-3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.8"
      />
    </svg>
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
