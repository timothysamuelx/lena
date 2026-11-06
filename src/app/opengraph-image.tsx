import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share card (case studies can override it in Sanity). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f4f3ef",
          color: "#1e232a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: "#6b6f75" }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#0d99ff" }} />
          {site.name} — {site.role}
        </div>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>{site.hero.headline}</div>
        <div style={{ display: "flex", fontSize: 26, color: "#6b6f75" }}>{site.hero.specialisms.join("  ·  ")}</div>
      </div>
    ),
    size,
  );
}
