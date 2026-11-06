import { PortableText, type PortableTextComponents } from "@portabletext/react";

import type { ImageValue, RichTextValue } from "@/lib/types";
import { clean, cn } from "@/lib/utils";

import { SanityImage } from "./SanityImage";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    lead: ({ children }) => <p className="lead">{children}</p>,
    small: ({ children }) => <p className="small">{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    highlight: ({ children }) => <mark>{children}</mark>,
    link: ({ value, children }) => {
      const href = clean(value?.href as string | undefined) ?? "#";
      const blank = clean(value?.blank) !== false && /^https?:/.test(href);
      return (
        <a href={href} {...(blank ? { target: "_blank", rel: "noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: ImageValue }) => (
      <figure className="my-8">
        <div className="overflow-hidden rounded-md">
          <SanityImage image={value} sizes="(min-width: 768px) 680px, 100vw" />
        </div>
        {value.caption && <figcaption className="mt-3 text-[14px] text-subtle">{value.caption}</figcaption>}
      </figure>
    ),
  },
};

export function RichText({ value, className }: { value?: RichTextValue; className?: string }) {
  if (!value?.length) return null;
  return (
    <div className={cn("rich", className)}>
      <PortableText value={value as never} components={components} />
    </div>
  );
}
