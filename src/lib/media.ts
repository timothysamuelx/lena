import type { ImageValue, MediaValue } from "@/lib/types";
import { fileUrlFromRef, parseImageRef } from "@/sanity/image";

import { clean } from "./utils";

/** Intrinsic size of a Sanity or local image (if known). */
export function imageSize(image: ImageValue | undefined): { width: number; height: number } | null {
  if (!image?.asset) return null;
  const { _ref, width, height } = image.asset;
  if (_ref) {
    const parsed = parseImageRef(_ref);
    if (!parsed) return null;
    // Account for crops so the aspect ratio matches what's rendered.
    const crop = image.crop;
    const w = crop ? parsed.width * (1 - crop.left - crop.right) : parsed.width;
    const h = crop ? parsed.height * (1 - crop.top - crop.bottom) : parsed.height;
    return { width: Math.round(w), height: Math.round(h) };
  }
  return width && height ? { width, height } : null;
}

export function hasImage(image: ImageValue | undefined) {
  return Boolean(image?.asset?._ref || image?.asset?.url);
}

export function videoSource(media: MediaValue | undefined): string | undefined {
  if (!media) return undefined;
  const ref = media.video?.asset?._ref;
  if (ref) return fileUrlFromRef(ref);
  return clean(media.video?.asset?.url || media.videoUrl) || undefined;
}

export function hasMedia(media: MediaValue | undefined): boolean {
  if (!media) return false;
  return clean(media.kind) === "video" ? Boolean(videoSource(media)) : hasImage(media.image);
}
