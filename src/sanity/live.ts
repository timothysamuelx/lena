import { cookies, draftMode } from "next/headers";
import {
  defineLive,
  resolvePerspectiveFromCookies,
  resolveVariantFromCookies,
  type LivePerspective,
  type StrictDefinedFetchType,
} from "next-sanity/live";

import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN || false;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  strict: true,
});

/**
 * The app's single shared `'use cache'` boundary for Sanity queries.
 * `sanityFetch` tags each result so <SanityLive /> can revalidate it precisely.
 */
export const cachedSanity: StrictDefinedFetchType = async (options) => {
  "use cache";
  return sanityFetch(options);
};

export interface FetchOptions {
  perspective: LivePerspective;
  variant?: string;
  stega: boolean;
}

export const publishedOptions: FetchOptions = {
  perspective: "published",
  stega: false,
};

/** Resolve request-time values (draft mode, perspective cookies) outside caches. */
export async function getDynamicFetchOptions(): Promise<FetchOptions> {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return publishedOptions;

  const jar = await cookies();
  const perspective = await resolvePerspectiveFromCookies({ cookies: jar });
  const variant = await resolveVariantFromCookies({ cookies: jar });
  return { perspective: perspective ?? "drafts", variant, stega: true };
}
