"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface VideoProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
  fit?: "cover" | "contain";
  className?: string;
  label?: string;
}

/** Muted autoplay video that only plays while on screen. */
export function Video({ src, poster, autoplay = true, controls = false, fit = "cover", className, label }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !autoplay) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [autoplay]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted={autoplay}
      loop={autoplay}
      playsInline
      controls={controls || !autoplay}
      preload="metadata"
      aria-label={label}
      className={cn("h-full w-full", fit === "contain" ? "object-contain" : "object-cover", className)}
    />
  );
}
