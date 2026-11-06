import { clsx, type ClassValue } from "clsx";
import { stegaClean } from "next-sanity";

import type { ColorValue } from "./types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Strip Sanity visual-editing (stega) markers from option values before comparing them. */
export function clean<T>(value: T): T {
  return stegaClean(value) as T;
}

/** Resolve a colour-input value (or plain hex) to a CSS colour string. */
export function color(value: ColorValue): string | undefined {
  if (!value) return undefined;
  const hex = typeof value === "string" ? value : value.hex;
  return hex ? stegaClean(hex) : undefined;
}

/** Relative luminance check so text on custom backgrounds stays readable. */
export function isDark(hex: string | undefined): boolean {
  if (!hex) return false;
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(hex);
  if (!m) return false;
  const [r, g, b] = [m[1], m[2], m[3]].map((h) => {
    const c = parseInt(h, 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.36;
}

/** "16/9" → "16 / 9" for the CSS aspect-ratio property; "auto" → undefined. */
export function aspect(value: string | undefined): string | undefined {
  const v = clean(value);
  if (!v || v === "auto") return undefined;
  return v.replace("/", " / ");
}

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .slice(0, 64);
