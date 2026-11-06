import { BlockquoteIcon, BulbOutlineIcon, TextIcon, ThListIcon } from "../../icons";
import { defineField, defineType } from "sanity";

import { colorField, radio, settingsField, toPlainText } from "../helpers";

export const sectionHeading = defineType({
  name: "sectionHeading",
  title: "Section heading",
  type: "object",
  icon: ThListIcon,
  description: "Eyebrow + heading + intro. Automatically listed in the sidebar.",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", description: "e.g. Overview, The challenge, Process" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "richText" }),
    defineField({
      name: "size",
      title: "Heading size",
      type: "string",
      initialValue: "md",
      options: radio([
        { title: "S", value: "sm" },
        { title: "M", value: "md" },
        { title: "L", value: "lg" },
        { title: "XL", value: "xl" },
      ]),
    }),
    defineField({
      name: "showInToc",
      title: "Show in sidebar",
      type: "boolean",
      initialValue: true,
      description: "Uses the eyebrow (or heading) as the label unless overridden in Layout & style.",
    }),
    settingsField({ width: "narrow", spaceTop: "lg", spaceBottom: "sm" }),
  ],
  preview: {
    select: { eyebrow: "eyebrow", heading: "heading" },
    prepare: ({ eyebrow, heading }) => ({ title: heading || eyebrow || "Section heading", subtitle: eyebrow ? `Section · ${eyebrow}` : "Section" }),
  },
});

export const textBlock = defineType({
  name: "textBlock",
  title: "Text",
  type: "object",
  icon: TextIcon,
  fields: [
    defineField({ name: "body", title: "Text", type: "richText" }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "string",
      initialValue: "1",
      options: radio([
        { title: "1", value: "1" },
        { title: "2", value: "2" },
      ]),
    }),
    defineField({
      name: "size",
      title: "Text size",
      type: "string",
      initialValue: "base",
      options: radio([
        { title: "Regular", value: "base" },
        { title: "Large", value: "lg" },
        { title: "Display (serif)", value: "display" },
      ]),
    }),
    settingsField({ width: "narrow", spaceTop: "sm", spaceBottom: "sm" }),
  ],
  preview: {
    select: { body: "body" },
    prepare: ({ body }) => ({ title: toPlainText(body) || "Text", subtitle: "Text" }),
  },
});

export const quoteBlock = defineType({
  name: "quoteBlock",
  title: "Quote",
  type: "object",
  icon: BlockquoteIcon,
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
    defineField({ name: "attribution", title: "Attribution", type: "string" }),
    defineField({ name: "role", title: "Role / context", type: "string" }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      initialValue: "serif",
      options: radio([
        { title: "Large serif", value: "serif" },
        { title: "Pull quote", value: "pull" },
        { title: "Sticky note", value: "note" },
      ]),
    }),
    settingsField({ width: "narrow", spaceTop: "lg", spaceBottom: "lg" }),
  ],
  preview: {
    select: { quote: "quote", attribution: "attribution" },
    prepare: ({ quote, attribution }) => ({ title: quote || "Quote", subtitle: attribution ? `Quote · ${attribution}` : "Quote" }),
  },
});

export const calloutBlock = defineType({
  name: "calloutBlock",
  title: "Callout",
  type: "object",
  icon: BulbOutlineIcon,
  description: "A highlighted box for key insights, principles or takeaways.",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", description: "e.g. Key insight" }),
    defineField({ name: "body", title: "Text", type: "richText" }),
    colorField("color", "Box colour"),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      initialValue: "filled",
      options: radio([
        { title: "Filled", value: "filled" },
        { title: "Outline", value: "outline" },
        { title: "Accent bar", value: "bar" },
      ]),
    }),
    settingsField({ width: "narrow" }),
  ],
  preview: {
    select: { label: "label", body: "body" },
    prepare: ({ label, body }) => ({ title: label || toPlainText(body) || "Callout", subtitle: "Callout" }),
  },
});
