import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

/**
 * Brygada 1918 — the display serif (headlines, section titles, quotes).
 * SIL Open Font License 1.1 (see Brygada-1918-OFL.txt). Variable, 400–700.
 */
export const brygada = localFont({
  src: [
    { path: "./brygada-1918-latin-wght-normal.woff2", style: "normal", weight: "400 700" },
    { path: "./brygada-1918-latin-wght-italic.woff2", style: "italic", weight: "400 700" },
  ],
  variable: "--font-display-serif",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

export const fontVariables = [GeistSans.variable, brygada.variable].join(" ");
