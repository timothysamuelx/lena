import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeader({ index, title, intro, className }: { index: string; title: string; intro?: string; className?: string }) {
  return (
    <Reveal className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="font-serif text-[2.125rem] font-[380] leading-[1.1] tracking-[-0.025em] text-ink md:text-[2.75rem]">{title}</h2>
        <span className="font-mono text-[12px] text-subtle">{index}</span>
      </div>
      {intro && <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-muted md:text-[17px]">{intro}</p>}
    </Reveal>
  );
}

export function Section({ id, children, className }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("relative border-t border-line", className)}>
      <div className="wrap w-default py-20 md:py-32">{children}</div>
    </section>
  );
}
