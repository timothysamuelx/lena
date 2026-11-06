"use client";

import { motion, type Variants } from "motion/react";

import type { Animation } from "@/lib/types";

const variants: Record<Exclude<Animation, "none">, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96, y: 16 },
    show: { opacity: 1, scale: 1, y: 0 },
  },
  reveal: {
    hidden: { clipPath: "inset(0% 0% 100% 0%)", y: 24 },
    show: { clipPath: "inset(0% 0% 0% 0%)", y: 0 },
  },
};

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: Animation;
  delay?: number;
  duration?: number;
  amount?: number;
  as?: "div" | "section" | "li" | "article" | "figure" | "header";
}

/** Animates its children into view once, when scrolled into the viewport. */
export function Reveal({ animation = "fadeUp", delay = 0, duration = 1, amount = 0.15, as = "div", children, ...rest }: RevealProps) {
  if (animation === "none") {
    const Tag = as as "div";
    return <Tag {...rest}>{children}</Tag>;
  }
  const Component = motion[as] as typeof motion.div;
  const transition = { duration: animation === "reveal" ? 1.2 : duration, delay, ease: [0.16, 1, 0.3, 1] as const };
  const viewport = { once: true, amount, margin: "0px 0px -6% 0px" };

  if (animation === "reveal") {
    // IntersectionObserver ignores fully clipped targets, so observe an
    // unclipped wrapper and wipe the inner element in.
    return (
      <Component {...(rest as React.ComponentProps<typeof motion.div>)} initial="hidden" whileInView="show" viewport={viewport}>
        <motion.div variants={variants.reveal} transition={transition}>
          {children}
        </motion.div>
      </Component>
    );
  }

  return (
    <Component
      {...(rest as React.ComponentProps<typeof motion.div>)}
      variants={variants[animation]}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={transition}
    >
      {children}
    </Component>
  );
}

/** Staggers direct <RevealItem> children. */
export function Stagger({ children, className, stagger = 0.08, delay = 0, amount = 0.1 }: { children: React.ReactNode; className?: string; stagger?: number; delay?: number; amount?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" }) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component className={className} variants={variants.fadeUp} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </Component>
  );
}
