import { hasMedia, imageSize, videoSource } from "@/lib/media";
import type { ColorValue, Fit, Frame, MediaValue, Padding } from "@/lib/types";
import { aspect as toAspect, clean, cn, color, isDark } from "@/lib/utils";
import { imageBuilder } from "@/sanity/image";

import { SanityImage } from "./SanityImage";
import { Video } from "./Video";

export const paddingClass: Record<Padding, string> = {
  none: "",
  sm: "p-3 md:p-5",
  md: "p-5 md:p-10",
  lg: "p-6 md:p-16",
};

export interface MediaFrameProps {
  media?: MediaValue;
  aspect?: string;
  fit?: Fit;
  frame?: Frame;
  panelColor?: ColorValue;
  padding?: Padding;
  rounded?: boolean;
  shadow?: boolean;
  label?: string;
  caption?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Classes for the coloured box (e.g. hover zoom targets). */
  boxClassName?: string;
  mediaClassName?: string;
}

function MediaContent({ media, fit, sizes, priority, fill, className }: { media: MediaValue; fit: Fit; sizes?: string; priority?: boolean; fill: boolean; className?: string }) {
  if (clean(media.kind) === "video") {
    const src = videoSource(media);
    if (!src) return null;
    const poster = media.poster?.asset?._ref ? imageBuilder.image(media.poster).width(1600).auto("format").url() : media.poster?.asset?.url;
    return (
      <Video
        src={src}
        poster={poster}
        autoplay={clean(media.autoplay) !== false}
        controls={clean(media.controls) === true}
        fit={fit}
        className={cn(fill ? "absolute inset-0" : "block h-auto", className)}
      />
    );
  }
  if (!media.image) return null;
  return <SanityImage image={media.image} fill={fill} fit={fit} sizes={sizes} priority={priority} className={cn(!fill && "h-auto w-full", className)} />;
}

/** Media inside an optional frame (panel, browser window, phone) with caption. */
export function MediaFrame({
  media,
  aspect,
  fit = "cover",
  frame = "none",
  panelColor,
  padding = "none",
  rounded = true,
  shadow = false,
  label,
  caption,
  sizes,
  priority,
  className,
  boxClassName,
  mediaClassName,
}: MediaFrameProps) {
  const f = clean(frame) ?? "none";
  const ratio = toAspect(aspect);
  const pad = clean(padding) ?? "none";
  const bg = color(panelColor) ?? (f === "panel" || f === "browser" || f === "phone" ? "var(--panel)" : undefined);
  const isRounded = clean(rounded) !== false;
  const fitValue = clean(fit) ?? "cover";
  const intrinsic = media?.image ? imageSize(media.image) : null;

  if (!hasMedia(media)) {
    return (
      <figure className={className}>
        <div
          className={cn("grid place-items-center bg-panel text-[13px] text-subtle", isRounded && "rounded-md", boxClassName)}
          style={{ aspectRatio: ratio ?? "16 / 9", background: bg }}
        >
          Add media in Sanity
        </div>
      </figure>
    );
  }

  const radius = isRounded ? "rounded-md" : "";
  const innerRadius = isRounded ? "rounded-[4px]" : "";

  let inner: React.ReactNode;
  if (f === "browser") {
    inner = (
      <div className={cn("overflow-hidden bg-white ring-1 ring-black/5", innerRadius, "shadow-[0_24px_60px_-28px_rgba(20,24,30,0.35)]")}>
        <div className="flex h-7 items-center gap-1.5 border-b border-black/5 bg-[#f6f5f2] px-3">
          <span className="size-2 rounded-full bg-[#f26b5b]" />
          <span className="size-2 rounded-full bg-[#f5bf4f]" />
          <span className="size-2 rounded-full bg-[#61c454]" />
        </div>
        <div className="relative" style={{ aspectRatio: ratio }}>
          <MediaContent media={media!} fit={fitValue} sizes={sizes} priority={priority} fill={Boolean(ratio)} className={mediaClassName} />
        </div>
      </div>
    );
  } else if (f === "phone") {
    inner = (
      <div className="mx-auto w-full max-w-[300px] rounded-[2.6rem] bg-[#16181c] p-[10px] shadow-[0_30px_60px_-30px_rgba(20,24,30,0.55)]">
        <div className="relative overflow-hidden rounded-[2rem] bg-white" style={{ aspectRatio: "9 / 19.5" }}>
          <MediaContent media={media!} fit={fitValue} sizes="300px" priority={priority} fill className={mediaClassName} />
        </div>
      </div>
    );
  } else {
    const fill = Boolean(ratio) && pad === "none";
    inner = (
      <div className={cn("relative", pad !== "none" && "h-full", !fill && pad !== "none" && "grid place-items-center")} style={fill ? { aspectRatio: ratio } : undefined}>
        {pad !== "none" && ratio ? (
          <div className="relative h-full w-full">
            <MediaContent media={media!} fit="contain" sizes={sizes} priority={priority} fill className={mediaClassName} />
          </div>
        ) : (
          <MediaContent media={media!} fit={fitValue} sizes={sizes} priority={priority} fill={fill} className={cn(innerRadius, mediaClassName)} />
        )}
      </div>
    );
  }

  const boxStyle: React.CSSProperties = { background: bg };
  // With padding + ratio the *box* takes the ratio and the media is contained inside it.
  if (ratio && pad !== "none" && (f === "none" || f === "panel")) boxStyle.aspectRatio = ratio;
  if (!ratio && !intrinsic && f === "none" && pad === "none") boxStyle.aspectRatio = "16 / 9";

  return (
    <figure className={className}>
      <div
        className={cn(
          "relative overflow-hidden",
          radius,
          shadow && "shadow-[0_30px_70px_-35px_rgba(20,24,30,0.45)]",
          paddingClass[pad as Padding],
          label && "pt-14 md:pt-16",
          isDark(color(panelColor)) && "tone-light",
          boxClassName,
        )}
        style={boxStyle}
      >
        {label && <span className="absolute left-5 top-5 text-[14px] text-ink/75 md:left-6 md:top-6">{label}</span>}
        {inner}
      </div>
      {caption && <figcaption className="mt-3 text-[14px] leading-snug text-subtle">{caption}</figcaption>}
    </figure>
  );
}
