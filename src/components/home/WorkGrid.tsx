import type { ProjectCard as ProjectCardData } from "@/lib/types";
import { clean } from "@/lib/utils";

import { ProjectCard } from "./ProjectCard";

function ratioOf(aspect?: string) {
  const [w, h] = (clean(aspect) || "4/3").split("/").map(Number);
  return w && h ? w / h : 4 / 3;
}

/**
 * Two-column staggered grid. Cards are placed greedily into the shorter column
 * (by aspect ratio) so mixed card shapes interlock. On mobile the columns
 * dissolve (`display: contents`) and CSS `order` restores the original order.
 */
export function WorkGrid({ projects }: { projects: ProjectCardData[] }) {
  if (projects.length === 0) {
    return (
      <div className="grid place-items-center rounded-md border border-dashed border-line-strong px-6 py-20 text-center">
        <div className="space-y-2">
          <p className="font-serif text-2xl text-ink">Projects coming soon</p>
          <p className="text-[15px] text-muted">Add a project in the Studio to see it here.</p>
        </div>
      </div>
    );
  }

  const columns: { project: ProjectCardData; index: number }[][] = [[], []];
  const heights = [0, 0];
  projects.forEach((project, index) => {
    const col = heights[0] <= heights[1] + 0.05 ? 0 : 1;
    columns[col].push({ project, index });
    heights[col] += 1 / ratioOf(project.cardAspect) + 0.22; // + caption
  });

  return (
    <div className="flex flex-col gap-12 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-0 lg:gap-x-6">
      {columns.map((column, c) => (
        <div key={c} className="contents md:flex md:flex-col md:gap-14">
          {column.map(({ project, index }) => (
            <ProjectCard key={project._id} project={project} order={index} priority={index < 2} />
          ))}
        </div>
      ))}
    </div>
  );
}
