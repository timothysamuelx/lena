import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/site/Button";
import { site } from "@/content/site";

export function Contact() {
  const { contactSection, contact } = site;
  const socials = [
    { label: "LinkedIn", href: contact.linkedin },
    { label: "Dribbble", href: contact.dribbble },
  ].filter((s) => s.href);

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div className="wrap w-default py-24 md:py-40">
        <Reveal animation="reveal">
          <h2 className="font-serif text-[clamp(3.5rem,11vw,8.75rem)] font-[350] leading-[0.95] tracking-[-0.04em] text-ink">
            {contactSection.title.split(" ").slice(0, -1).join(" ")}{" "}
            <em className="font-[300] italic text-accent-ink">{contactSection.title.split(" ").at(-1)}</em>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[1fr_1fr] md:gap-16">
          <Reveal className="space-y-4" delay={0.1}>
            {contactSection.body.map((p) => (
              <p key={p} className="max-w-[46ch] text-[17px] leading-[1.7] text-muted">
                {p}
              </p>
            ))}
            <p className="pt-2 font-serif text-[1.375rem] italic text-ink">{contactSection.signoff}</p>
          </Reveal>
          <Reveal className="space-y-8 md:pt-1" delay={0.2}>
            <div>
              <p className="mb-2 text-[15px] text-subtle">Email</p>
              <a href={`mailto:${contact.email}`} className="link whitespace-nowrap font-serif text-[clamp(1.25rem,2.2vw,1.75rem)] text-ink" data-cursor="Say hello">
                {contact.email}
              </a>
            </div>
            {socials.length > 0 && (
              <ul className="flex flex-wrap gap-6 text-[15px]">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-ink">
                      {s.label}
                      <ArrowIcon direction="up-right" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
