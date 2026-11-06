/**
 * Sample projects — shown ONLY while Sanity isn't connected (no project ID).
 *
 * They demonstrate the page builder and double as a case-study template based
 * on the structure in Nandun's content brief. Nothing here describes real
 * work: once Sanity is connected, only projects created in the Studio appear.
 */
import type { Block, ImageValue, MediaValue, Project, RichTextValue } from "@/lib/types";

let keySeed = 0;
const key = () => `k${(keySeed++).toString(36)}`;

const img = (file: string, width: number, height: number, alt = ""): ImageValue => ({
  _type: "image",
  asset: { url: `/samples/${file}`, width, height },
  alt,
});
const media = (file: string, width: number, height: number, alt = ""): MediaValue => ({
  kind: "image",
  image: img(file, width, height, alt),
});

/** Tiny portable-text builder: strings become paragraphs; `[style, text]` tuples set a style. */
function text(...paragraphs: (string | [string, string] | { list: string[]; type?: "bullet" | "number" })[]): RichTextValue {
  const out: RichTextValue = [];
  for (const p of paragraphs) {
    if (typeof p === "string" || Array.isArray(p)) {
      const [style, value] = typeof p === "string" ? ["normal", p] : p;
      out.push({ _type: "block", _key: key(), style, markDefs: [], children: [{ _type: "span", _key: key(), text: value, marks: [] }] });
    } else {
      for (const item of p.list) {
        out.push({
          _type: "block",
          _key: key(),
          style: "normal",
          listItem: p.type ?? "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: key(), text: item, marks: [] }],
        });
      }
    }
  }
  return out;
}

const heading = (eyebrow: string, title: string, intro?: string, tocLevel = 1): Block => ({
  _type: "sectionHeading",
  _key: key(),
  eyebrow,
  heading: title,
  intro: intro ? text(intro) : undefined,
  showInToc: true,
  settings: { width: "narrow", spaceTop: "lg", spaceBottom: "sm", tocLevel },
});

/* ── 1. Case study template ─────────────────────────────── */

