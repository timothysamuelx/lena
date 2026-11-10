import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

/**
 * Noto Serif Display — the display serif (headlines, section titles, quotes).
 * SIL Open Font License 1.1 (see Noto-Serif-Display-OFL.txt). Variable, 100–900.
 */
export const notoSerifDisplay = localFont({
  src: [
    { path: "./noto-serif-display-latin-wght-normal.woff2", style: "normal", weight: "100 900" },
    { path: "./noto-serif-display-latin-wght-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-display-serif",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

export const fontVariables = [GeistSans.variable, notoSerifDisplay.variable].join(" ");
