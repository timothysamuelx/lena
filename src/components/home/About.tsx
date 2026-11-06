import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export function About() {
  const { about } = site;
  return (
    <div className="grid gap-10 md:grid-cols-[11rem_1fr] md:gap-6">
      <Reveal>
        <h2 className="text-[15px] text-subtle md:sticky md:top-28">{about.title}</h2>
      </Reveal>
      <div>
        <Reveal>
          <p className="text-balance font-serif text-[1.625rem] font-[340] leading-[1.32] tracking-[-0.015em] text-ink md:text-[2.125rem]">{about.lead}</p>
        </Reveal>
        <div className="mt-8 max-w-[62ch] space-y-5">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="text-[17px] leading-[1.7] text-muted">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Education() {
  const { education } = site;
  return (
    <div className="grid gap-10 md:grid-cols-[11rem_1fr] md:gap-6">
      <Reveal>
        <h2 className="text-[15px] text-subtle md:sticky md:top-28">{education.title}</h2>
      </Reveal>
      <ol className="border-b border-line">
        {education.items.map((item, i) => (
          <Reveal as="li" key={item.school} delay={i * 0.06} className="grid gap-x-6 gap-y-2 border-t border-line py-7 md:grid-cols-[1fr_9rem]">
            <div>
              <p className="text-[18px] leading-snug text-ink">{item.degree}</p>
              <p className="mt-0.5 text-[15px] text-muted">
                {item.school} <span className="text-subtle">· {item.location}</span>
              </p>
              {item.body && <p className="mt-3 max-w-[60ch] text-[15.5px] leading-relaxed text-muted">{item.body}</p>}
              {item.modules.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.modules.map((m) => (
                    <li key={m} className="rounded-full border border-line-strong px-3 py-1 text-[13px] text-ink/75">
                      {m}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="font-mono text-[12.5px] leading-6 text-subtle md:order-first md:col-start-2 md:row-start-1 md:text-right">{item.period}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
