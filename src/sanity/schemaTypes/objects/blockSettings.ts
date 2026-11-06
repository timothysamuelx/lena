import { ControlsIcon } from "../../icons";
import { defineField, defineType } from "sanity";

import { colorField, radio } from "../helpers";
import { alignOptions, animationOptions, spaceOptions, toneOptions, widthOptions } from "../options";

export const blockSettings = defineType({
  name: "blockSettings",
  title: "Layout & style",
  type: "object",
  icon: ControlsIcon,
  fieldsets: [
    { name: "layout", title: "Layout", options: { columns: 2 } },
    { name: "style", title: "Style", options: { columns: 2 } },
    { name: "toc", title: "Table of contents", options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: "width",
      title: "Width",
      type: "string",
      fieldset: "layout",
      options: radio(widthOptions, "dropdown"),
    }),
    defineField({
      name: "align",
      title: "Alignment",
      type: "string",
      fieldset: "layout",
      options: radio(alignOptions),
    }),
    defineField({
      name: "spaceTop",
      title: "Space above",
      type: "string",
      fieldset: "layout",
      options: radio(spaceOptions, "dropdown"),
    }),
    defineField({
      name: "spaceBottom",
      title: "Space below",
      type: "string",
      fieldset: "layout",
      options: radio(spaceOptions, "dropdown"),
    }),
    colorField("background", "Section background", {
      fieldset: "style",
      description: "Turns the block into a full-width coloured band.",
    }),
    defineField({
      name: "tone",
      title: "Text colour",
      type: "string",
      fieldset: "style",
      options: radio(toneOptions, "dropdown"),
    }),
    defineField({
      name: "animation",
      title: "Entrance animation",
      type: "string",
      fieldset: "style",
      options: radio(animationOptions, "dropdown"),
    }),
    defineField({
      name: "hidden",
      title: "Hide this block",
      type: "boolean",
      fieldset: "style",
      initialValue: false,
    }),
    defineField({
      name: "tocLabel",
      title: "Label",
      type: "string",
      fieldset: "toc",
      description: "Add a label to list this block in the case-study sidebar.",
    }),
    defineField({
      name: "tocLevel",
      title: "Level",
      type: "number",
      fieldset: "toc",
      options: { list: [{ title: "Section", value: 1 }, { title: "Sub-section", value: 2 }], layout: "radio", direction: "horizontal" },
      initialValue: 1,
    }),
  ],
});
