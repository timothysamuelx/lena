import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export function Skills() {
  return (
    <div className="grid gap-12 md:grid-cols-3 md:gap-8">
      {site.skills.groups.map((group, g) => (
        <Reveal key={group.title} delay={g * 0.08}>
          <h3 className="mb-4 text-[15px] text-subtle">{group.title}</h3>
          <ul className="border-b border-line">
            {group.items.map((item) => (
              <li key={item} className="flex items-center justify-between border-t border-line py-3 text-[15.5px] text-ink/85">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
