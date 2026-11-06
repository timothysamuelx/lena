import Link from "next/link";

import { MediaFrame } from "@/components/media/MediaFrame";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { ArrowIcon } from "@/components/site/Button";
import { SelectionHandles } from "@/components/site/Selection";
import { hasMedia } from "@/lib/media";
import type { Project, ProjectCard } from "@/lib/types";
import { clean, cn, color, isDark } from "@/lib/utils";

/** Page-level colour overrides from the Studio ("Page design" tab). */
export function themeStyle(project: Project): { style: React.CSSProperties; className: string } {
  const bg = color(project.backgroundColor);
  const fg = color(project.textColor);
  const accent = color(project.accentColor);
  const style: Record<string, string> = {};
  let className = "";
  if (bg) {
    style["--bg"] = bg;
    style["--surface"] = `color-mix(in oklab, ${bg} 92%, white)`;
    if (!fg) className = isDark(bg) ? "tone-light" : "tone-dark";
  }
  if (fg) {
    style["--ink"] = fg;
    style["--muted"] = `color-mix(in oklab, ${fg} 66%, transparent)`;
    style["--subtle"] = `color-mix(in oklab, ${fg} 44%, transparent)`;
    style["--line"] = `color-mix(in oklab, ${fg} 12%, transparent)`;
    style["--line-strong"] = `color-mix(in oklab, ${fg} 20%, transparent)`;
    style["--panel"] = `color-mix(in oklab, ${fg} 7%, transparent)`;
  }
  if (accent) {
    style["--accent"] = accent;
    style["--accent-ink"] = accent;
  }
  return { style: style as React.CSSProperties, className };
}

export function ProjectHero({ project }: { project: Project }) {
  const style = clean(project.heroStyle) ?? "media-first";
  const media = hasMedia(project.heroMedia) ? project.heroMedia : project.cover;
  if (style === "none" || !hasMedia(media)) return null;
  const width = clean(project.heroWidth) ?? "default";
  const full = width === "full";

  return (
    <div data-bleed={full ? "" : undefined} className={cn("wrap", width === "wide" ? "w-wide" : full ? "max-w-none !px-0" : "w-default")}>
      <Reveal animation="reveal">
        <MediaFrame
          media={media}
          aspect={project.heroAspect || "16/9"}
          fit={project.heroFit}
          panelColor={project.heroColor ?? project.cardColor}
          padding={project.heroPadding}
          rounded={!full}
          priority
          sizes={full ? "100vw" : "(min-width: 1280px) 1200px, 100vw"}
        />
      </Reveal>
    </div>
  );
}

const titleSize = {
  md: "text-[2.25rem] md:text-[2.75rem]",
  lg: "text-[2.5rem] md:text-[3.5rem]",
  xl: "text-[2.75rem] md:text-[5rem]",
};

export function ProjectIntro({ project }: { project: Project }) {
  const center = clean(project.titleAlign) === "center";
  const size = clean(project.titleSize) ?? "lg";
  const eyebrow = [project.projectType, project.year].filter(Boolean).join(" · ");
  const meta = (project.meta ?? []).filter((m) => m.label || m.value);

  return (
    <header className={cn("wrap w-narrow", center && "text-center")}>
      {project.isSample && (
        <Reveal animation="fade">
          <p className={cn("mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-[12.5px] text-muted")}>
            <span className="size-1.5 rounded-full bg-accent" />
            Sample content — replace it by adding projects in Sanity Studio
          </p>
        </Reveal>
      )}
      {eyebrow && (
        <Reveal animation="fade">
          <p className="mb-4 text-[15px] text-subtle">{eyebrow}</p>
        </Reveal>
      )}
      <WordReveal
        text={project.title}
        stagger={0.05}
        className={cn("text-balance font-serif font-[370] leading-[1.06] tracking-[-0.03em] text-ink", titleSize[size])}
      />
      {project.subtitle && (
        <Reveal delay={0.25}>
          <p className={cn("mt-5 max-w-[40ch] text-balance font-serif text-[1.375rem] font-[340] leading-[1.35] text-muted md:text-[1.625rem]", center && "mx-auto")}>
            {project.subtitle}
          </p>
        </Reveal>
      )}
      {meta.length > 0 && (
        <Reveal delay={0.35}>
          <dl className={cn("mt-10 grid grid-cols-2 gap-x-8 gap-y-6 text-[15px] sm:grid-cols-3", meta.length === 4 && "sm:grid-cols-4", center && "text-left sm:text-center")}>
            {meta.map((m) => (
              <div key={m._key}>
                <dt className="mb-1.5 text-subtle">{m.label}</dt>
                <dd className="whitespace-pre-line leading-relaxed text-ink/85">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}
      <Reveal delay={0.4}>
        <hr className="mt-12 border-line md:mt-16" />
      </Reveal>
    </header>
  );
}

export function NextProject({ next }: { next: ProjectCard }) {
  const external = clean(next.externalUrl);
  const href = external || `/work/${next.slug}`;
  const meta = [next.projectType, next.year].filter(Boolean).join(" · ");
  const inner = (
    <>
      <div className="flex flex-col justify-between gap-8">
        <div>
          <p className="mb-4 text-[15px] text-subtle">Next project</p>
          <p className="text-balance font-serif text-[2.25rem] font-[370] leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.25rem]">{next.title}</p>
          {meta && <p className="mt-3 text-[15px] text-subtle">{meta}</p>}
        </div>
        <span className="relative inline-flex h-11 w-fit items-center gap-2 bg-ink/[0.06] px-5 text-[15px] text-ink transition-colors group-hover:bg-ink/[0.09]">
          View case study <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
          <SelectionHandles />
        </span>
      </div>
      <MediaFrame
        media={next.cover}
        aspect="16/10"
        fit={next.cardFit}
        panelColor={next.cardColor}
        padding={next.cardPadding}
        sizes="(min-width: 768px) 50vw, 100vw"
        mediaClassName="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.035]"
      />
    </>
  );
  const className = "group grid gap-8 md:grid-cols-2 md:items-stretch md:gap-12";
  return (
    <section className="border-t border-line">
      <Reveal className="wrap w-default py-20 md:py-28">
        {external ? (
          <a href={href} target="_blank" rel="noreferrer" className={className} data-cursor="Next project">
            {inner}
          </a>
        ) : (
          <Link href={href} className={className} data-cursor="Next project">
            {inner}
          </Link>
        )}
      </Reveal>
    </section>
  );
}
