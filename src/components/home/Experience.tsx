import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type PointStyle = "square" | "number" | "rule" | "arrow";

interface Role {
  company: string;
  location?: string;
  role: string;
  period: string;
  summary: string;
  points: readonly string[];
}

/** One role's highlighted points, with the chosen marker style. */
function Points({ items, style }: { items: readonly string[]; style: PointStyle }) {
  if (items.length === 0) return null;

  if (style === "rule") {
    return (
      <ul className="mt-5 max-w-[62ch] divide-y divide-line border-y border-line text-[15.5px] leading-relaxed text-muted">
        {items.map((p) => (
          <li key={p} className="py-2.5">
            {p}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="mt-4 grid max-w-[62ch] gap-2 text-[15.5px] leading-relaxed text-muted">
      {items.map((p, i) => (
        <li key={p} className={cn("relative", style === "number" ? "pl-8" : style === "arrow" ? "pl-6" : "pl-5")}>
          {style === "square" && <span aria-hidden className="absolute left-0 top-[0.66em] size-[5px] bg-accent" />}
          {style === "number" && (
            <span aria-hidden className="absolute left-0 top-[0.2em] font-mono text-[12px] text-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          {style === "arrow" && (
            <span aria-hidden className="absolute left-0 text-subtle">
              →
            </span>
          )}
          {p}
        </li>
      ))}
    </ul>
  );
}

/** Always-open experience list: dates, role, summary and the strongest points, no clicks. */
export function Experience({ roles, pointsPerRole, pointStyle }: { roles: readonly Role[]; pointsPerRole: number; pointStyle: PointStyle }) {
  return (
    <ol>
      {roles.map((r, i) => (
        <Reveal
          as="li"
          key={r.company}
          delay={i * 0.05}
          className="grid gap-x-6 gap-y-2 border-t border-line py-8 md:grid-cols-[11rem_1fr] md:py-10"
        >
          <p className="font-mono text-[12.5px] leading-7 text-subtle">{r.period}</p>
          <div>
            <h3 className="text-[18px] leading-snug text-ink">
              {r.company}
              {r.location && <span className="text-subtle"> · {r.location}</span>}
            </h3>
            <p className="mt-0.5 text-[15px] text-muted">{r.role}</p>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-ink/85">{r.summary}</p>
            <Points items={r.points.slice(0, pointsPerRole)} style={pointStyle} />
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
