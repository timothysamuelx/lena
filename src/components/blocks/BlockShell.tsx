import { Reveal } from "@/components/motion/Reveal";
import type { BlockSettings, Space, Width } from "@/lib/types";
import { clean, cn, color, isDark } from "@/lib/utils";

const top: Record<Space, string> = {
  none: "pt-0",
  sm: "pt-5 md:pt-6",
  md: "pt-8 md:pt-12",
  lg: "pt-14 md:pt-20",
  xl: "pt-20 md:pt-32",
};
const bottom: Record<Space, string> = {
  none: "pb-0",
  sm: "pb-5 md:pb-6",
  md: "pb-8 md:pb-12",
  lg: "pb-14 md:pb-20",
  xl: "pb-20 md:pb-32",
};
export const widthClass: Record<Width, string> = {
  narrow: "w-narrow",
  default: "w-default",
  wide: "w-wide",
  full: "max-w-none",
};

interface BlockShellProps {
  settings?: BlockSettings;
  defaults?: BlockSettings;
  id?: string;
  /** Let full-width media run edge to edge (no side gutters). */
  flushWhenFull?: boolean;
  children: React.ReactNode;
  className?: string;
}

/** Applies a block's "Layout & style" settings: width, spacing, background, tone, animation. */
export function BlockShell({ settings, defaults, id, flushWhenFull, children, className }: BlockShellProps) {
  const s: BlockSettings = { width: "default", spaceTop: "md", spaceBottom: "md", animation: "fadeUp", ...defaults, ...clean(stripEmpty(settings)) };
  if (s.hidden) return null;

  const bg = color(s.background);
  const band = Boolean(bg);
  const tone = s.tone === "light" ? "tone-light" : s.tone === "dark" ? "tone-dark" : band ? (isDark(bg) ? "tone-light" : "tone-dark") : "";
  const width = s.width ?? "default";
  const flush = width === "full" && flushWhenFull;

  return (
    <section
      id={id}
      data-block
      data-bleed={band || width === "full" ? "" : undefined}
      className={cn("relative", tone, top[s.spaceTop ?? "md"], bottom[s.spaceBottom ?? "md"], band && s.spaceTop === "none" && "pt-0", className)}
      style={bg ? { background: bg } : undefined}
    >
      <Reveal
        animation={s.animation}
        className={cn("wrap", widthClass[width], flush && "!px-0", s.align === "center" && "text-center [&_.rich]:mx-auto")}
      >
        {children}
      </Reveal>
    </section>
  );
}

function stripEmpty(settings?: BlockSettings): BlockSettings {
  if (!settings) return {};
  return Object.fromEntries(Object.entries(settings).filter(([, v]) => v !== undefined && v !== null && v !== "")) as BlockSettings;
}
