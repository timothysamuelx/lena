import Link from "next/link";

import { MediaFrame } from "@/components/media/MediaFrame";
import { Reveal } from "@/components/motion/Reveal";
import type { ProjectCard as ProjectCardData } from "@/lib/types";
import { clean } from "@/lib/utils";

export function ProjectCard({ project, priority, order }: { project: ProjectCardData; priority?: boolean; order: number }) {
  const external = clean(project.externalUrl);
  const href = external || `/work/${project.slug}`;
  const meta = [project.projectType, project.year].filter(Boolean).join(" ");
  const label = project.cardCursor || (external ? "Visit site" : "View case study");

  const body = (
    <>
      <MediaFrame
        media={project.cover}
        aspect={project.cardAspect || "4/3"}
        fit={project.cardFit}
        panelColor={project.cardColor}
        padding={project.cardPadding}
        sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
        priority={priority}
        mediaClassName="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.035]"
        boxClassName="transition-[border-radius] duration-500"
      />
      <div className="mt-3.5 flex flex-wrap items-baseline gap-x-2 text-[15px] leading-snug">
        <span className="text-ink">{project.title}</span>
        {meta && (
          <>
            <span className="text-subtle/60">/</span>
            <span className="text-subtle">{meta}</span>
          </>
        )}
      </div>
      {project.summary && <p className="mt-1 max-w-[48ch] text-[14.5px] leading-relaxed text-muted">{project.summary}</p>}
    </>
  );

  return (
    <Reveal className="max-md:![order:var(--order)]" style={{ "--order": order } as React.CSSProperties}>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className="group block" data-cursor={label}>
          {body}
        </a>
      ) : (
        <Link href={href} className="group block" data-cursor={label}>
          {body}
        </Link>
      )}
    </Reveal>
  );
}
