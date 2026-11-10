import { Button } from "@/components/site/Button";
import { Header } from "@/components/site/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="wrap w-default grid min-h-[80vh] place-items-center pt-[var(--header-h)]">
        <div className="text-center">
          <p className="text-[13px] tabular-nums text-subtle">404</p>
          <h1 className="mt-4 font-serif text-5xl font-[370] tracking-[-0.03em] text-ink md:text-6xl">This page took a different flow.</h1>
          <p className="mx-auto mt-4 max-w-[40ch] text-muted">The page you’re looking for doesn’t exist or has moved.</p>
          <div className="mt-8">
            <Button href="/">Back home</Button>
          </div>
        </div>
      </main>
    </>
  );
}
