"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";

type Client = {
  slug: string;
  name: string;
  highlight: string;
  caption: string;
  description: string;
  website: string;
};

const clients: Client[] = [
  {
    slug: "waaree-rtl",
    name: "Waaree RTL",
    highlight: "5 GW+",
    caption: "Operational Capacity",
    description: "India's leading solar EPC and subsidiary of Waaree Energies.",
    website: "https://www.waareertl.com",
  },
  {
    slug: "oriano",
    name: "Oriano Clean Energy",
    highlight: "3 GWp+",
    caption: "Renewable Portfolio",
    description: "Mumbai-based clean energy EPC specializing in C&I and utility-scale solar.",
    website: "https://www.oriano.com",
  },
  {
    slug: "essens-renewable",
    name: "Essens Renewable",
    highlight: "2 GWp+",
    caption: "HQ & Operations",
    description: "Clean energy infrastructure and sustainability solutions provider.",
    website: "https://www.essensrenewable.com",
  },
  {
    slug: "roofsol",
    name: "Roofsol Energy",
    highlight: "Top 5",
    caption: "Rooftop Solar EPC",
    description: "400+ MW installed across 250+ rooftop solar projects with global operations.",
    website: "https://www.roofsol.com",
  },
  {
    slug: "vikran",
    name: "Vikran Engineering",
    highlight: "600 MW+",
    caption: "Solar Pipeline",
    description: "Fast-growing EPC with large NTPC and PM-KUSUM solar projects.",
    website: "https://www.vikrangroup.com",
  },
];

function ClientCard({ client, index }: { client: Client; index: number }) {
  return (
    <article
      className="group relative flex h-full w-[280px] shrink-0 flex-col overflow-hidden rounded-[20px] border border-accent/20 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_20px_45px_-15px_rgba(83,131,102,0.4)] sm:w-[300px]"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Golden accent line at top */}
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

      <h3 className="text-xl font-bold text-primary">{client.name}</h3>

      <p className="mt-3 font-serif text-4xl font-bold leading-none text-gold">{client.highlight}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">{client.caption}</p>

      <span className="my-4 h-px w-full bg-accent/25" />

      <p className="flex-1 text-sm leading-relaxed text-muted">{client.description}</p>
    </article>
  );
}

export default function BOSClientele() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Continuous auto-scroll with seamless wrap (the track is duplicated).
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    let raf = 0;
    const tick = () => {
      if (!paused) {
        el.scrollLeft += 0.6;
        // The first copy of the list occupies the first half of scrollWidth.
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const nudge = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  }, []);

  // Duplicated list enables the seamless infinite loop.
  const loop = [...clients, ...clients];

  return (
    <section
      aria-labelledby="clientele-heading"
      className="relative flex min-h-screen items-center overflow-hidden bg-ash"
    >
      {/* Light renewable-energy backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 360px at 12% -10%, rgba(83,131,102,0.12), transparent), radial-gradient(620px 420px at 100% 120%, rgba(246,166,35,0.10), transparent)",
        }}
      />

      <div className="relative mx-auto w-full max-w-content px-4 py-20 md:px-6 md:py-24">
        <div className="text-center">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
            <Icon name="handshake" className="h-4 w-4 text-gold" />
            Valued BOS Clientele
          </span>
          <h2 id="clientele-heading" className="mt-4 font-serif text-3xl font-bold text-primary md:text-4xl">
            Valued BOS Clientele
          </h2>
          <p className="mt-2 italic text-muted">
            Trusted by India&apos;s leading renewable energy EPC companies
          </p>
        </div>

        {/* Carousel */}
        <div
          className="group/carousel relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ash to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ash to-transparent" />

          {/* Arrows (appear on hover, desktop) */}
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Scroll to previous clients"
            className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 place-items-center rounded-full border border-line bg-white p-2.5 text-primary opacity-0 shadow-card transition hover:bg-gold hover:text-primary group-hover/carousel:opacity-100 md:grid"
          >
            <Icon name="arrow" className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Scroll to next clients"
            className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 place-items-center rounded-full border border-line bg-white p-2.5 text-primary opacity-0 shadow-card transition hover:bg-gold hover:text-primary group-hover/carousel:opacity-100 md:grid"
          >
            <Icon name="arrow" className="h-5 w-5" />
          </button>

          <div
            ref={scrollerRef}
            className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: "none" }}
            role="list"
            aria-label="Client list"
          >
            {loop.map((c, i) => (
              <div role="listitem" key={`${c.slug}-${i}`} aria-hidden={i >= clients.length}>
                <ClientCard client={c} index={i % clients.length} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <h3 className="font-serif text-2xl font-bold text-primary">Partner with Industry Leaders</h3>
          <p className="mx-auto mt-2 max-w-2xl text-muted">
            Frontier Evora is a trusted BOS supply partner to India&apos;s fastest-growing renewable energy companies.
          </p>
          <Link
            href="/request-a-quote"
            className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-primary px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-gold hover:text-primary"
          >
            Become Our Partner
            <Icon name="arrow" className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
