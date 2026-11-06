/**
 * Option lists shared by the schema and the front-end renderers, so the
 * values editors pick in the Studio always map to real styles in the site.
 */

type Option<V extends string = string> = { title: string; value: V };

const list = <V extends string>(items: Option<V>[]) => items;

export const widthOptions = list([
  { title: "Text column", value: "narrow" },
  { title: "Content", value: "default" },
  { title: "Wide", value: "wide" },
  { title: "Full bleed", value: "full" },
]);

export const spaceOptions = list([
  { title: "None", value: "none" },
  { title: "S", value: "sm" },
  { title: "M", value: "md" },
  { title: "L", value: "lg" },
  { title: "XL", value: "xl" },
]);

export const alignOptions = list([
  { title: "Left", value: "left" },
  { title: "Center", value: "center" },
]);

export const toneOptions = list([
  { title: "Auto", value: "auto" },
  { title: "Dark text", value: "dark" },
  { title: "Light text", value: "light" },
]);

export const animationOptions = list([
  { title: "Fade up", value: "fadeUp" },
  { title: "Fade", value: "fade" },
  { title: "Scale in", value: "scale" },
  { title: "Reveal (wipe)", value: "reveal" },
  { title: "None", value: "none" },
]);

export const aspectOptions = list([
  { title: "Original", value: "auto" },
  { title: "21:9", value: "21/9" },
  { title: "16:9", value: "16/9" },
  { title: "16:10", value: "16/10" },
  { title: "3:2", value: "3/2" },
  { title: "4:3", value: "4/3" },
  { title: "1:1", value: "1/1" },
  { title: "4:5", value: "4/5" },
  { title: "3:4", value: "3/4" },
  { title: "9:16", value: "9/16" },
]);

export const fitOptions = list([
  { title: "Fill (crop)", value: "cover" },
  { title: "Fit (no crop)", value: "contain" },
]);

export const paddingOptions = list([
  { title: "None", value: "none" },
  { title: "S", value: "sm" },
  { title: "M", value: "md" },
  { title: "L", value: "lg" },
]);

export const frameOptions = list([
  { title: "None", value: "none" },
  { title: "Panel (coloured background)", value: "panel" },
  { title: "Browser window", value: "browser" },
  { title: "Phone", value: "phone" },
]);

export const columnsOptions = list([
  { title: "1", value: "1" },
  { title: "2", value: "2" },
  { title: "3", value: "3" },
  { title: "4", value: "4" },
]);

export const gapOptions = list([
  { title: "S", value: "sm" },
  { title: "M", value: "md" },
  { title: "L", value: "lg" },
]);

/** Soft swatches offered by every colour picker. */
export const colorPresets = [
  { title: "Paper", value: "#F4F3EF" },
  { title: "Fog", value: "#E7E9EC" },
  { title: "Sky", value: "#D6E4F0" },
  { title: "Mint", value: "#D8ECE3" },
  { title: "Butter", value: "#F6E7B8" },
  { title: "Peach", value: "#F6D9C8" },
  { title: "Lilac", value: "#E3DAF0" },
  { title: "Rose", value: "#F3D7DC" },
  { title: "Slate", value: "#3B4350" },
  { title: "Ink", value: "#16181C" },
  { title: "Cobalt", value: "#1F3B8F" },
  { title: "Selection blue", value: "#0D99FF" },
];
