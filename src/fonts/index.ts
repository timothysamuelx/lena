import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

/** Newsreader — a variable serif with optical sizing, used for display type. */
export const newsreader = localFont({
  src: [
    { path: "./newsreader-latin-opsz-normal.woff2", style: "normal", weight: "200 800" },
    { path: "./newsreader-latin-opsz-italic.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

export const fontVariables = [GeistSans.variable, newsreader.variable].join(" ");
