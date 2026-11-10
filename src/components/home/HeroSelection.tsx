"use client";

import { motion } from "motion/react";

/**
 * Wraps a word in an animated design-tool selection box. The box is inset to
 * the letters (ascender top to baseline), not the line box, so it sits
 * visually centred on the word.
 */
export function HeroSelection({ children }: { children: React.ReactNode }) {
  const handle = "absolute size-[7px] border border-accent bg-bg";
  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-x-[0.12em] top-[0.07em] bottom-[0.08em] border border-accent"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={`${handle} -left-[4px] -top-[4px]`} />
        <span className={`${handle} -right-[4px] -top-[4px]`} />
        <span className={`${handle} -bottom-[4px] -left-[4px]`} />
        <span className={`${handle} -bottom-[4px] -right-[4px]`} />
      </motion.span>
      {children}
    </span>
  );
}
