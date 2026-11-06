import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Suspense } from "react";

import { Providers } from "@/components/motion/Providers";
import { Cursor } from "@/components/site/Cursor";
import { isSanityConfigured } from "@/sanity/env";
import { SanityLive } from "@/sanity/live";

/** Live content updates + click-to-edit overlays when previewing from the Studio. */
async function SanityTools() {
  if (!isSanityConfigured) return null;
  const { isEnabled } = await draftMode();
  return (
    <>
      <SanityLive includeDrafts={isEnabled} />
      {isEnabled && (
        <>
          <VisualEditing />
          <a
            href="/api/draft-mode/disable"
            className="fixed bottom-4 right-4 z-[80] rounded-full bg-ink px-4 py-2 text-[13px] text-bg shadow-lg"
          >
            Exit preview
          </a>
        </>
      )}
    </>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {children}
      <div className="grain" aria-hidden />
      <Cursor />
      <Suspense>
        <SanityTools />
      </Suspense>
    </Providers>
  );
}
