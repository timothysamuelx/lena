import { defineQuery } from "next-sanity";

/*
 * Assets are not dereferenced here: image and file refs encode everything
 * needed to build CDN URLs (see `src/sanity/image.ts`), which keeps the
 * queries tiny and lets editors add any block without touching GROQ.
 */

const cardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  summary,
  projectType,
  year,
  featured,
  cover,
  cardColor,
  cardAspect,
  cardFit,
  cardPadding,
  cardCursor,
  externalUrl
`;

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(orderRank asc, _createdAt desc) { ${cardFields} }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ...,
    "slug": slug.current,
    "next": select(showNext == false => null, nextProject->{ ${cardFields} })
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`);