const template: Project = {
  _id: "sample-template",
  isSample: true,
  title: "Case study template",
  slug: "case-study-template",
  summary: "A ready-made structure for a UX case study — from overview to reflection.",
  subtitle: "A guided structure for presenting a design project clearly and honestly.",
  projectType: "UX/UI Design",
  cover: media("cover-template.svg", 1600, 1200, "Abstract browser window showing a case study layout"),
  cardColor: "#D6E4F0",
  cardAspect: "4/3",
  cardFit: "cover",
  heroStyle: "media-first",
  heroAspect: "16/9",
  heroFit: "cover",
  meta: [
    { _key: key(), label: "Role", value: "Your responsibilities" },
    { _key: key(), label: "Timeline", value: "Start — End" },
    { _key: key(), label: "Methods", value: "Only methods you used\ne.g. Interviews, Wireframes" },
    { _key: key(), label: "Tools", value: "Tools you genuinely used" },
  ],
  sections: [
    heading("Overview", "What the project is and what it set out to address.", "Open with one or two sentences a recruiter can skim: the product, the audience and the problem space."),
    {
      _type: "textBlock",
      _key: key(),
      body: text(
        "Every block on this page is editable in Sanity Studio — text, images, layout, width, spacing, colours and animation. Sections with an eyebrow appear automatically in the sidebar on the left.",
        "Replace this sample by creating a project in the Studio. Sample projects disappear as soon as Sanity is connected.",
      ),
      settings: { width: "narrow" },
    },
    {
      _type: "mediaBlock",
      _key: key(),
      label: "Panel frame with a label",
      media: media("flow.svg", 1600, 900, "Example user flow diagram"),
      caption: "Media blocks can sit in a coloured panel, a browser window or a phone frame.",
      frame: "panel",
      panelColor: "#F6E7B8",
      padding: "md",
      aspect: "auto",
      settings: { width: "default" },
    },

    heading("The challenge", "The user or product problem, supported by project evidence."),
    {
      _type: "textBlock",
      _key: key(),
      body: text("Describe who was affected and how you know. Link each claim to the evidence you gathered — notes, recordings, analytics or stakeholder input."),
      settings: { width: "narrow" },
    },
    {
      _type: "calloutBlock",
      _key: key(),
      label: "Accuracy note",
      body: text("Do not claim research activities, user testing, measured improvements or business outcomes unless you can substantiate them with project material or records."),
      color: "#F6D9C8",
      style: "filled",
      settings: { width: "narrow" },
    },

    heading("Goals", "What the design aimed to improve or achieve."),
    {
      _type: "cardsBlock",
      _key: key(),
      numbered: true,
      columns: "3",
      style: "bordered",
      items: [
        { _key: key(), title: "Goal one", body: "A clear, user-centred outcome the design worked towards." },
        { _key: key(), title: "Goal two", body: "A business or product requirement it had to respect." },
        { _key: key(), title: "Goal three", body: "A quality you wanted the experience to have." },
      ],
      settings: { width: "default" },
    },

    heading("My role", "Your responsibilities and the work you personally completed."),
    {
      _type: "textBlock",
      _key: key(),
      body: text("Be specific about what you did versus what the team did. Recruiters look for ownership and decision-making."),
      settings: { width: "narrow" },
    },

    heading("Process", "Research, flows, IA, wireframes, prototyping and testing — only where actually undertaken."),
    {
      _type: "cardsBlock",
      _key: key(),
      columns: "3",
      style: "filled",
      cardColor: "#ECEAE4",
      items: [
        { _key: key(), kicker: "Step 1", title: "Understand", body: "Research and synthesis that framed the problem." },
        { _key: key(), kicker: "Step 2", title: "Structure", body: "User flows and information architecture." },
        { _key: key(), kicker: "Step 3", title: "Explore", body: "Wireframes, prototypes and evaluation." },
      ],
      settings: { width: "default" },
    },
    {
      _type: "textMediaBlock",
      _key: key(),
      eyebrow: "User flows",
      heading: "Mapping the journey",
      body: text("Pair a short explanation with a diagram. Text + media blocks can flip sides, change ratios and keep the text sticky while the media scrolls."),
      media: media("flow.svg", 1600, 900, "Example user flow"),
      mediaPosition: "right",
      ratio: "1:2",
      aspect: "16/10",
      fit: "contain",
      panelColor: "#F4F3EF",
      settings: { width: "wide", tocLabel: "User flows", tocLevel: 2 },
    },
    {
      _type: "galleryBlock",
      _key: key(),
      layout: "grid",
      columns: "3",
      aspect: "4/3",
      fit: "cover",
      items: [
        { _key: key(), media: media("wire-1.svg", 1200, 900, "Low-fidelity wireframe: landing page"), caption: "Landing" },
        { _key: key(), media: media("wire-2.svg", 1200, 900, "Low-fidelity wireframe: listing page"), caption: "Listing" },
        { _key: key(), media: media("wire-3.svg", 1200, 900, "Low-fidelity wireframe: detail page"), caption: "Detail" },
      ],
      caption: "Galleries support grid, masonry and carousel layouts.",
      settings: { width: "wide", tocLabel: "Wireframes", tocLevel: 2 },
    },

    heading("Design decisions", "Explain the reasoning behind important layout, interaction and visual choices."),
    {
      _type: "compareBlock",
      _key: key(),
      before: img("before.svg", 1600, 1000, "Dense dashboard before the redesign"),
      after: img("after.svg", 1600, 1000, "Simplified dashboard after the redesign"),
      beforeLabel: "Before",
      afterLabel: "After",
      aspect: "16/10",
      caption: "Drag to compare — useful for showing how a decision changed the interface.",
      settings: { width: "default" },
    },

    heading("Final design", "Present the screens and explain the key features."),
    {
      _type: "galleryBlock",
      _key: key(),
      layout: "carousel",
      columns: "3",
      aspect: "9/16",
      fit: "contain",
      panelColor: "#E3DAF0",
      padding: "md",
      items: [
        { _key: key(), media: media("screen-1.svg", 900, 1800, "Sample home screen"), caption: "Home" },
        { _key: key(), media: media("screen-2.svg", 900, 1800, "Sample detail screen"), caption: "Detail" },
        { _key: key(), media: media("screen-3.svg", 900, 1800, "Sample form screen"), caption: "Form" },
        { _key: key(), media: media("screen-4.svg", 900, 1800, "Sample confirmation screen"), caption: "Confirmation" },
      ],
      settings: { width: "wide" },
    },

    heading("Outcome & reflection", "Report verified results if available; otherwise describe what the project produced and what you learned."),
    {
      _type: "textBlock",
      _key: key(),
      body: text("Close with what shipped (or what the project produced), what you would do differently, and what you learned about your own process."),
      settings: { width: "narrow" },
    },
    {
      _type: "quoteBlock",
      _key: key(),
      quote: "A reflective line or a verified quote from a collaborator works well here.",
      attribution: "Name",
      role: "Role, with permission",
      style: "serif",
      settings: { width: "narrow" },
    },
  ],
  showToc: true,
  showProgress: true,
  showNext: true,
};

/* ── 2. Layout block showcase ───────────────────────────── */

