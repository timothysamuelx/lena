"use client";

import { useRef } from "react";

import { ArrowIcon } from "@/components/site/Button";

/** Horizontally scrolling, snap-aligned row with previous / next controls. */
export function Carousel({ children, label }: { children: React.ReactNode; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label ?? "Gallery"}>
      <div
        ref={ref}
        data-lenis-prevent
        className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-2 md:gap-6"
      >
        {children}
      </div>
      <div className="mt-5 flex justify-end gap-2">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => scroll(dir)}
            className="grid size-10 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-ink hover:text-ink"
            aria-label={dir === -1 ? "Previous" : "Next"}
          >
            <ArrowIcon direction={dir === -1 ? "left" : "right"} />
          </button>
        ))}
      </div>
    </div>
  );
}
