import { ImageIcon } from "../../icons";
import { defineField, defineType } from "sanity";

type MediaParent = { kind?: string } | undefined;

export const media = defineType({
  name: "media",
  title: "Media",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      initialValue: "image",
      options: {
        list: [
          { title: "Image / GIF", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => (parent as MediaParent)?.kind === "video",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers. Leave empty if decorative.",
        }),
      ],
    }),
    defineField({
      name: "video",
      title: "Video file",
      type: "file",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
      description: "Upload an MP4/WebM. Keep it short and compressed for fast loading.",
      hidden: ({ parent }) => (parent as MediaParent)?.kind !== "video",
    }),
    defineField({
      name: "videoUrl",
      title: "…or video URL",
      type: "url",
      description: "Direct link to an .mp4/.webm file (for YouTube/Vimeo use an Embed block).",
      hidden: ({ parent }) => (parent as MediaParent)?.kind !== "video",
    }),
    defineField({
      name: "poster",
      title: "Poster image",
      type: "image",
      hidden: ({ parent }) => (parent as MediaParent)?.kind !== "video",
    }),
    defineField({
      name: "autoplay",
      title: "Autoplay (muted, looping)",
      type: "boolean",
      initialValue: true,
      hidden: ({ parent }) => (parent as MediaParent)?.kind !== "video",
    }),
    defineField({
      name: "controls",
      title: "Show controls",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => (parent as MediaParent)?.kind !== "video",
    }),
  ],
  preview: {
    select: { kind: "kind", image: "image", poster: "poster", alt: "image.alt" },
    prepare: ({ kind, image, poster, alt }) => ({
      title: kind === "video" ? "Video" : alt || "Image",
      media: kind === "video" ? poster : image,
    }),
  },
});
