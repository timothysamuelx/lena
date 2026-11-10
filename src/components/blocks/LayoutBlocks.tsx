import { MediaFrame } from "@/components/media/MediaFrame";
import { RichText } from "@/components/media/RichText";
import { hasMedia } from "@/lib/media";
import type { CardsBlock, ColumnsBlock, DividerBlock, StatsBlock, TextMediaBlock } from "@/lib/types";
import { clean, cn, color, isDark } from "@/lib/utils";

export function TextMediaView({ block }: { block: TextMediaBlock }) {
  const left = clean(block.mediaPosition) === "left";
  const ratio = clean(block.ratio) ?? "1:1";
  const align = clean(block.verticalAlign) ?? "center";
  const sticky = clean(block.stickyText) === true;
  const textCols = { "1:1": "md:col-span-6", "1:2": "md:col-span-4", "2:1": "md:col-span-7" }[ratio];
  const mediaCols = { "1:1": "md:col-span-6", "1:2": "md:col-span-8", "2:1": "md:col-span-5" }[ratio];

  return (
    <div className={cn("grid gap-8 md:grid-cols-12 md:gap-12", sticky ? "md:items-start" : { start: "md:items-start", center: "md:items-center", end: "md:items-end" }[align])}>
      <div className={cn(textCols, left && "md:order-2", sticky && "md:sticky md:top-28", "space-y-4")}>
        {block.eyebrow && <p className="text-[15px] text-subtle">{block.eyebrow}</p>}
        {block.heading && <h3 className="text-balance font-serif text-[1.75rem] font-[380] leading-[1.15] tracking-[-0.02em] text-ink md:text-[2.125rem]">{block.heading}</h3>}
        <RichText value={block.body} />
      </div>
      <MediaFrame
        media={block.media}
        aspect={block.aspect}
        fit={block.fit}
        frame={block.frame}
        panelColor={block.panelColor}
        padding={block.padding}
        rounded={block.rounded}
        shadow={block.shadow}
        caption={block.caption}
        sizes="(min-width: 768px) 60vw, 100vw"
        className={cn(mediaCols, left && "md:order-1")}
      />
    </div>
  );
}

export function ColumnsView({ block }: { block: ColumnsBlock }) {
  const columns = block.columns ?? [];
  const ratio = clean(block.ratio) ?? "equal";
  const template =
    ratio === "2-1" ? "md:grid-cols-[2fr_1fr]" : ratio === "1-2" ? "md:grid-cols-[1fr_2fr]" : { 1: "", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[Math.min(columns.length, 4)] ?? "";
  const dividers = clean(block.dividers) === true;

  return (
    <div className={cn("grid gap-10", template, dividers ? "md:gap-16" : "md:gap-8")}>
      {columns.map((col, i) => (
        <div
          key={col._key}
          className={cn(
            "relative space-y-4",
            dividers && i > 0 && "md:before:absolute md:before:inset-y-0 md:before:-left-8 md:before:w-px md:before:bg-line-strong",
          )}
        >
          {hasMedia(col.media) && <MediaFrame media={col.media} aspect={block.aspect} fit={block.fit} panelColor={block.panelColor} sizes="(min-width: 768px) 33vw, 100vw" />}
          {col.eyebrow && <p className="text-[14px] text-subtle">{col.eyebrow}</p>}
          {col.heading && <h3 className="text-[1.125rem] font-medium text-ink">{col.heading}</h3>}
          <RichText value={col.body} className="text-[1rem]" />
        </div>
      ))}
    </div>
  );
}

const cardCols = { "2": "sm:grid-cols-2", "3": "sm:grid-cols-2 lg:grid-cols-3", "4": "sm:grid-cols-2 lg:grid-cols-4" };

export function CardsView({ block }: { block: CardsBlock }) {
  const style = clean(block.style) ?? "bordered";
  const cols = (clean(block.columns) ?? "3") as "2" | "3" | "4";
  const bg = color(block.cardColor);
  const numbered = clean(block.numbered) === true;

  return (
    <div className="space-y-6">
      {block.heading && <h3 className="text-[1.125rem] font-medium text-ink">{block.heading}</h3>}
      <div className={cn("grid gap-4 md:gap-5", cardCols[cols])}>
        {(block.items ?? []).map((item, i) => (
          <div
            key={item._key}
            className={cn(
              "flex flex-col gap-3 rounded-md",
              style === "bordered" && "border border-line-strong p-6",
              style === "filled" && "bg-panel p-6",
              style === "plain" && "py-2",
              style === "filled" && bg && (isDark(bg) ? "tone-light" : "tone-dark"),
            )}
            style={style === "filled" && bg ? { background: bg } : undefined}
          >
            {hasMedia(item.media) && (
              <MediaFrame media={item.media} aspect={block.mediaAspect} fit="contain" rounded sizes="(min-width: 768px) 25vw, 50vw" className={clean(block.mediaAspect) === "auto" || !block.mediaAspect ? "max-w-14" : ""} />
            )}
            {numbered && <span className="text-[13px] tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</span>}
            {item.kicker && <span className="text-[13px] text-subtle">{item.kicker}</span>}
            {item.title && <h4 className="text-[1.0625rem] font-medium leading-snug text-ink">{item.title}</h4>}
            {item.body && <p className="text-[15px] leading-relaxed text-muted">{item.body}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsView({ block }: { block: StatsBlock }) {
  const cols = (clean(block.columns) ?? "3") as "2" | "3" | "4";
  return (
    <div>
      <dl className={cn("grid gap-x-8 gap-y-10", cardCols[cols])}>
        {(block.items ?? []).map((item) => (
          <div key={item._key} className="border-t border-line-strong pt-5">
            <dd className="font-serif text-[3rem] font-[340] leading-none tracking-[-0.03em] text-ink md:text-[3.75rem]">{item.value}</dd>
            <dt className="mt-3 text-[15px] text-ink">{item.label}</dt>
            {item.description && <p className="mt-1 text-[14px] leading-relaxed text-muted">{item.description}</p>}
          </div>
        ))}
      </dl>
      {block.footnote && <p className="mt-8 text-[13px] text-subtle">{block.footnote}</p>}
    </div>
  );
}

const dividerSpace = { sm: "h-6", md: "h-12", lg: "h-20", xl: "h-32" };

export function DividerView({ block }: { block: DividerBlock }) {
  const style = clean(block.style) ?? "line";
  const size = (clean(block.size) ?? "md") as keyof typeof dividerSpace;
  return (
    <div className={cn("flex items-center justify-center", dividerSpace[size])} role="separator">
      {style === "line" && <span className="h-px w-full bg-line-strong" />}
      {style === "dots" && (
        <span className="flex gap-2.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1 rounded-full bg-subtle" />
          ))}
        </span>
      )}
    </div>
  );
}
