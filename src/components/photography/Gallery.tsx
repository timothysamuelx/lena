"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { SanityImage } from "@/components/media/SanityImage";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/site/Button";
import { SelectionHandles } from "@/components/site/Selection";
import type { Photo } from "@/lib/types";
import { clean, cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

function details(photo: Photo) {
  return [photo.location, photo.year].filter(Boolean).join(" · ");
}

function altText(photo: Photo) {
  return clean(photo.alt) || clean(photo.title) || "Photograph by Nandun Perera";
}

/**
 * Masonry grid of photos; each opens a full-screen viewer.
 * Note: no CSS `filter` (e.g. blur-in animations) inside the multi-column
 * list — Chrome stalls rendering filtered elements in multicol layouts.
 */
export function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    // Return focus to the photo that was open.
    if (index !== null) triggers.current[index]?.focus({ preventScroll: true });
    setIndex(null);
  }, [index]);

  if (photos.length === 0) {
    return <p className="border-t border-line pt-10 text-[17px] text-muted">New photographs are on their way.</p>;
  }

  return (
    <>
      <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8">
        {photos.map((photo, i) => (
          <li key={photo._key} className="mb-10 break-inside-avoid lg:mb-12">
            <Reveal animation="scale" delay={(i % 3) * 0.08}>
              <button
                type="button"
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                onClick={() => setIndex(i)}
                data-cursor="View"
                aria-label={`Open “${altText(photo)}”`}
                className="group relative block w-full text-left"
              >
                <span className="block overflow-hidden bg-panel">
                  <span className="block transition-transform duration-1000 ease-out-expo group-hover:scale-[1.02]">
                    <SanityImage
                      image={photo}
                      alt={altText(photo)}
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                      className="h-auto w-full filter-none!"
                    />
                  </span>
                </span>
                <SelectionHandles />
              </button>
              {(photo.title || details(photo)) && (
                <div className="mt-3 flex items-baseline justify-between gap-4 text-[14px] leading-snug">
                  {photo.title && <p className="text-ink/85">{photo.title}</p>}
                  {details(photo) && <p className="shrink-0 text-subtle">{details(photo)}</p>}
                </div>
              )}
            </Reveal>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {index !== null && <Viewer photos={photos} index={index} onIndex={setIndex} onClose={close} />}
      </AnimatePresence>
    </>
  );
}

interface ViewerProps {
  photos: Photo[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}

/** Full-screen photo viewer: arrows / swipe to browse, Esc to close. */
function Viewer({ photos, index, onIndex, onClose }: ViewerProps) {
  const lenis = useLenis();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState(0);
  const photo = photos[index];
  const many = photos.length > 1;

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      onIndex((index + step + photos.length) % photos.length);
    },
    [index, onIndex, photos.length],
  );

  useEffect(() => {
    lenis?.stop();
    const root = document.documentElement;
    root.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      lenis?.start();
      root.style.overflow = "";
    };
  }, [lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && many) go(1);
      else if (e.key === "ArrowLeft" && many) go(-1);
      else if (e.key === "Tab") {
        // Keep focus inside the viewer.
        const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button") ?? []).filter((el) => el.offsetParent !== null);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, many, onClose]);

  const navButton = "grid size-11 place-items-center text-ink/70 transition-colors hover:text-ink disabled:opacity-30";

  // Portalled to <body> so it sits above the header (<main> is its own stacking context).
  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={altText(photo)}
      data-lenis-prevent
      className="tone-light fixed inset-0 z-[65] flex flex-col bg-[#0e0f11]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between px-6 text-[14px]">
        <p className="tabular-nums text-subtle">
          {pad(index + 1)} <span className="text-subtle/60">/</span> {pad(photos.length)}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} className="text-muted transition-colors hover:text-ink">
          Close
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-4 md:px-20">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={photo._key}
            className="absolute inset-0 mx-4 md:mx-20"
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 40 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            drag={many ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
          >
            <SanityImage image={photo} alt={altText(photo)} fill fit="contain" sizes="100vw" className="pointer-events-none select-none" />
          </motion.div>
        </AnimatePresence>

        {many && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={cn(navButton, "absolute left-2 top-1/2 hidden -translate-y-1/2 md:grid")}>
              <ArrowIcon direction="left" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={cn(navButton, "absolute right-2 top-1/2 hidden -translate-y-1/2 md:grid")}>
              <ArrowIcon direction="right" />
            </button>
          </>
        )}
      </div>

      <div className="flex min-h-20 shrink-0 items-center justify-between gap-6 px-6 py-4 text-[14px]">
        <div className="min-w-0" aria-live="polite">
          {photo.title && <p className="truncate text-ink">{photo.title}</p>}
          {details(photo) && <p className="truncate text-subtle">{details(photo)}</p>}
        </div>
        {many && (
          <div className="flex shrink-0 items-center md:hidden">
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={navButton}>
              <ArrowIcon direction="left" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={navButton}>
              <ArrowIcon direction="right" />
            </button>
          </div>
        )}
      </div>
    </motion.div>,
    document.body,
  );
}
