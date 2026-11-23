import { SanityImage } from "@/components/media/SanityImage";
import { site } from "@/content/site";
import { hasImage } from "@/lib/media";
import type { ImageValue } from "@/lib/types";
import { clean } from "@/lib/utils";

/** Shown until a portrait is uploaded in Sanity. */
const samplePortrait: ImageValue = {
  _type: "image",
  asset: { url: "/samples/portrait.svg", width: 1200, height: 1500 },
  alt: "Sample portrait illustration",
};

/**
 * Nandun's portrait for the hero, styled as a design-tool frame with a quiet
 * frame name above. Upload it in Sanity (Profile → Portrait); until then a
 * sample illustration fills the frame.
 */
export function Portrait({ image }: { image?: ImageValue | null }) {
  const portrait = image && hasImage(image) ? image : samplePortrait;

  return (
    <figure className="group relative w-36 sm:w-44 lg:w-full">
      <figcaption className="mb-2 text-[12.5px] leading-none text-subtle">nandun.jpg</figcaption>
      <div className="relative aspect-[4/5]">
        <div className="absolute inset-0 overflow-hidden bg-panel">
          <div className="absolute inset-0 transition-transform duration-1000 ease-out-expo group-hover:scale-[1.03]">
            <SanityImage
              image={portrait}
              alt={clean(portrait.alt) || `Portrait of ${site.name}`}
              fill
              sizes="(min-width: 1024px) 288px, (min-width: 640px) 176px, 144px"
              priority
            />
          </div>
        </div>
      </div>
    </figure>
  );
}
