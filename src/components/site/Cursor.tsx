"use client";

import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * The site's cursor: a design-tool style accent pointer that replaces the
 * system cursor on mouse/trackpad devices. Elements with `data-cursor="Label"`
 * add a label chip beside it (e.g. "View case study" on project cards).
 */
export function Cursor() {
  const enabled = useMediaQuery("(pointer: fine)");
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.dataset.cursorActive = "true";

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor || null);
    };
    const onLeave = () => {
      setVisible(false);
      setLabel(null);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      delete root.dataset.cursorActive;
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] transition-opacity duration-200"
      style={{ x, y, opacity: visible ? 1 : 0 }}
    >
      <svg width="18" height="20" viewBox="0 0 18 20" className="-translate-x-[2px] -translate-y-[2px] drop-shadow-sm">
        <path d="M1.5 1.5 16 9.2l-6.6 1.7-3.1 6.4L1.5 1.5Z" fill="var(--accent)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <AnimatePresence>
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 top-[18px] origin-top-left whitespace-nowrap rounded-full rounded-tl-sm bg-accent px-2.5 py-1 font-sans text-[12.5px] font-medium leading-none text-white shadow-[0_4px_14px_-4px_rgba(13,153,255,0.6)]"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
