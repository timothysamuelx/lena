import { createClient } from "next-sanity";

import { apiVersion, dataset, resolvedProjectId, studioBasePath } from "./env";

export const client = createClient({
  projectId: resolvedProjectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: { studioUrl: studioBasePath },
});
