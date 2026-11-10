"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";

import { ArrowIcon } from "./Button";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  /** On case-study pages: shows "← Work / {crumb}" instead of the name. */
  crumb?: string;
}

const homeHref = (id: string) => `/#${id}`;

export function Header({ crumb }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled && !open ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className="flex h-full items-center justify-between px-6">
          {crumb ? (
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-[15px]">
              <Link href="/#work" className="group flex items-center gap-1.5 text-subtle transition-colors hover:text-ink">
                <ArrowIcon direction="left" className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                Work
              </Link>
              <span className="text-subtle/60">/</span>
              <span className="truncate text-ink">{crumb}</span>
            </nav>
          ) : (
            <Link
              href="/"
              onClick={(e) => {
                if (window.location.pathname === "/" && lenis) {
                  e.preventDefault();
                  lenis.scrollTo(0);
                }
              }}
              className="group flex items-center gap-2.5 text-[15px] text-muted transition-colors hover:text-ink"
            >
              <span className="relative grid size-6 place-items-center bg-ink font-serif text-[15px] italic leading-none text-bg">n</span>
              {site.shortName}
            </Link>
          )}

          <div className="flex items-center gap-1">
            <ul className={cn("mr-2 hidden items-center gap-6 text-[15px] md:flex", !crumb && "xl:hidden")}>
              {site.nav.map((item) => (
                <li key={item.id}>
                  <Link href={homeHref(item.id)} className="text-muted transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${site.contact.email}`}
              className={cn("mr-2 hidden text-[15px] text-muted transition-colors hover:text-ink", !crumb && "xl:inline")}
            >
              Email
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative grid size-9 place-items-center md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className={cn("absolute h-px w-4 bg-ink transition-transform duration-500 ease-out-expo", open ? "rotate-45" : "-translate-y-[3px]")} />
              <span className={cn("absolute h-px w-4 bg-ink transition-transform duration-500 ease-out-expo", open ? "-rotate-45" : "translate-y-[3px]")} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-bg px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.ul
              className="space-y-2"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
            >
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={homeHref(item.id)} onClick={() => setOpen(false)} className="flex items-baseline gap-4 font-serif text-5xl tracking-tight">
                    <span className="text-sm tabular-nums text-subtle">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="mt-auto space-y-1 text-[15px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
            >
              <p className="text-subtle">Get in touch</p>
              <a href={`mailto:${site.contact.email}`} className="text-ink">
                {site.contact.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
