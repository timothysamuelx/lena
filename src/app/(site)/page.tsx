import { draftMode } from "next/headers";
import { Suspense } from "react";

import { Contact } from "@/components/home/Contact";
import { ExperienceList } from "@/components/home/ExperienceList";
import { Hero } from "@/components/home/Hero";
import { Section, SectionHeader } from "@/components/home/SectionHeader";
import { WorkGrid } from "@/components/home/WorkGrid";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SideNav } from "@/components/site/SideNav";
import { site } from "@/content/site";
import { getFeaturedProjects } from "@/lib/data";
import { getDynamicFetchOptions, publishedOptions, type FetchOptions } from "@/sanity/live";

async function Work({ options }: { options: FetchOptions }) {
  const projects = await getFeaturedProjects(options);
  return <WorkGrid projects={projects} />;
}

async function DraftWork() {
  return <Work options={await getDynamicFetchOptions()} />;
}

export default async function HomePage() {
  const { isEnabled: isDraft } = await draftMode();

  return (
    <>
      <Header />
      <SideNav items={[...site.nav]} />
      <div className="guides" aria-hidden>
        <div />
      </div>

      <main className="relative z-10">
        <Hero />

        <Section id="work">
          <SectionHeader index="01" title={site.work.title} intro={site.work.intro} />
          {isDraft ? (
            <Suspense fallback={<div className="h-96" />}>
              <DraftWork />
            </Suspense>
          ) : (
            <Work options={publishedOptions} />
          )}
        </Section>

        <Section id="experience">
          <SectionHeader index="02" title={site.experience.title} intro={site.experience.intro} />
          <ExperienceList roles={site.experience.roles} />
        </Section>

        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
