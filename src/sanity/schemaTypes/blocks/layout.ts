import { BarChartIcon, ComponentIcon, DashboardIcon, InlineIcon, RemoveIcon } from "../../icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { colorField, radio, settingsField } from "../helpers";
import { aspectOptions, columnsOptions, fitOptions, frameOptions, paddingOptions, spaceOptions } from "../options";

export const textMediaBlock = defineType({
  name: "textMediaBlock",
  title: "Text + media",
  type: "object",
  icon: InlineIcon,
  fieldsets: [{ name: "presentation", title: "Presentation", options: { columns: 2 } }],
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "body", title: "Text", type: "richText" }),
    defineField({ name: "media", title: "Media", type: "media" }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "mediaPosition",
      title: "Media position",
      type: "string",
      initialValue: "right",
      fieldset: "presentation",
      options: radio([
        { title: "Left", value: "left" },
        { title: "Right", value: "right" },
      ]),
    }),
    defineField({
      name: "ratio",
      title: "Text : media",
      type: "string",
      initialValue: "1:1",
      fieldset: "presentation",
      options: radio([
        { title: "1 : 1", value: "1:1" },
        { title: "1 : 2", value: "1:2" },
        { title: "2 : 1", value: "2:1" },
      ]),
    }),
    defineField({
      name: "verticalAlign",
      title: "Vertical alignment",
      type: "string",
      initialValue: "center",
      fieldset: "presentation",
      options: radio([
        { title: "Top", value: "start" },
        { title: "Center", value: "center" },
        { title: "Bottom", value: "end" },
      ]),
    }),
    defineField({ name: "stickyText", title: "Sticky text while scrolling", type: "boolean", initialValue: false, fieldset: "presentation" }),
    defineField({ name: "aspect", title: "Aspect ratio", type: "string", initialValue: "4/3", fieldset: "presentation", options: radio(aspectOptions, "dropdown") }),
    defineField({ name: "fit", title: "Fit", type: "string", initialValue: "cover", fieldset: "presentation", options: radio(fitOptions) }),
    defineField({ name: "frame", title: "Frame", type: "string", initialValue: "none", fieldset: "presentation", options: radio(frameOptions, "dropdown") }),
    colorField("panelColor", "Media background", { fieldset: "presentation" }),
    defineField({ name: "padding", title: "Media padding", type: "string", initialValue: "none", fieldset: "presentation", options: radio(paddingOptions) }),
    defineField({ name: "rounded", title: "Rounded corners", type: "boolean", initialValue: true, fieldset: "presentation" }),
    settingsField({ width: "wide" }),
  ],
  preview: {
    select: { heading: "heading", eyebrow: "eyebrow", image: "media.image", poster: "media.poster" },
    prepare: ({ heading, eyebrow, image, poster }) => ({ title: heading || eyebrow || "Text + media", subtitle: "Text + media", media: image || poster }),
  },
});

export const columnsBlock = defineType({
  name: "columnsBlock",
  title: "Columns",
  type: "object",
  icon: DashboardIcon,
  description: "2–4 side-by-side columns, each with optional media, heading and text.",
  fields: [
    defineField({
      name: "columns",
      title: "Columns",
      type: "array",
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          name: "column",
          type: "object",
          fields: [
            defineField({ name: "media", title: "Media", type: "media" }),
            defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "body", title: "Text", type: "richText" }),
          ],
          preview: {
            select: { heading: "heading", eyebrow: "eyebrow", image: "media.image" },
            prepare: ({ heading, eyebrow, image }) => ({ title: heading || eyebrow || "Column", media: image }),
          },
        }),
      ],
    }),
    defineField({
      name: "ratio",
      title: "Column widths",
      type: "string",
      initialValue: "equal",
      options: radio([
        { title: "Equal", value: "equal" },
        { title: "Wide first", value: "2-1" },
        { title: "Wide last", value: "1-2" },
      ]),
    }),
    defineField({ name: "aspect", title: "Media aspect ratio", type: "string", initialValue: "4/3", options: radio(aspectOptions, "dropdown") }),
    defineField({ name: "fit", title: "Media fit", type: "string", initialValue: "cover", options: radio(fitOptions) }),
    colorField("panelColor", "Media background"),
    defineField({ name: "dividers", title: "Divider lines", type: "boolean", initialValue: false }),
    settingsField({ width: "default" }),
  ],
  preview: {
    select: { columns: "columns", heading: "columns.0.heading" },
    prepare: ({ columns, heading }) => ({ title: heading || "Columns", subtitle: `Columns · ${Array.isArray(columns) ? columns.length : 0}` }),
  },
});

