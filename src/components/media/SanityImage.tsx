"use client";

import Image, { type ImageLoader } from "next/image";
import { useState } from "react";

import { imageSize } from "@/lib/media";
import type { Fit, ImageValue } from "@/lib/types";
import { clean, cn } from "@/lib/utils";
import { imageBuilder } from "@/sanity/image";

interface SanityImageProps {
  image: ImageValue;
  /** Fill the parent box (parent must be positioned and sized). */
  fill?: boolean;
  fit?: Fit;
  sizes?: string;
  priority?: boolean;
  className?: string;
  alt?: string;
}

/**
 * Renders Sanity images through the Sanity CDN (resized per breakpoint, with
 * hotspot-aware positioning) and local sample images directly.
 */
export function SanityImage({ image, fill, fit = "cover", sizes = "100vw", priority, className, alt }: SanityImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = image.asset?._ref;
  const size = imageSize(image);
  const altText = clean(alt ?? image.alt ?? "");
  const objectPosition = image.hotspot ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` : undefined;

  const loader: ImageLoader | undefined = ref
    ? ({ width, quality }) => imageBuilder.image(image).width(width).quality(quality ?? 82).fit("max").auto("format").url()
    : undefined;
  const src = ref ? imageBuilder.image(image).url() : image.asset?.url;
  if (!src) return null;

  const isSvg = !ref && src.endsWith(".svg");
  const common = {
    alt: altText,
    sizes,
    priority,
    loader,
    unoptimized: isSvg,
    onLoad: () => setLoaded(true),
    className: cn(
      "transition-[opacity,filter] duration-700 ease-out-expo",
      loaded || priority ? "opacity-100 blur-0" : "opacity-0 blur-sm",
      className,
    ),
    style: { objectFit: fill ? fit : undefined, objectPosition },
  } as const;

  if (fill || !size) {
    return <Image {...common} alt={altText} src={src} fill />;
  }
  return <Image {...common} alt={altText} src={src} width={size.width} height={size.height} />;
}
