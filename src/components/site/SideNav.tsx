"use client";

import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
  level?: number;
}

/**
 * Fixed left rail with scroll-spy (inspired by editorial portfolio sidebars).
 * Fades away while a full-bleed element ([data-bleed]) passes behind it.
 */
export function SideNav({ items, title, className }: { items: NavItem[]; title?: string; className?: string }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    let frame = 0;
    const compute = () => {
      frame = 0;
      const line = window.innerHeight * 0.32;
      let current: string | null = items[0]?.id ?? null;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      // At the very bottom, highlight the last item.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = items.at(-1)?.id ?? current;
      setActive(current);

      const rail = navRef.current?.getBoundingClientRect();
      if (rail) {
        const overlaps = Array.from(document.querySelectorAll<HTMLElement>("[data-bleed]")).some((el) => {
          const r = el.getBoundingClientRect();
          return r.top < rail.bottom && r.bottom > rail.top && r.left < rail.right;
        });
        setHidden(overlaps);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      ref={navRef}
      aria-label={title ?? "Sections"}
      className={cn(
        "fixed left-6 top-[30vh] z-40 hidden w-44 transition-opacity duration-500 xl:block",
        hidden ? "pointer-events-none opacity-0" : "opacity-100",
        className,
      )}
    >
      {title && <p className="mb-3 text-[13px] text-subtle">{title}</p>}
      <ul className="space-y-1.5">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className={cn(item.level === 2 && "pl-3")}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  if (!lenis) return;
                  e.preventDefault();
                  lenis.scrollTo(`#${item.id}`, { offset: -88 });
                  history.replaceState(null, "", `#${item.id}`);
                }}
                className={cn(
                  "relative block py-0.5 transition-colors duration-300",
                  item.level === 2 ? "text-[13.5px]" : "text-[15px]",
                  isActive ? "text-accent-ink" : "text-subtle hover:text-ink",
                )}
                aria-current={isActive ? "location" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidenav-marker"
                    className="absolute -left-3 top-1/2 size-[5px] -translate-y-1/2 bg-accent"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="block truncate">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
