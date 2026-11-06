import { defineField } from "sanity";

import { colorPresets } from "./options";

/** A colour picker field with the portfolio's preset swatches. */
export function colorField(
  name: string,
  title: string,
  extra: { description?: string; group?: string | string[]; fieldset?: string; hidden?: boolean } = {},
) {
  return defineField({
    name,
    title,
    type: "color",
    options: { disableAlpha: true, colorList: colorPresets.map((c) => c.value) },
    ...extra,
  });
}

/** Horizontal radio list (compact for layout options). */
export function radio<V extends string>(
  options: { title: string; value: V }[],
  layout: "radio" | "dropdown" = "radio",
) {
  return { list: options, layout, direction: "horizontal" as const };
}

/** The "Layout & style" settings every page-builder block carries. */
export function settingsField(initialValue: Record<string, unknown> = {}) {
  return defineField({
    name: "settings",
    title: "Layout & style",
    type: "blockSettings",
    options: { collapsible: true, collapsed: true },
    initialValue: {
      width: "default",
      align: "left",
      spaceTop: "md",
      spaceBottom: "md",
      tone: "auto",
      animation: "fadeUp",
      ...initialValue,
    },
  });
}

/** Turns a portable text value into a one-line plain-text preview. */
export function toPlainText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block) =>
      block && typeof block === "object" && Array.isArray((block as { children?: unknown[] }).children)
        ? (block as { children: { text?: string }[] }).children.map((c) => c.text ?? "").join("")
        : "",
    )
    .join(" ")
    .trim();
}
