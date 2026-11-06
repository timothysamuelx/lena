import { MediaFrame } from "@/components/media/MediaFrame";
import { Parallax } from "@/components/motion/Parallax";
import type { CompareBlock, EmbedBlock, GalleryBlock, MediaBlock } from "@/lib/types";
import { aspect, clean, cn, color } from "@/lib/utils";

import { Carousel } from "./Carousel";
import { Compare } from "./Compare";

const sizesFor = (width?: string) =>
  ({ narrow: "(min-width: 768px) 680px, 100vw", default: "(min-width: 1024px) 960px, 100vw", wide: "(min-width: 1280px) 1200px, 100vw", full: "100vw" })[
    clean(width) ?? "default"
  ] ?? "100vw";

export function MediaBlockView({ block }: { block: MediaBlock }) {
  const frame = (
    <MediaFrame
      media={block.media}
      aspect={block.aspect}
      fit={block.fit}
      frame={block.frame}
      panelColor={block.panelColor}
      padding={block.padding}
      rounded={clean(block.settings?.width) === "full" ? false : block.rounded}
      shadow={block.shadow}
      label={block.label}
      caption={block.caption}
      sizes={sizesFor(block.settings?.width)}
      className={cn(clean(block.settings?.width) === "full" && "[&_figcaption]:px-[var(--gutter)]")}
    />
  );
  return clean(block.parallax) ? <Parallax>{frame}</Parallax> : frame;
}

const gapClass = { sm: "gap-2 md:gap-3", md: "gap-4 md:gap-6", lg: "gap-6 md:gap-10" };
const colsClass = { "2": "sm:grid-cols-2", "3": "sm:grid-cols-2 lg:grid-cols-3", "4": "grid-cols-2 lg:grid-cols-4" };
const masonryCols = { "2": "sm:columns-2", "3": "sm:columns-2 lg:columns-3", "4": "columns-2 lg:columns-4" };
const carouselWidth = { "2": "w-[85%] sm:w-[48%]", "3": "w-[78%] sm:w-[42%] lg:w-[31.5%]", "4": "w-[70%] sm:w-[36%] lg:w-[23.5%]" };

export function GalleryView({ block }: { block: GalleryBlock }) {
  const layout = clean(block.layout) ?? "grid";
  const cols = (clean(block.columns) ?? "2") as "2" | "3" | "4";
  const gap = (clean(block.gap) ?? "md") as "sm" | "md" | "lg";
  const items = block.items ?? [];
  const sizes = `(min-width: 1024px) ${Math.round(100 / Number(cols))}vw, 90vw`;

  const item = (it: (typeof items)[number], extra?: string) => (
    <MediaFrame
      key={it._key}
      media={it.media}
      aspect={layout === "masonry" ? undefined : block.aspect}
      fit={block.fit}
      panelColor={it.panelColor ?? block.panelColor}
      padding={block.padding}
      rounded={block.rounded}
      caption={it.caption}
      sizes={sizes}
      className={extra}
    />
  );

  return (
    <div>
      {layout === "carousel" ? (
        <Carousel label={block.caption}>{items.map((it) => item(it, cn("shrink-0 snap-start", carouselWidth[cols])))}</Carousel>
      ) : layout === "masonry" ? (
        <div className={cn(masonryCols[cols], gap === "sm" ? "gap-2 md:gap-3" : gap === "lg" ? "gap-6 md:gap-10" : "gap-4 md:gap-6")}>
          {items.map((it) => item(it, cn("mb-4 break-inside-avoid md:mb-6", gap === "sm" && "mb-2 md:mb-3", gap === "lg" && "mb-6 md:mb-10")))}
        </div>
      ) : (
        <div className={cn("grid", colsClass[cols], gapClass[gap])}>{items.map((it) => item(it))}</div>
      )}
      {block.caption && <p className="mt-4 text-[14px] text-subtle">{block.caption}</p>}
    </div>
  );
}

export function CompareView({ block }: { block: CompareBlock }) {
  if (!block.before?.asset || !block.after?.asset) return null;
  return (
    <figure>
      <Compare before={block.before} after={block.after} beforeLabel={block.beforeLabel} afterLabel={block.afterLabel} ratio={aspect(block.aspect) ?? "16 / 10"} />
      {block.caption && <figcaption className="mt-3 text-[14px] text-subtle">{block.caption}</figcaption>}
    </figure>
  );
}

/** Converts share links from common tools into embeddable URLs. */
export function toEmbedUrl(raw: string): string {
  const url = clean(raw).trim();
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host.endsWith("figma.com") && !u.pathname.startsWith("/embed")) {
      return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v") ?? u.pathname.split("/").pop();
      return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (host === "youtu.be") return `https://www.youtube-nocookie.com/embed${u.pathname}`;
    if (host === "vimeo.com") return `https://player.vimeo.com/video${u.pathname}`;
    if (host === "loom.com" && u.pathname.startsWith("/share/")) return `https://www.loom.com/embed/${u.pathname.split("/").pop()}`;
    return url;
  } catch {
    return url;
  }
}

export function EmbedView({ block }: { block: EmbedBlock }) {
  const ratio = aspect(block.aspect) ?? "16 / 9";
  const bg = color(block.panelColor);
  return (
    <figure>
      <div className="relative overflow-hidden rounded-md bg-panel" style={{ aspectRatio: ratio, background: bg }}>
        {block.url ? (
          <iframe
            src={toEmbedUrl(block.url)}
            title={block.title || block.caption || "Embedded content"}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div className="space-y-2">
              <p className="font-serif text-2xl text-ink">{block.title || "Embed"}</p>
              <p className="text-[14px] text-subtle">Paste a Figma, YouTube, Vimeo or Loom link in Sanity.</p>
            </div>
          </div>
        )}
      </div>
      {block.caption && <figcaption className="mt-3 text-[14px] text-subtle">{block.caption}</figcaption>}
    </figure>
  );
}

