"use client";

import { useId, useState } from "react";

import { SanityImage } from "@/components/media/SanityImage";
import type { ImageValue } from "@/lib/types";

interface CompareProps {
  before: ImageValue;
  after: ImageValue;
  beforeLabel?: string;
  afterLabel?: string;
  ratio: string;
}

/** Before / after slider. A transparent range input handles drag, touch and keyboard. */
export function Compare({ before, after, beforeLabel = "Before", afterLabel = "After", ratio }: CompareProps) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <div className="group relative select-none overflow-hidden rounded-md bg-panel" style={{ aspectRatio: ratio }} data-cursor="Drag">
      <SanityImage image={after} fill sizes="(min-width: 1024px) 960px, 100vw" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <SanityImage image={before} fill sizes="(min-width: 1024px) 960px, 100vw" />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[12px] text-white backdrop-blur">{beforeLabel}</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[12px] text-white backdrop-blur">{afterLabel}</span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#1e232a] shadow-lg transition-transform duration-300 group-active:scale-90">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M6.5 4.5 2 9l4.5 4.5M11.5 4.5 16 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <label htmlFor={id} className="sr-only">
        Compare {beforeLabel} and {afterLabel}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none opacity-0"
      />
    </div>
  );
}
