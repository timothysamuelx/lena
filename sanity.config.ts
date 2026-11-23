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
import { schemaTypes, singletonTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "nandun-portfolio",
  title: "Nandun Perera — Portfolio",
  basePath: studioBasePath,
  projectId: resolvedProjectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons can't be created from the global "+" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
      resolve: {
        mainDocuments: defineDocuments([
          { route: "/work/:slug", filter: `_type == "project" && slug.current == $slug` },
          { route: "/photography", filter: `_type == "photography"` },
          { route: "/", filter: `_type == "profile"` },
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
          photography: defineLocations({
            message: "Photos appear on the photography page",
            locations: [{ title: "Photography", href: "/photography" }],
          }),
          profile: defineLocations({
            message: "The portrait appears in the home page hero",
            locations: [{ title: "Home", href: "/" }],
          }),
        },
      },
    }),
    colorInput(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Projects are the only listable type; Photography and Profile are singletons.
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId === "project"),
    // Singletons can only be edited and published, never duplicated or deleted.
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : prev,
  },
});
