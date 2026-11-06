import type { NavItem } from "@/components/site/SideNav";

import type { Block } from "./types";
import { clean, slugify } from "./utils";

/**
 * Builds the case-study sidebar from the page's blocks:
 * section headings (unless turned off) plus any block given a sidebar label.
 */
export function buildToc(sections: Block[] = []) {
  const items: NavItem[] = [];
  const ids: Record<string, string> = {};
  const used = new Set<string>();

  for (const block of sections) {
    if (clean(block.settings?.hidden)) continue;
    let label = clean(block.settings?.tocLabel)?.trim();
    if (!label && block._type === "sectionHeading" && clean(block.showInToc) !== false) {
      label = clean(block.eyebrow || block.heading)?.trim();
    }
    if (!label) continue;

    let id = slugify(label) || "section";
    for (let n = 2; used.has(id); n++) id = `${slugify(label)}-${n}`;
    used.add(id);
    ids[block._key] = id;
    items.push({ id, label, level: clean(block.settings?.tocLevel) === 2 ? 2 : 1 });
  }
  return { items, ids };
}