const showcase: Project = {
  _id: "sample-blocks",
  isSample: true,
  title: "Layout block showcase",
  slug: "layout-blocks",
  summary: "Every page-builder block in one place — mix and match them in Sanity.",
  subtitle: "Thirteen blocks, each with its own width, spacing, colour and animation settings.",
  projectType: "Web Design",
  cover: media("cover-blocks.svg", 1600, 2000, "Stacked layout blocks"),
  cardColor: "#F6E7B8",
  cardAspect: "4/5",
  cardFit: "cover",
  heroStyle: "title-first",
  heroWidth: "wide",
  heroAspect: "21/9",
  heroFit: "cover",
  heroMedia: media("cover-blocks.svg", 1600, 2000, "Stacked layout blocks"),
  titleAlign: "center",
  titleSize: "xl",
  accentColor: "#E0702B",
  meta: [
    { _key: key(), label: "Blocks", value: "13" },
    { _key: key(), label: "Widths", value: "Text · Content · Wide · Full" },
    { _key: key(), label: "Edit in", value: "Sanity Studio" },
  ],
  sections: [
    heading("Text", "Section headings, rich text, quotes and callouts.", "Rich text supports headings, lead paragraphs, lists, links, highlights and inline images."),
    {
      _type: "textBlock",
      _key: key(),
      size: "display",
      body: text("Display text is set in the serif for moments that deserve emphasis."),
      settings: { width: "narrow", spaceTop: "sm" },
    },
    {
      _type: "textBlock",
      _key: key(),
      columns: "2",
      body: text(
        ["h3", "Two-column text"],
        "Long passages can flow across two columns on wide screens and collapse to a single column on smaller screens, keeping line lengths comfortable to read.",
        "Use it for research summaries, longer context or anything that benefits from a denser, editorial layout.",
        ["h4", "Rich text supports"],
        { list: ["Bullet and numbered lists", "Links, bold, italic and highlights", "Lead paragraphs and quotes", "Inline images with captions"] },
      ),
      settings: { width: "default" },
    },
    {
      _type: "quoteBlock",
      _key: key(),
      quote: "Pull quotes break up long reads and give important ideas room to breathe.",
      attribution: "Quote block",
      style: "pull",
      settings: { width: "narrow" },
    },
    {
      _type: "calloutBlock",
      _key: key(),
      label: "Callout · accent bar",
      body: text("Use callouts for insights, principles or takeaways."),
      style: "bar",
      settings: { width: "narrow" },
    },

    heading("Media", "Images, video, galleries, comparisons and embeds."),
    {
      _type: "mediaBlock",
      _key: key(),
      media: media("after.svg", 1600, 1000, "Example dashboard"),
      frame: "browser",
      panelColor: "#D6E4F0",
      padding: "lg",
      caption: "Browser frame on a coloured panel.",
      settings: { width: "wide", animation: "scale" },
    },
    {
      _type: "galleryBlock",
      _key: key(),
      layout: "masonry",
      columns: "3",
      aspect: "auto",
      items: [
        { _key: key(), media: media("cover-research.svg", 1600, 1000, "Affinity map") },
        { _key: key(), media: media("screen-2.svg", 900, 1800, "Phone screen"), panelColor: "#D8ECE3" },
        { _key: key(), media: media("wire-2.svg", 1200, 900, "Wireframe") },
        { _key: key(), media: media("cover-mobile.svg", 1600, 1600, "Phone mock-ups") },
        { _key: key(), media: media("wire-1.svg", 1200, 900, "Wireframe") },
      ],
      caption: "Masonry gallery.",
      settings: { width: "wide" },
    },
    {
      _type: "embedBlock",
      _key: key(),
      title: "Prototype embed",
      caption: "Embed blocks accept Figma prototypes, YouTube, Vimeo, Loom and other https:// URLs.",
      aspect: "16/9",
      settings: { width: "default" },
    },

    heading("Layout", "Split layouts, columns, cards, stats and dividers."),
    {
      _type: "textMediaBlock",
      _key: key(),
      eyebrow: "Text + media",
      heading: "Media on the left, sticky text",
      body: text("Choose the side, the ratio (1:1, 1:2, 2:1), vertical alignment, frame and background."),
      media: media("screen-1.svg", 900, 1800, "Phone screen"),
      mediaPosition: "left",
      ratio: "1:1",
      aspect: "4/5",
      fit: "contain",
      panelColor: "#E3DAF0",
      padding: "md",
      stickyText: true,
      settings: { width: "wide" },
    },
    {
      _type: "columnsBlock",
      _key: key(),
      ratio: "equal",
      aspect: "4/3",
      fit: "contain",
      panelColor: "#ECEAE4",
      dividers: true,
      columns: [
        { _key: key(), media: media("wire-1.svg", 1200, 900), heading: "Column one", body: text("Columns can hold media, a heading and rich text.") },
        { _key: key(), media: media("wire-2.svg", 1200, 900), heading: "Column two", body: text("Two to four columns, equal or weighted widths.") },
        { _key: key(), media: media("wire-3.svg", 1200, 900), heading: "Column three", body: text("Optional divider lines between them.") },
      ],
      settings: { width: "wide" },
    },
    {
      _type: "statsBlock",
      _key: key(),
      columns: "3",
      items: [
        { _key: key(), value: "00", label: "Example metric", description: "Only include figures you can substantiate." },
        { _key: key(), value: "0×", label: "Example metric", description: "Add a source in the footnote." },
        { _key: key(), value: "0%", label: "Example metric", description: "Or remove this block entirely." },
      ],
      footnote: "Placeholder values for demonstration only.",
      settings: { width: "default", background: "#16181C", tone: "light", spaceTop: "lg", spaceBottom: "lg" },
    },
    { _type: "dividerBlock", _key: key(), style: "dots", size: "md", settings: { width: "narrow" } },
    {
      _type: "textBlock",
      _key: key(),
      body: text("Every block can also become a full-width coloured band, be hidden without deleting it, or listed in the sidebar with a custom label."),
      settings: { width: "narrow", align: "center" },
    },
  ],
  showToc: true,
  showProgress: true,
  showNext: true,
};

