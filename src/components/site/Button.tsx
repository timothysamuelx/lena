import Link from "next/link";

import { cn } from "@/lib/utils";

import { SelectionHandles } from "./Selection";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
  icon?: React.ReactNode;
}

/** Pill-free, square-ish button that gains selection handles on hover. */
export function Button({ href, children, variant = "primary", className, external, icon }: ButtonProps) {
  const classes = cn(
    "group relative inline-flex h-11 items-center gap-2 px-5 text-[15px] font-medium transition-colors duration-300",
    variant === "primary" ? "bg-ink text-bg hover:bg-ink/90" : "bg-ink/[0.06] text-ink hover:bg-ink/[0.09]",
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {icon}
      <SelectionHandles />
    </>
  );
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function ArrowIcon({ className, direction = "right" }: { className?: string; direction?: "right" | "left" | "down" | "up" | "up-right" }) {
  const rotate = { right: 0, down: 90, left: 180, up: -90, "up-right": -45 }[direction];
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={cn("shrink-0", className)} style={{ transform: `rotate(${rotate}deg)` }} aria-hidden>
      <path d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
