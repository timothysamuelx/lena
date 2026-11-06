export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01";

/**
 * When no project ID is configured the site falls back to the bundled sample
 * projects in `src/content/samples.ts`, so it can be previewed (and deployed)
 * before Sanity is connected.
 */
export const isSanityConfigured = /^[-a-z0-9]+$/.test(projectId);

/** Used to build CDN URLs and to satisfy the client when unconfigured. */
export const resolvedProjectId = isSanityConfigured ? projectId : "unconfigured";

export const studioBasePath = "/studio";
