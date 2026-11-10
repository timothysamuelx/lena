import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

/**
 * Petrona — the display serif (headlines, section titles, quotes).
 * SIL Open Font License 1.1 (see Petrona-OFL.txt). Variable, 100–900.
 */
export const petrona = localFont({
  src: [
    { path: "./petrona-latin-wght-normal.woff2", style: "normal", weight: "100 900" },
    { path: "./petrona-latin-wght-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-display-serif",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

export const fontVariables = [GeistSans.variable, petrona.variable].join(" ");
