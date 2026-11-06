import { CaseIcon } from "../../icons";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineArrayMember, defineField, defineType } from "sanity";

import { blockGroups, blockTypes } from "../blocks";
import { colorField, radio } from "../helpers";
import { aspectOptions, fitOptions, paddingOptions } from "../options";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "card", title: "Home card" },
    { name: "hero", title: "Hero" },
    { name: "design", title: "Page design" },
    { name: "seo", title: "SEO" },
  ],
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "project", newItemPosition: "before" }),

    // ── Content ────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Project name",
      type: "string",
      group: ["content", "card"],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Headline",
      type: "text",
      rows: 2,
      group: "content",
      description: "Shown under the title on the case study, e.g. “Redesigning onboarding for first-time investors”.",
    }),
    defineField({
      name: "summary",
      title: "One-line description",
      type: "text",
      rows: 2,
      group: ["content", "card"],
      description: "What the product or experience is. Shown on the home page card.",
    }),
    defineField({
      name: "projectType",
      title: "Project type",
      type: "string",
      group: ["content", "card"],
      description: "e.g. UX/UI Design, Mobile App, Web Design, UX Research",
    }),
    defineField({ name: "year", title: "Year", type: "string", group: ["content", "card"] }),
    defineField({
      name: "meta",
      title: "Project details",
      type: "array",
      group: "content",
      description: "Shown under the title — e.g. Role, Timeline, Team, Tools, Methods.",
      of: [
        defineArrayMember({
          name: "metaItem",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "text", rows: 2, description: "Use new lines for multiple values." }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Page content",
      type: "array",
      group: "content",
      description: "Build the case study from blocks. Each block has its own “Layout & style” settings.",
      of: blockTypes.map((block) => defineArrayMember({ type: block.name })),
      options: {
        insertMenu: {
          groups: blockGroups,
          views: [{ name: "list" }, { name: "grid" }],
        },
      },
    }),

    // ── Home card ──────────────────────────────────────────────
    defineField({
      name: "featured",
      title: "Show on home page",
      type: "boolean",
      group: "card",
      initialValue: true,
    }),
    defineField({
      name: "cover",
      title: "Cover",
      type: "media",
      group: ["card", "hero"],
      description: "Image, GIF or short video used on the home page card (and as the hero by default).",
    }),
    colorField("cardColor", "Card background", { group: "card" }),
    defineField({
      name: "cardAspect",
      title: "Card aspect ratio",
      type: "string",
      group: "card",
      initialValue: "4/3",
      description: "Mixing ratios creates the staggered grid on the home page.",
      options: radio(aspectOptions.filter((o) => o.value !== "auto"), "dropdown"),
    }),
    defineField({ name: "cardFit", title: "Cover fit", type: "string", group: "card", initialValue: "cover", options: radio(fitOptions) }),
    defineField({ name: "cardPadding", title: "Cover padding", type: "string", group: "card", initialValue: "none", options: radio(paddingOptions) }),
    defineField({
      name: "cardCursor",
      title: "Hover label",
      type: "string",
      group: "card",
      description: "Text in the cursor chip when hovering the card. Defaults to “View case study”.",
    }),
    defineField({
      name: "externalUrl",
      title: "External link",
      type: "url",
      group: "card",
      description: "Optional — link the card to an external site instead of the case study page.",
    }),

    // ── Hero ───────────────────────────────────────────────────
    defineField({
      name: "heroStyle",
      title: "Hero style",
      type: "string",
      group: "hero",
      initialValue: "media-first",
      options: radio([
        { title: "Media, then title", value: "media-first" },
        { title: "Title, then media", value: "title-first" },
        { title: "No media", value: "none" },
      ]),
    }),
    defineField({
      name: "heroMedia",
      title: "Hero media",
      type: "media",
      group: "hero",
      description: "Leave empty to reuse the cover.",
    }),
    colorField("heroColor", "Hero background", { group: "hero", description: "Defaults to the card background." }),
    defineField({
      name: "heroWidth",
      title: "Hero width",
      type: "string",
      group: "hero",
      initialValue: "default",
      options: radio([
        { title: "Content", value: "default" },
        { title: "Wide", value: "wide" },
        { title: "Full bleed", value: "full" },
      ]),
    }),
    defineField({ name: "heroAspect", title: "Hero aspect ratio", type: "string", group: "hero", initialValue: "16/9", options: radio(aspectOptions, "dropdown") }),
    defineField({ name: "heroFit", title: "Hero fit", type: "string", group: "hero", initialValue: "cover", options: radio(fitOptions) }),
    defineField({ name: "heroPadding", title: "Hero padding", type: "string", group: "hero", initialValue: "none", options: radio(paddingOptions) }),

    // ── Page design ───────────────────────────────────────────
    defineField({
      name: "titleAlign",
      title: "Title alignment",
      type: "string",
      group: "design",
      initialValue: "left",
      options: radio([
        { title: "Left", value: "left" },
        { title: "Center", value: "center" },
      ]),
    }),
    defineField({
      name: "titleSize",
      title: "Title size",
      type: "string",
      group: "design",
      initialValue: "lg",
      options: radio([
        { title: "M", value: "md" },
        { title: "L", value: "lg" },
        { title: "XL", value: "xl" },
      ]),
    }),
    colorField("accentColor", "Accent colour", { group: "design", description: "Sidebar marker, progress bar, links and highlights." }),
    colorField("backgroundColor", "Page background", { group: "design" }),
    colorField("textColor", "Text colour", { group: "design", description: "Set this if you use a dark page background." }),
    defineField({ name: "showToc", title: "Show sidebar contents", type: "boolean", group: "design", initialValue: true }),
    defineField({ name: "showProgress", title: "Show reading progress bar", type: "boolean", group: "design", initialValue: true }),
    defineField({ name: "showNext", title: "Show next project", type: "boolean", group: "design", initialValue: true }),
    defineField({
      name: "nextProject",
      title: "Next project",
      type: "reference",
      to: [{ type: "project" }],
      group: "design",
      description: "Defaults to the next project in your list.",
      hidden: ({ parent }) => parent?.showNext === false,
    }),

    // ── SEO ────────────────────────────────────────────────────
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, group: "seo" }),
    defineField({ name: "ogImage", title: "Social share image", type: "image", group: "seo", description: "1200×630 recommended. Defaults to the cover." }),
  ],
  preview: {
    select: {
      title: "title",
      type: "projectType",
      year: "year",
      image: "cover.image",
      poster: "cover.poster",
      featured: "featured",
    },
    prepare: ({ title, type, year, image, poster, featured }) => ({
      title,
      subtitle: [type, year, featured === false ? "hidden from home" : null].filter(Boolean).join(" · "),
      media: image || poster || CaseIcon,
    }),
  },
});