/* ── 3. Mobile app (themed page) ─────────────────────────── */

const mobile: Project = {
  _id: "sample-mobile",
  isSample: true,
  title: "Mobile app concept",
  slug: "mobile-app-concept",
  summary: "A sample showing a fully themed page: custom background, text and accent colours.",
  subtitle: "Page-level colours, a full-bleed hero and a centred title — all set from the Studio.",
  projectType: "Mobile App",
  cover: media("cover-mobile.svg", 1600, 1600, "Two phone mock-ups"),
  cardColor: "#E3DAF0",
  cardAspect: "1/1",
  heroStyle: "media-first",
  heroWidth: "full",
  heroAspect: "21/9",
  heroFit: "contain",
  heroColor: "#E3DAF0",
  heroPadding: "md",
  titleAlign: "center",
  backgroundColor: "#16181C",
  textColor: "#EDEBE6",
  accentColor: "#B79CFF",
  meta: [
    { _key: key(), label: "Theme", value: "Dark page background" },
    { _key: key(), label: "Accent", value: "Lilac" },
  ],
  sections: [
    heading("Theming", "Each project can have its own colours.", "Set the page background, text colour and accent in the “Page design” tab."),
    {
      _type: "galleryBlock",
      _key: key(),
      layout: "grid",
      columns: "4",
      aspect: "9/16",
      fit: "contain",
      panelColor: "#24262B",
      padding: "sm",
      items: [
        { _key: key(), media: media("screen-1.svg", 900, 1800, "Sample screen") },
        { _key: key(), media: media("screen-2.svg", 900, 1800, "Sample screen") },
        { _key: key(), media: media("screen-3.svg", 900, 1800, "Sample screen") },
        { _key: key(), media: media("screen-4.svg", 900, 1800, "Sample screen") },
      ],
      settings: { width: "wide" },
    },
  ],
  showToc: false,
  showProgress: true,
  showNext: true,
};

/* ── 4. Research-led (minimal page) ──────────────────────── */

const research: Project = {
  _id: "sample-research",
  isSample: true,
  title: "Research-led redesign",
  slug: "research-led-redesign",
  summary: "A sample with a title-first header and a simple, text-led layout.",
  subtitle: "A lighter layout for research-heavy projects.",
  projectType: "UX Research",
  cover: media("cover-research.svg", 1600, 1000, "Affinity map of sticky notes"),
  cardColor: "#D8ECE3",
  cardAspect: "16/10",
  heroStyle: "title-first",
  heroAspect: "16/10",
  meta: [
    { _key: key(), label: "Methods", value: "List only methods you used" },
    { _key: key(), label: "Participants", value: "If applicable" },
  ],
  sections: [
    heading("Synthesis", "From notes to themes."),
    {
      _type: "textBlock",
      _key: key(),
      body: text(
        ["lead", "Lead paragraphs introduce a section with a little more presence."],
        "Regular paragraphs carry the detail. Keep them short, specific and backed by evidence.",
        { list: ["Theme one", "Theme two", "Theme three"], type: "number" },
      ),
      settings: { width: "narrow" },
    },
    {
      _type: "quoteBlock",
      _key: key(),
      quote: "Sticky-note quotes are a nice way to share anonymised participant feedback.",
      attribution: "Participant",
      style: "note",
      settings: { width: "narrow" },
    },
  ],
  showToc: true,
  showProgress: true,
  showNext: true,
};

export const sampleProjects: Project[] = [template, showcase, mobile, research];