export const cardsBlock = defineType({
  name: "cardsBlock",
  title: "Cards",
  type: "object",
  icon: ComponentIcon,
  description: "Goals, insights, principles, personas, process steps…",
  fields: [
    defineField({ name: "heading", title: "Heading (optional)", type: "string" }),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          name: "card",
          type: "object",
          fields: [
            defineField({ name: "media", title: "Icon / image", type: "media" }),
            defineField({ name: "kicker", title: "Kicker", type: "string", description: "Small text above the title, e.g. Step 1" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Text", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "title", kicker: "kicker", image: "media.image" },
            prepare: ({ title, kicker, image }) => ({ title: title || "Card", subtitle: kicker, media: image }),
          },
        }),
      ],
    }),
    defineField({ name: "columns", title: "Columns", type: "string", initialValue: "3", options: radio(columnsOptions.slice(1)) }),
    defineField({
      name: "style",
      title: "Card style",
      type: "string",
      initialValue: "bordered",
      options: radio([
        { title: "Plain", value: "plain" },
        { title: "Bordered", value: "bordered" },
        { title: "Filled", value: "filled" },
      ]),
    }),
    defineField({ name: "numbered", title: "Show numbers (01, 02…)", type: "boolean", initialValue: false }),
    defineField({ name: "mediaAspect", title: "Image aspect ratio", type: "string", initialValue: "auto", options: radio(aspectOptions, "dropdown") }),
    colorField("cardColor", "Card colour"),
    settingsField({ width: "default" }),
  ],
  preview: {
    select: { heading: "heading", items: "items" },
    prepare: ({ heading, items }) => ({ title: heading || "Cards", subtitle: `Cards · ${Array.isArray(items) ? items.length : 0}` }),
  },
});

export const statsBlock = defineType({
  name: "statsBlock",
  title: "Stats / results",
  type: "object",
  icon: BarChartIcon,
  description: "Only include figures you can substantiate with project records.",
  fields: [
    defineField({
      name: "items",
      title: "Stats",
      type: "array",
      of: [
        defineArrayMember({
          name: "stat",
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string", description: "e.g. 12, 3×, 85%" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({ name: "columns", title: "Columns", type: "string", initialValue: "3", options: radio(columnsOptions.slice(1)) }),
    defineField({ name: "footnote", title: "Footnote / source", type: "string" }),
    settingsField({ width: "default" }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({ title: Array.isArray(items) ? items.map((i: { value?: string }) => i.value).join(" · ") : "Stats", subtitle: "Stats" }),
  },
});

export const dividerBlock = defineType({
  name: "dividerBlock",
  title: "Divider / spacer",
  type: "object",
  icon: RemoveIcon,
  fields: [
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      initialValue: "line",
      options: radio([
        { title: "Line", value: "line" },
        { title: "Dots", value: "dots" },
        { title: "Space only", value: "space" },
      ]),
    }),
    defineField({ name: "size", title: "Size", type: "string", initialValue: "md", options: radio(spaceOptions.slice(1)) }),
    settingsField({ width: "narrow", spaceTop: "none", spaceBottom: "none" }),
  ],
  preview: {
    select: { style: "style", size: "size" },
    prepare: ({ style, size }) => ({ title: `Divider · ${style ?? "line"} · ${size ?? "md"}` }),
  },
});

