"use client";

/**
 * Sanity Studio, embedded in the site at /studio.
 * Projects are fully editable here: text, media, layout, colours and order.
 */
import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { defineDocuments, defineLocations, presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, resolvedProjectId, studioBasePath } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "nandun-portfolio",
  title: "Nandun Perera — Portfolio",
  basePath: studioBasePath,
  projectId: resolvedProjectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
      resolve: {
        mainDocuments: defineDocuments([
          { route: "/work/:slug", filter: `_type == "project" && slug.current == $slug` },
        ]),
        locations: {
          project: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                { title: doc?.title || "Untitled", href: `/work/${doc?.slug}` },
                { title: "Home", href: "/" },
              ],
            }),
          }),
        },
      },
    }),
    colorInput(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Projects are the only document type; hide "create" for anything else.
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId === "project"),
  },
});
