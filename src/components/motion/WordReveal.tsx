"use client";

import { motion } from "motion/react";
import { Fragment } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Replace one word with custom markup (e.g. a selection box). */
  highlightWord?: string;
  highlight?: React.ReactNode;
  as?: "h1" | "h2" | "p";
}

/** Splits text into words that rise out of a mask one after another. */
export function WordReveal({ text, className, delay = 0, stagger = 0.06, highlightWord, highlight, as = "h1" }: WordRevealProps) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => {
        const matches = highlightWord && word.toLowerCase().replace(/[^\p{L}-]/gu, "") === highlightWord.toLowerCase();
        // Keep punctuation that follows the highlighted word (e.g. a comma) outside the box.
        const trailing = matches ? (/[^\p{L}-]+$/u.exec(word)?.[0] ?? "") : "";
        const custom = matches ? (
          <>
            {highlight}
            {trailing && <span className="ml-[0.18em]">{trailing}</span>}
          </>
        ) : null;
        return (
        <Fragment key={i}>
          {/* Custom words (e.g. with decorations) aren't masked so nothing gets clipped. */}
          <span aria-hidden className={custom ? "relative inline-block align-top" : "-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top"}>
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "105%", rotate: 4, opacity: 0 },
                show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {custom ?? word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
        );
      })}
    </Tag>
  );
}
