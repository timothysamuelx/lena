import type { Block, BlockSettings } from "@/lib/types";
import { clean } from "@/lib/utils";

import { BlockShell } from "./BlockShell";
import { CardsView, ColumnsView, DividerView, StatsView, TextMediaView } from "./LayoutBlocks";
import { CompareView, EmbedView, GalleryView, MediaBlockView } from "./MediaBlocks";
import { CalloutView, QuoteView, SectionHeadingView, TextView } from "./TextBlocks";

/** Default layout per block type (editors can override everything in the Studio). */
const defaults: Record<Block["_type"], BlockSettings> = {
  sectionHeading: { width: "narrow", spaceTop: "lg", spaceBottom: "sm" },
  textBlock: { width: "narrow", spaceTop: "sm", spaceBottom: "sm" },
  quoteBlock: { width: "narrow", spaceTop: "lg", spaceBottom: "lg" },
  calloutBlock: { width: "narrow" },
  mediaBlock: { width: "default" },
  galleryBlock: { width: "default" },
  compareBlock: { width: "default" },
  embedBlock: { width: "default" },
  textMediaBlock: { width: "wide" },
  columnsBlock: { width: "default" },
  cardsBlock: { width: "default" },
  statsBlock: { width: "default" },
  dividerBlock: { width: "narrow", spaceTop: "none", spaceBottom: "none" },
};

function BlockContent({ block }: { block: Block }) {
  switch (block._type) {
    case "sectionHeading":
      return <SectionHeadingView block={block} />;
    case "textBlock":
      return <TextView block={block} />;
    case "quoteBlock":
      return <QuoteView block={block} />;
    case "calloutBlock":
      return <CalloutView block={block} />;
    case "mediaBlock":
      return <MediaBlockView block={block} />;
    case "galleryBlock":
      return <GalleryView block={block} />;
    case "compareBlock":
      return <CompareView block={block} />;
    case "embedBlock":
      return <EmbedView block={block} />;
    case "textMediaBlock":
      return <TextMediaView block={block} />;
    case "columnsBlock":
      return <ColumnsView block={block} />;
    case "cardsBlock":
      return <CardsView block={block} />;
    case "statsBlock":
      return <StatsView block={block} />;
    case "dividerBlock":
      return <DividerView block={block} />;
    default:
      return null;
  }
}

export function BlockRenderer({ blocks = [], ids = {} }: { blocks?: Block[]; ids?: Record<string, string> }) {
  return (
    <>
      {blocks.map((block) => {
        const type = clean(block._type) as Block["_type"];
        if (!(type in defaults)) return null;
        return (
          <BlockShell
            key={block._key}
            id={ids[block._key]}
            settings={block.settings}
            defaults={defaults[type]}
            flushWhenFull={type === "mediaBlock" || type === "compareBlock" || type === "embedBlock"}
          >
            <BlockContent block={block} />
          </BlockShell>
        );
      })}
    </>
  );
}
