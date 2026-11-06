"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useMediaQuery } from "@/lib/useMediaQuery";

function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);
  return null;
}

/** Smooth scrolling (Lenis) + motion defaults that respect "reduce motion". */
export function Providers({ children }: { children: React.ReactNode }) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.9 }}>
      {reduced ? (
        children
      ) : (
        <ReactLenis root options={{ lerp: 0.11, anchors: { offset: -88 }, prevent: (node) => node.closest?.("[data-lenis-prevent]") != null }}>
          <ScrollReset />
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
