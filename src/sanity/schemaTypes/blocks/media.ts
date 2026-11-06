import { ImageIcon, ImagesIcon, LaunchIcon, SplitHorizontalIcon } from "../../icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { colorField, radio, settingsField } from "../helpers";
import { aspectOptions, columnsOptions, fitOptions, frameOptions, gapOptions, paddingOptions } from "../options";

const frameFields = [
  defineField({
    name: "frame",
    title: "Frame",
    type: "string",
    initialValue: "none",
    fieldset: "presentation",
    options: radio(frameOptions, "dropdown"),
  }),
  colorField("panelColor", "Panel / frame background", { fieldset: "presentation" }),
  defineField({
    name: "padding",
    title: "Inner padding",
    type: "string",
    initialValue: "none",
    fieldset: "presentation",
    options: radio(paddingOptions),
  }),
  defineField({ name: "rounded", title: "Rounded corners", type: "boolean", initialValue: true, fieldset: "presentation" }),
  defineField({ name: "shadow", title: "Drop shadow", type: "boolean", initialValue: false, fieldset: "presentation" }),
];

export const mediaBlock = defineType({
  name: "mediaBlock",
  title: "Image / video",
  type: "object",
  icon: ImageIcon,
  fieldsets: [{ name: "presentation", title: "Presentation", options: { columns: 2 } }],
  fields: [
    defineField({ name: "media", title: "Media", type: "media" }),
    defineField({ name: "label", title: "Panel label", type: "string", description: "Small label shown in the top-left of a panel frame." }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "aspect",
      title: "Aspect ratio",
      type: "string",
      initialValue: "auto",
      fieldset: "presentation",
      options: radio(aspectOptions, "dropdown"),
    }),
    defineField({
      name: "fit",
      title: "Fit",
      type: "string",
      initialValue: "cover",
      fieldset: "presentation",
      options: radio(fitOptions),
    }),
    ...frameFields,
    defineField({ name: "parallax", title: "Subtle parallax on scroll", type: "boolean", initialValue: false, fieldset: "presentation" }),
    settingsField({ width: "default" }),
  ],
  preview: {
    select: { image: "media.image", poster: "media.poster", caption: "caption", label: "label", kind: "media.kind" },
    prepare: ({ image, poster, caption, label, kind }) => ({
      title: label || caption || (kind === "video" ? "Video" : "Image"),
      subtitle: kind === "video" ? "Video" : "Image",
      media: kind === "video" ? poster : image,
    }),
  },
});

export const galleryBlock = defineType({
  name: "galleryBlock",
  title: "Gallery",
  type: "object",
  icon: ImagesIcon,
  fieldsets: [{ name: "presentation", title: "Presentation", options: { columns: 2 } }],
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          name: "galleryItem",
          type: "object",
          fields: [
            defineField({ name: "media", title: "Media", type: "media" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
            colorField("panelColor", "Background"),
          ],
          preview: {
            select: { image: "media.image", poster: "media.poster", caption: "caption" },
            prepare: ({ image, poster, caption }) => ({ title: caption || "Item", media: image || poster }),
          },
        }),
      ],
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      initialValue: "grid",
      fieldset: "presentation",
      options: radio([
        { title: "Grid", value: "grid" },
        { title: "Masonry", value: "masonry" },
        { title: "Carousel", value: "carousel" },
      ]),
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "string",
      initialValue: "2",
      fieldset: "presentation",
      options: radio(columnsOptions.slice(1)),
    }),
    defineField({
      name: "aspect",
      title: "Aspect ratio",
      type: "string",
      initialValue: "4/3",
      fieldset: "presentation",
      options: radio(aspectOptions, "dropdown"),
    }),
    defineField({ name: "fit", title: "Fit", type: "string", initialValue: "cover", fieldset: "presentation", options: radio(fitOptions) }),
    defineField({ name: "gap", title: "Gap", type: "string", initialValue: "md", fieldset: "presentation", options: radio(gapOptions) }),
    colorField("panelColor", "Default item background", { fieldset: "presentation" }),
    defineField({ name: "padding", title: "Item padding", type: "string", initialValue: "none", fieldset: "presentation", options: radio(paddingOptions) }),
    defineField({ name: "rounded", title: "Rounded corners", type: "boolean", initialValue: true, fieldset: "presentation" }),
    defineField({ name: "caption", title: "Gallery caption", type: "string" }),
    settingsField({ width: "default" }),
  ],
  preview: {
    select: { items: "items", image: "items.0.media.image", caption: "caption" },
    prepare: ({ items, image, caption }) => ({
      title: caption || "Gallery",
      subtitle: `Gallery · ${Array.isArray(items) ? items.length : 0} items`,
      media: image,
    }),
  },
});

export const compareBlock = defineType({
  name: "compareBlock",
  title: "Before / after",
  type: "object",
  icon: SplitHorizontalIcon,
  description: "Drag-to-compare slider — great for redesigns.",
  fields: [
    defineField({ name: "before", title: "Before", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
    defineField({ name: "after", title: "After", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
    defineField({ name: "beforeLabel", title: "Before label", type: "string", initialValue: "Before" }),
    defineField({ name: "afterLabel", title: "After label", type: "string", initialValue: "After" }),
    defineField({ name: "aspect", title: "Aspect ratio", type: "string", initialValue: "16/10", options: radio(aspectOptions.slice(1), "dropdown") }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    settingsField({ width: "default" }),
  ],
  preview: {
    select: { image: "after", caption: "caption" },
    prepare: ({ image, caption }) => ({ title: caption || "Before / after", subtitle: "Before / after", media: image }),
  },
});

export const embedBlock = defineType({
  name: "embedBlock",
  title: "Embed (Figma, YouTube, Vimeo, Loom…)",
  type: "object",
  icon: LaunchIcon,
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "Paste a Figma prototype/file link, YouTube, Vimeo, Loom, or any https:// embed URL.",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({ name: "title", title: "Accessible title", type: "string" }),
    defineField({ name: "aspect", title: "Aspect ratio", type: "string", initialValue: "16/9", options: radio(aspectOptions.slice(1), "dropdown") }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    colorField("panelColor", "Background"),
    settingsField({ width: "default" }),
  ],
  preview: {
    select: { url: "url", caption: "caption" },
    prepare: ({ url, caption }) => ({ title: caption || url || "Embed", subtitle: "Embed" }),
  },
});
