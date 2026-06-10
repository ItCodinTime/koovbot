import { motion } from "framer-motion";
import { KoovMark } from "@/components/koov-logo";

export const Greeting = ({ compact = false }: { compact?: boolean }) => {
  return (
    <div
      className={
        compact
          ? "flex max-w-sm flex-col items-center px-6"
          : "flex max-w-2xl flex-col items-center px-4"
      }
      key="overview"
    >
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className={
          compact
            ? "mb-4 flex size-14 items-center justify-center rounded-2xl border border-primary/15 bg-primary/5 shadow-[var(--shadow-glow)]"
            : "mb-6 flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-card text-primary shadow-[var(--shadow-glow)]"
        }
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <KoovMark className={compact ? "size-10" : "size-7"} />
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className={
          compact
            ? "hidden"
            : "mb-3 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-medium text-[10px] text-primary uppercase tracking-[0.18em]"
        }
        initial={{ opacity: 0, y: 8 }}
        transition={{ delay: 0.25, duration: 0.45 }}
      >
        Your AI teammate
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className={
          compact
            ? "text-center font-semibold text-2xl tracking-[-0.04em] text-foreground"
            : "text-center font-semibold text-3xl tracking-[-0.045em] text-foreground md:text-5xl"
        }
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        How can KOOV help?
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className={
          compact
            ? "mt-2 max-w-xs text-center text-muted-foreground text-xs leading-relaxed"
            : "mt-4 max-w-lg text-center text-muted-foreground text-sm md:text-base"
        }
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {compact
          ? "Ask a question or choose a quick start below."
          : "Turn scattered work into clear next steps. Ask about your projects, decisions, research, or anything your team needs to move forward."}
      </motion.div>
    </div>
  );
};
