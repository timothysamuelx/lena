import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { ArrowIcon, Button } from "@/components/site/Button";
import { site } from "@/content/site";

import { HeroSelection } from "./HeroSelection";

export function Hero() {
  const { hero } = site;
  return (
    <section id="about" className="relative">
      <div className="wrap w-default pb-20 pt-[calc(var(--header-h)+12vh)] md:pb-28 md:pt-[calc(var(--header-h)+16vh)]">
        <Reveal animation="fade" duration={1.2}>
          <p className="mb-7 flex items-center gap-2.5 text-[15px] text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {site.name} <span className="text-subtle">—</span> {site.role}
          </p>
        </Reveal>

        <WordReveal
          text={hero.headline}
          delay={0.15}
          className="max-w-[17ch] text-balance font-serif text-[clamp(2.6rem,6.4vw,5rem)] font-[370] leading-[1.04] tracking-[-0.032em] text-ink"
          highlightWord={hero.highlight}
          highlight={<HeroSelection>{hero.highlight}</HeroSelection>}
        />

        <Reveal delay={0.55} className="mt-10 max-w-[60ch]">
          <p className="text-[17px] leading-[1.7] text-muted md:text-[18px]">{hero.intro}</p>
        </Reveal>

        <Reveal delay={0.7} className="mt-10 flex flex-wrap items-center gap-4">
          <Button href={hero.ctas.primary.href} icon={<ArrowIcon direction="down" />}>
            {hero.ctas.primary.label}
          </Button>
          <Button href={hero.ctas.secondary.href} variant="secondary">
            {hero.ctas.secondary.label}
          </Button>
        </Reveal>

        <Reveal delay={0.85} className="mt-16 grid gap-8 text-[15px] leading-[1.5] sm:grid-cols-2 md:mt-20 md:grid-cols-[auto_auto_1fr] md:gap-14">
          {hero.snapshot.map((item) => (
            <div key={item.label}>
              <p className="mb-1.5 text-subtle">{item.label}</p>
              <p className="whitespace-pre-line text-ink/80">{item.value}</p>
            </div>
          ))}
          <div className="sm:col-span-2 md:col-span-1">
            <p className="mb-1.5 text-subtle">Focus</p>
            <ul className="flex flex-wrap gap-x-2 gap-y-1 text-ink/80">
              {hero.specialisms.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  {s}
                  {i < hero.specialisms.length - 1 && <span className="text-subtle/70">·</span>}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
