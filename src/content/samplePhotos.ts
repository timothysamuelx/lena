/**
 * Sample photos — shown ONLY while Sanity isn't connected (no project ID), so
 * the photography page layout can be previewed. They're illustrations, not
 * Nandun's photographs: once Sanity is connected, only photos added in the
 * Studio (Photography) appear.
 */
import type { Photo } from "@/lib/types";

const photo = (file: string, width: number, height: number, title: string): Photo => ({
  _key: file,
  _type: "image",
  asset: { url: `/samples/photos/${file}`, width, height },
  alt: `Sample placeholder illustration: ${title.toLowerCase()}`,
  title,
  location: "Sample",
});

export const samplePhotos: Photo[] = [
  photo("dusk.svg", 1500, 1000, "Dusk over the ridges"),
  photo("tide.svg", 1000, 1500, "Low tide"),
  photo("street.svg", 1200, 1500, "Night street"),
  photo("forest.svg", 1200, 1200, "Mist in the pines"),
  photo("hills.svg", 1000, 1500, "Tea country"),
  photo("dunes.svg", 1600, 900, "Dunes"),
  photo("moon.svg", 1200, 1500, "Moonrise"),
  photo("lake.svg", 1500, 1000, "Still water"),
];
