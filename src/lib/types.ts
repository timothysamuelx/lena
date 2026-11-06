import type { PortableTextBlock } from "@portabletext/types";

/* ── Primitives ───────────────────────────────────────────── */

/** Sanity colour-input value, or a plain hex string (sample data). */
export type ColorValue = { hex?: string } | string | null | undefined;

export type Keyed = { _key: string };

export interface ImageValue {
  _type?: "image";
  /** Sanity asset reference, or a local asset (sample data) with url + size. */
  asset?: { _ref?: string; url?: string; width?: number; height?: number };
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
  caption?: string;
}

export interface MediaValue {
  kind?: "image" | "video";
  image?: ImageValue;
  video?: { asset?: { _ref?: string; url?: string } };
  videoUrl?: string;
  poster?: ImageValue;
  autoplay?: boolean;
  controls?: boolean;
}

export type RichTextValue = (PortableTextBlock | (ImageValue & Keyed & { _type: "image" }))[];

export type Width = "narrow" | "default" | "wide" | "full";
export type Space = "none" | "sm" | "md" | "lg" | "xl";
export type Padding = "none" | "sm" | "md" | "lg";
export type Fit = "cover" | "contain";
export type Frame = "none" | "panel" | "browser" | "phone";
export type Animation = "fadeUp" | "fade" | "scale" | "reveal" | "none";

export interface BlockSettings {
  width?: Width;
  align?: "left" | "center";
  spaceTop?: Space;
  spaceBottom?: Space;
  background?: ColorValue;
  tone?: "auto" | "dark" | "light";
  animation?: Animation;
  hidden?: boolean;
  tocLabel?: string;
  tocLevel?: number;
}

interface BlockBase extends Keyed {
  settings?: BlockSettings;
}

interface Presentation {
  aspect?: string;
  fit?: Fit;
  frame?: Frame;
  panelColor?: ColorValue;
  padding?: Padding;
  rounded?: boolean;
  shadow?: boolean;
}

/* ── Page-builder blocks ──────────────────────────────────── */

export interface SectionHeadingBlock extends BlockBase {
  _type: "sectionHeading";
  eyebrow?: string;
  heading?: string;
  intro?: RichTextValue;
  size?: "sm" | "md" | "lg" | "xl";
  showInToc?: boolean;
}

export interface TextBlock extends BlockBase {
  _type: "textBlock";
  body?: RichTextValue;
  columns?: "1" | "2";
  size?: "base" | "lg" | "display";
}

export interface QuoteBlock extends BlockBase {
  _type: "quoteBlock";
  quote?: string;
  attribution?: string;
  role?: string;
  style?: "serif" | "pull" | "note";
}

export interface CalloutBlock extends BlockBase {
  _type: "calloutBlock";
  label?: string;
  body?: RichTextValue;
  color?: ColorValue;
  style?: "filled" | "outline" | "bar";
}

export interface MediaBlock extends BlockBase, Presentation {
  _type: "mediaBlock";
  media?: MediaValue;
  label?: string;
  caption?: string;
  parallax?: boolean;
}

export interface GalleryItem extends Keyed {
  media?: MediaValue;
  caption?: string;
  panelColor?: ColorValue;
}

export interface GalleryBlock extends BlockBase {
  _type: "galleryBlock";
  items?: GalleryItem[];
  layout?: "grid" | "masonry" | "carousel";
  columns?: "2" | "3" | "4";
  aspect?: string;
  fit?: Fit;
  gap?: "sm" | "md" | "lg";
  panelColor?: ColorValue;
  padding?: Padding;
  rounded?: boolean;
  caption?: string;
}

export interface CompareBlock extends BlockBase {
  _type: "compareBlock";
  before?: ImageValue;
  after?: ImageValue;
  beforeLabel?: string;
  afterLabel?: string;
  aspect?: string;
  caption?: string;
}

export interface EmbedBlock extends BlockBase {
  _type: "embedBlock";
  url?: string;
  title?: string;
  aspect?: string;
  caption?: string;
  panelColor?: ColorValue;
}

export interface TextMediaBlock extends BlockBase, Presentation {
  _type: "textMediaBlock";
  eyebrow?: string;
  heading?: string;
  body?: RichTextValue;
  media?: MediaValue;
  caption?: string;
  mediaPosition?: "left" | "right";
  ratio?: "1:1" | "1:2" | "2:1";
  verticalAlign?: "start" | "center" | "end";
  stickyText?: boolean;
}

export interface ColumnsBlock extends BlockBase {
  _type: "columnsBlock";
  columns?: (Keyed & { media?: MediaValue; eyebrow?: string; heading?: string; body?: RichTextValue })[];
  ratio?: "equal" | "2-1" | "1-2";
  aspect?: string;
  fit?: Fit;
  panelColor?: ColorValue;
  dividers?: boolean;
}

export interface CardsBlock extends BlockBase {
  _type: "cardsBlock";
  heading?: string;
  items?: (Keyed & { media?: MediaValue; kicker?: string; title?: string; body?: string })[];
  columns?: "2" | "3" | "4";
  style?: "plain" | "bordered" | "filled";
  numbered?: boolean;
  mediaAspect?: string;
  cardColor?: ColorValue;
}

export interface StatsBlock extends BlockBase {
  _type: "statsBlock";
  items?: (Keyed & { value?: string; label?: string; description?: string })[];
  columns?: "2" | "3" | "4";
  footnote?: string;
}

export interface DividerBlock extends BlockBase {
  _type: "dividerBlock";
  style?: "line" | "dots" | "space";
  size?: "sm" | "md" | "lg" | "xl";
}

export type Block =
  | SectionHeadingBlock
  | TextBlock
  | QuoteBlock
  | CalloutBlock
  | MediaBlock
  | GalleryBlock
  | CompareBlock
  | EmbedBlock
  | TextMediaBlock
  | ColumnsBlock
  | CardsBlock
  | StatsBlock
  | DividerBlock;

/* ── Projects ─────────────────────────────────────────────── */

export interface ProjectCard {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  projectType?: string;
  year?: string;
  featured?: boolean;
  cover?: MediaValue;
  cardColor?: ColorValue;
  cardAspect?: string;
  cardFit?: Fit;
  cardPadding?: Padding;
  cardCursor?: string;
  externalUrl?: string;
  /** True for the bundled sample projects shown before Sanity is connected. */
  isSample?: boolean;
}

export interface Project extends ProjectCard {
  subtitle?: string;
  meta?: (Keyed & { label?: string; value?: string })[];
  sections?: Block[];
  heroStyle?: "media-first" | "title-first" | "none";
  heroMedia?: MediaValue;
  heroColor?: ColorValue;
  heroWidth?: "default" | "wide" | "full";
  heroAspect?: string;
  heroFit?: Fit;
  heroPadding?: Padding;
  titleAlign?: "left" | "center";
  titleSize?: "md" | "lg" | "xl";
  accentColor?: ColorValue;
  backgroundColor?: ColorValue;
  textColor?: ColorValue;
  showToc?: boolean;
  showProgress?: boolean;
  showNext?: boolean;
  next?: ProjectCard | null;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: ImageValue;
}
