import { Stagger, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/content/site";

const icons: Record<string, React.ReactNode> = {
  interface: (
    <>
      <rect x="3" y="5" width="26" height="22" rx="2.5" />
      <path d="M3 10.5h26M10.5 10.5V27" />
      <rect x="14" y="14" width="11" height="5" rx="1" />
    </>
  ),
  research: (
    <>
      <circle cx="14" cy="14" r="8.5" />
      <path d="m20.5 20.5 7 7" />
      <circle cx="14" cy="12" r="2.5" />
      <path d="M9.5 18.5c1-2 2.6-3 4.5-3s3.5 1 4.5 3" />
    </>
  ),
  prototype: (
    <>
      <rect x="3" y="4" width="11" height="15" rx="2" />
      <rect x="18" y="13" width="11" height="15" rx="2" />
      <path d="M14 11.5h4.5a2 2 0 0 1 2 2V13" />
      <path d="m18.5 11 2 2 2-2" />
    </>
  ),
  evaluate: (
    <>
      <circle cx="16" cy="16" r="12" />
      <circle cx="16" cy="16" r="6.5" />
      <path d="m13 16 2.2 2.2L19.5 14" />
    </>
  ),
};

export function Capabilities() {
  return (
    <Stagger className="grid border-l border-t border-line sm:grid-cols-2">
      {site.capabilities.items.map((item, i) => (
        <RevealItem key={item.title} className="group relative border-b border-r border-line p-7 transition-colors duration-500 hover:bg-surface md:p-10">
          <div className="mb-10 flex items-start justify-between">
            <svg
              width="34"
              height="34"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-ink transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 group-hover:text-accent-ink"
              aria-hidden
            >
              {icons[item.icon]}
            </svg>
            <span className="font-mono text-[12px] text-subtle">0{i + 1}</span>
          </div>
          <h3 className="font-serif text-[1.625rem] font-[380] leading-tight tracking-[-0.015em] text-ink">{item.title}</h3>
          <p className="mt-3 max-w-[40ch] text-[15.5px] leading-relaxed text-muted">{item.body}</p>
        </RevealItem>
      ))}
    </Stagger>
  );
}
