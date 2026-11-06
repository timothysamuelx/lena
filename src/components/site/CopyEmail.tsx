"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

/** Email link with a one-click copy button. */
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      <a href={`mailto:${email}`} className="link break-all" data-cursor="Say hello">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="relative inline-flex h-8 min-w-[4.75rem] items-center justify-center overflow-hidden rounded-full border border-line-strong px-3 font-sans text-[13px] text-muted transition-colors hover:border-ink hover:text-ink"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {copied ? "Copied ✓" : "Copy"}
          </motion.span>
        </AnimatePresence>
      </button>
    </span>
  );
}
