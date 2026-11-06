"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface Role {
  company: string;
  location?: string;
  role: string;
  period: string;
  summary: string;
  points: readonly string[];
}

export function ExperienceList({ roles }: { roles: readonly Role[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ol className="border-b border-line">
      {roles.map((r, i) => {
        const isOpen = open === i;
        return (
          <motion.li
            key={r.company}
            className="border-t border-line"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`role-${i}`}
              className="group grid w-full grid-cols-[1fr_auto] items-start gap-x-6 gap-y-1 py-6 text-left md:grid-cols-[11rem_1fr_auto] md:py-7"
            >
              <span className="order-2 col-span-2 font-mono text-[12.5px] leading-6 text-subtle md:order-none md:col-span-1">{r.period}</span>
              <span className="order-1 md:order-none">
                <span className="block text-[18px] leading-snug text-ink">
                  {r.company}
                  {r.location && <span className="text-subtle"> · {r.location}</span>}
                </span>
                <span className="mt-0.5 block text-[15px] text-muted">{r.role}</span>
              </span>
              <span
                className={cn(
                  "order-1 mt-1 grid size-7 place-items-center rounded-full border border-line-strong text-muted transition-all duration-500 ease-out-expo group-hover:border-ink group-hover:text-ink md:order-none",
                  isOpen && "rotate-45 border-ink text-ink",
                )}
                aria-hidden
              >
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`role-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 md:ml-[calc(11rem+1.5rem)] md:pr-16">
                    <p className="max-w-[60ch] text-[16px] leading-relaxed text-ink/85">{r.summary}</p>
                    <div className="rich mt-4 max-w-[62ch] !text-[15.5px]">
                      <ul>
                        {r.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ol>
  );
}
