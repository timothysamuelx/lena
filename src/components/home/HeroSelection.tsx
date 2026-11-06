"use client";

import { motion } from "motion/react";

/**
 * Wraps a word in an animated design-tool selection box, with a labelled
 * multiplayer cursor that glides in and settles beside it.
 */
export function HeroSelection({ children, cursorLabel }: { children: React.ReactNode; cursorLabel: string }) {
  const handle = "absolute size-[7px] border border-accent bg-bg";
  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-x-[0.12em] -bottom-[0.02em] -top-[0.06em] border border-accent"
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
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -bottom-[0.95em] -right-[1.3em] z-10 flex items-start font-sans"
        initial={{ opacity: 0, x: 90, y: 70 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.35, type: "spring", stiffness: 70, damping: 14 }}
      >
        <motion.span
          className="flex items-start"
          animate={{ x: [0, 6, -2, 0], y: [0, -4, 3, 0] }}
          transition={{ delay: 3, duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="18" viewBox="0 0 18 20">
            <path d="M1.5 1.5 16 9.2l-6.6 1.7-3.1 6.4L1.5 1.5Z" fill="var(--accent)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span className="ml-0.5 mt-3.5 whitespace-nowrap rounded-full rounded-tl-sm bg-accent px-2 py-[3px] text-[11px] font-medium leading-none tracking-normal text-white">
            {cursorLabel}
          </span>
        </motion.span>
      </motion.span>
    </span>
  );
}
