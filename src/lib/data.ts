import { stegaClean } from "next-sanity";

import { sampleProjects } from "@/content/samples";
import type { Project, ProjectCard } from "@/lib/types";
import { isSanityConfigured } from "@/sanity/env";
import { cachedSanity, publishedOptions, type FetchOptions } from "@/sanity/live";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY, PROJECTS_QUERY } from "@/sanity/queries";

function toCard(project: Project): ProjectCard {
  const { _id, title, slug, summary, projectType, year, featured, cover, cardColor, cardAspect, cardFit, cardPadding, cardCursor, externalUrl, isSample } = project;
  return { _id, title, slug, summary, projectType, year, featured, cover, cardColor, cardAspect, cardFit, cardPadding, cardCursor, externalUrl, isSample };
}

/** All projects in Studio order (drag & drop in the Projects list). */
export async function getProjects(options: FetchOptions = publishedOptions): Promise<ProjectCard[]> {
  if (!isSanityConfigured) return sampleProjects.map(toCard);

  const { data } = await cachedSanity({ query: PROJECTS_QUERY, ...options });
  return ((data ?? []) as ProjectCard[]).map((p) => ({ ...p, slug: stegaClean(p.slug) }));
}

/** Projects marked "Show on home page". */
export async function getFeaturedProjects(options?: FetchOptions) {
  const projects = await getProjects(options);
  return projects.filter((p) => stegaClean(p.featured) !== false);
}

export async function getProject(slug: string, options: FetchOptions = publishedOptions): Promise<Project | null> {
  if (!isSanityConfigured) {
    const index = sampleProjects.findIndex((p) => p.slug === slug);
    if (index === -1) return null;
    const project = sampleProjects[index];
    const next = sampleProjects[(index + 1) % sampleProjects.length];
    return { ...project, next: project.showNext === false || next.slug === slug ? null : toCard(next) };
  }

  const [{ data }, all] = await Promise.all([
    cachedSanity({ query: PROJECT_QUERY, params: { slug }, ...options }),
    getProjects(options),
  ]);
  const project = data as Project | null;
  if (!project) return null;

  project.slug = stegaClean(project.slug);
  if (project.next) {
    project.next.slug = stegaClean(project.next.slug);
  } else if (stegaClean(project.showNext) !== false && all.length > 1) {
    // Default: the next project in Studio order (wrapping around).
    const index = all.findIndex((p) => p.slug === project.slug);
    project.next = all[(index + 1) % all.length] ?? null;
  }
  return project;
}

export async function getProjectSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return sampleProjects.map((p) => p.slug);

  const { data } = await cachedSanity({ query: PROJECT_SLUGS_QUERY, ...publishedOptions });
  return ((data ?? []) as { slug: string }[]).map((p) => p.slug);
}
