/** Called by the Presentation tool to preview drafts on the live site. */
import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { client } from "@/sanity/client";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
