import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { Gallery } from "@/components/photography/Gallery";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { site } from "@/content/site";
import { getPhotography } from "@/lib/data";
import { getDynamicFetchOptions, publishedOptions, type FetchOptions } from "@/sanity/live";

export const metadata: Metadata = {
  title: site.photography.title,
  description: site.photography.intro,
};

async function Photos({ options }: { options: FetchOptions }) {
  const { photos } = await getPhotography(options);
  return <Gallery photos={photos} />;
}

async function DraftPhotos() {
  return <Photos options={await getDynamicFetchOptions()} />;
}

export default async function PhotographyPage() {
  const { isEnabled: isDraft } = await draftMode();
  const { title, intro } = site.photography;

  return (
    <>
      <Header crumb={title} back={{ href: "/", label: "Home" }} />

      <main className="relative z-10 pb-20 pt-[calc(var(--header-h)+8vh)] md:pb-28 md:pt-[calc(var(--header-h)+12vh)]">
        <header className="wrap w-wide">
          <WordReveal
            text={title}
            className="font-serif text-[clamp(2.6rem,6.4vw,5rem)] font-[370] leading-[1.04] tracking-[-0.032em] text-ink"
          />
          <Reveal delay={0.3} className="mt-6 max-w-[54ch] md:mt-8">
            <p className="text-[17px] leading-[1.7] text-muted md:text-[18px]">{intro}</p>
          </Reveal>
        </header>

        <div className="wrap w-wide mt-14 md:mt-20">
          {isDraft ? (
            <Suspense fallback={<div className="h-96" />}>
              <DraftPhotos />
            </Suspense>
          ) : (
            <Photos options={publishedOptions} />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
