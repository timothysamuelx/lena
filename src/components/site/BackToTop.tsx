"use client";

import { useLenis } from "lenis/react";

import { ArrowIcon } from "./Button";

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="group inline-flex items-center gap-1.5 text-ink"
    >
      Back to top
      <ArrowIcon direction="up" className="transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
