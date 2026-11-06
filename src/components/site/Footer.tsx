import { site } from "@/content/site";

import { BackToTop } from "./BackToTop";

export function Footer() {
  const links = [
    { label: "Email", href: `mailto:${site.contact.email}` },
    { label: "LinkedIn", href: site.contact.linkedin },
    { label: "Dribbble", href: site.contact.dribbble },
  ].filter((l) => l.href);

  return (
    <footer className="relative border-t border-line">
      <div className="grid gap-10 px-6 py-10 text-[15px] sm:grid-cols-3 md:px-12">
        <div className="space-y-1">
          <p className="text-ink">{site.name}</p>
          <p className="text-muted">{site.role}</p>
        </div>
        <ul className="space-y-1">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-muted transition-colors hover:text-ink"
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="space-y-1 sm:text-right">
          <BackToTop />
          <p className="text-muted">Always happy to connect.</p>
        </div>
      </div>
    </footer>
  );
}
