import { RichText } from "@/components/media/RichText";
import type { CalloutBlock, QuoteBlock, SectionHeadingBlock, TextBlock } from "@/lib/types";
import { clean, cn, color, isDark } from "@/lib/utils";

const headingSize = {
  sm: "text-[1.5rem] md:text-[1.75rem]",
  md: "text-[1.875rem] md:text-[2.375rem]",
  lg: "text-[2.25rem] md:text-[3.25rem]",
  xl: "text-[2.75rem] md:text-[4.5rem]",
};

export function SectionHeadingView({ block }: { block: SectionHeadingBlock }) {
  const size = clean(block.size) ?? "md";
  return (
    <div className="space-y-4">
      {block.eyebrow && <p className="text-[15px] text-subtle">{block.eyebrow}</p>}
      {block.heading && (
        <h2 className={cn("text-balance font-serif font-[380] leading-[1.12] tracking-[-0.022em] text-ink", headingSize[size])}>{block.heading}</h2>
      )}
      {block.intro && <RichText value={block.intro} className="rich-lg pt-1" />}
    </div>
  );
}

export function TextView({ block }: { block: TextBlock }) {
  const size = clean(block.size) ?? "base";
  return (
    <RichText
      value={block.body}
      className={cn(size === "lg" && "rich-lg", size === "display" && "rich-display", clean(block.columns) === "2" && "rich-cols")}
    />
  );
}

export function QuoteView({ block }: { block: QuoteBlock }) {
  const style = clean(block.style) ?? "serif";
  const cite = (block.attribution || block.role) && (
    <figcaption className="mt-6 text-[15px]">
      {block.attribution && <span className="text-ink">{block.attribution}</span>}
      {block.role && <span className="text-subtle">{block.attribution ? " — " : ""}{block.role}</span>}
    </figcaption>
  );

  if (style === "note") {
    return (
      <figure className="mx-auto max-w-md -rotate-[1.5deg] bg-[#f6e7b8] p-8 text-[#1e232a] shadow-[0_20px_40px_-24px_rgba(30,35,42,0.5)]">
        <blockquote className="font-serif text-[1.375rem] leading-snug">{block.quote}</blockquote>
        {cite && <div className="[&_*]:!text-[#1e232a]/70">{cite}</div>}
      </figure>
    );
  }
  if (style === "pull") {
    return (
      <figure className="border-l-2 border-accent pl-6 md:pl-8">
        <blockquote className="text-balance font-serif text-[1.625rem] leading-[1.3] tracking-[-0.01em] text-ink md:text-[2rem]">{block.quote}</blockquote>
        {cite}
      </figure>
    );
  }
  return (
    <figure>
      <blockquote className="text-balance font-serif text-[1.875rem] font-[360] leading-[1.22] tracking-[-0.02em] text-ink md:text-[2.625rem]">
        <span className="text-accent">“</span>
        {block.quote}
        <span className="text-accent">”</span>
      </blockquote>
      {cite}
    </figure>
  );
}

export function CalloutView({ block }: { block: CalloutBlock }) {
  const style = clean(block.style) ?? "filled";
  const bg = color(block.color);
  return (
    <aside
      className={cn(
        "rounded-md p-6 md:p-8",
        style === "filled" && "bg-panel",
        style === "outline" && "border border-line-strong",
        style === "bar" && "rounded-none border-l-2 border-accent bg-transparent py-1 pl-6 md:py-1 md:pl-8",
        style === "filled" && bg && (isDark(bg) ? "tone-light" : "tone-dark"),
      )}
      style={style === "filled" && bg ? { background: bg } : style === "outline" && bg ? { borderColor: bg } : undefined}
    >
      {block.label && <p className="mb-2 text-[15px] font-medium text-ink">{block.label}</p>}
      <RichText value={block.body} />
    </aside>
  );
}
