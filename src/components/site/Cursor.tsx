"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * A design-tool style "multiplayer" cursor. Any element with
 * `data-cursor="Label"` swaps the system cursor for an accent pointer + label.
 */
export function Cursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.dataset.cursorActive = "true";

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor || null);
    };
    const onLeave = () => setLabel(null);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      delete document.documentElement.dataset.cursorActive;
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70]" style={{ x: sx, y: sy }}>
      <AnimatePresence>
        {label && (
          <motion.div
            key="cursor"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="origin-top-left"
          >
            <svg width="18" height="20" viewBox="0 0 18 20" className="-translate-x-[2px] -translate-y-[2px] drop-shadow-sm">
              <path d="M1.5 1.5 16 9.2l-6.6 1.7-3.1 6.4L1.5 1.5Z" fill="var(--accent)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <motion.span
              layout
              className="absolute left-4 top-[18px] whitespace-nowrap rounded-full rounded-tl-sm bg-accent px-2.5 py-1 font-sans text-[12.5px] font-medium leading-none text-white shadow-[0_4px_14px_-4px_rgba(13,153,255,0.6)]"
            >
              {label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
