import { cardsBlock, columnsBlock, dividerBlock, statsBlock, textMediaBlock } from "./layout";
import { compareBlock, embedBlock, galleryBlock, mediaBlock } from "./media";
import { calloutBlock, quoteBlock, sectionHeading, textBlock } from "./text";

export const blockTypes = [
  sectionHeading,
  textBlock,
  mediaBlock,
  galleryBlock,
  textMediaBlock,
  columnsBlock,
  cardsBlock,
  statsBlock,
  quoteBlock,
  calloutBlock,
  compareBlock,
  embedBlock,
  dividerBlock,
];

/** Insert-menu groups for the page builder. */
export const blockGroups = [
  { name: "text", title: "Text", of: ["sectionHeading", "textBlock", "quoteBlock", "calloutBlock"] },
  { name: "media", title: "Media", of: ["mediaBlock", "galleryBlock", "compareBlock", "embedBlock"] },
  { name: "layout", title: "Layout", of: ["textMediaBlock", "columnsBlock", "cardsBlock", "statsBlock", "dividerBlock"] },
];
