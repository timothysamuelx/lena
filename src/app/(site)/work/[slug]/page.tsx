import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { NextProject, ProjectHero, ProjectIntro, themeStyle } from "@/components/project/ProjectParts";
import { ReadingProgress } from "@/components/project/ReadingProgress";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SideNav } from "@/components/site/SideNav";
import { getProject, getProjectSlugs } from "@/lib/data";
import { buildToc } from "@/lib/toc";
import { clean, cn } from "@/lib/utils";
import { imageBuilder } from "@/sanity/image";
import { getDynamicFetchOptions, publishedOptions, type FetchOptions } from "@/sanity/live";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  // Cache Components requires at least one param; unknown slugs render a 404.
  return (slugs.length ? slugs : ["__placeholder"]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const title = clean(project.seoTitle) || clean(project.title);
  const description = clean(project.seoDescription) || clean(project.summary) || clean(project.subtitle);
  const share = project.ogImage?.asset?._ref ? project.ogImage : project.cover?.image;
  const image = share?.asset?._ref
    ? imageBuilder.image(share).width(1200).height(630).fit("crop").auto("format").url()
    : share?.asset?.url;
  return {
    title,
    description,
    openGraph: { title, description, images: image ? [{ url: image, width: 1200, height: 630 }] : undefined },
  };
}

export default function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  // Known slugs are fully prerendered at build time (see generateStaticParams);
  // the boundary lets new or draft content stream in without blocking navigation.
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: Pick<PageProps<"/work/[slug]">, "params">) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const options = isDraft ? await getDynamicFetchOptions() : publishedOptions;
  return <ProjectView slug={slug} options={options} />;
}

async function ProjectView({ slug, options }: { slug: string; options: FetchOptions }) {
  const project = await getProject(slug, options);
  if (!project) notFound();

  const { items, ids } = buildToc(project.sections);
  const showToc = clean(project.showToc) !== false && items.length > 0;
  const titleFirst = clean(project.heroStyle) === "title-first";
  const theme = themeStyle(project);

  return (
    <div className={cn("min-h-screen bg-bg text-ink transition-colors duration-500", showToc && "has-rail", theme.className)} style={theme.style}>
      <Header crumb={clean(project.title)} />
      {clean(project.showProgress) !== false && <ReadingProgress />}
      {showToc && <SideNav items={items} title="Contents" />}

      <main className="relative pb-16 pt-[calc(var(--header-h)+8vh)] md:pt-[calc(var(--header-h)+12vh)]">
        {titleFirst ? (
          <>
            <ProjectIntro project={project} />
            <div className="mt-14 md:mt-20">
              <ProjectHero project={project} />
            </div>
          </>
        ) : (
          <>
            <ProjectHero project={project} />
            <div className="mt-12 md:mt-16">
              <ProjectIntro project={project} />
            </div>
          </>
        )}

        <BlockRenderer blocks={project.sections} ids={ids} />
      </main>

      {project.next && <NextProject next={project.next} />}
      <Footer />
    </div>
  );
}
