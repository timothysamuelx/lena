import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, resolvedProjectId } from "./env";

export const imageBuilder = createImageUrlBuilder({
  projectId: resolvedProjectId,
  dataset,
});

/**
 * Sanity asset refs encode everything needed to build a CDN URL, so documents
 * don't have to dereference assets in GROQ:
 *   image-<id>-<w>x<h>-<ext>   →  dimensions + format
 *   file-<id>-<ext>            →  https://cdn.sanity.io/files/<project>/<dataset>/<id>.<ext>
 */
export function parseImageRef(ref: string) {
  const match = /^image-([a-f0-9]+)-(\d+)x(\d+)-(\w+)$/i.exec(ref);
  if (!match) return null;
  return { id: match[1], width: Number(match[2]), height: Number(match[3]), format: match[4] };
}

export function fileUrlFromRef(ref: string) {
  const match = /^file-([a-f0-9]+)-(\w+)$/i.exec(ref);
  if (!match) return undefined;
  return `https://cdn.sanity.io/files/${resolvedProjectId}/${dataset}/${match[1]}.${match[2]}`;
}
