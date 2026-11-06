import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { getProjects } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  return [
    { url: site.url, priority: 1 },
    ...projects.filter((p) => !p.externalUrl).map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.8 })),
  ];
}
