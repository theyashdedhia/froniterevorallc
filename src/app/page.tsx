import Link from "next/link";
import { categories, TRUST_STATEMENT } from "@/lib/catalog";
import CategoryCard from "@/components/CategoryCard";
import TrustBar from "@/components/TrustBar";
import CTABand from "@/components/CTABand";
import Icon from "@/components/Icon";

const why = [
  { icon: "shield", title: "Utility-Grade Quality", text: "Components engineered and tested for large-scale, long-life installations." },
  { icon: "sensor", title: "UV & Weather Resistant", text: "Materials rated for harsh outdoor conditions, from −40 °C to high-heat exposure." },
  { icon: "truck", title: "Fast Fulfillment", text: "Project-based supply and logistics built for EPC and developer timelines." },
  { icon: "check", title: "Industry Compliant", text: "Manufactured to IEC, UL, EN and TÜV standards across the catalog." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(900px 400px at 80% -10%, #F5B70055, transparent), radial-gradient(700px 500px at 0% 120%, #2E9E5B33, transparent)",
          }}
        />
        <div className="relative mx-auto grid max-w-content gap-8 px-4 py-20 md:grid-cols-2 md:items-center md:px-6 md:py-28">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
              Solar Balance of System
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              Empowering Solar Infrastructure with Premium BOS Solutions.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              Your trusted partner for high-grade mounting structures, cabling, and safety systems.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/products" className="rounded-md bg-accent px-6 py-3 font-bold text-primary transition hover:brightness-95">
                Explore Our Catalog
              </Link>
              <Link href="/request-a-quote" className="rounded-md border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Request a Quote
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-3">
              {categories.slice(0, 6).map((c) => (
                <Link
                  key={c.slug}
                  href={`/products/${c.slug}`}
                  className="rounded-card border border-white/15 bg-white/5 p-4 text-left text-white/90 transition hover:border-accent/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Icon name={c.icon} className="h-7 w-7 text-accent" />
                  <p className="mt-2 text-sm font-semibold">{c.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Why choose */}
      <section className="mx-auto max-w-content px-4 py-16 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">Why Choose Frontier Evora</h2>
          <p className="mt-2 text-muted">Built for the engineers and procurement teams who run solar projects.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w) => (
            <div key={w.title} className="rounded-card border border-line bg-white p-5 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-md bg-accent/15 text-primary">
                <Icon name={w.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{w.title}</h3>
              <p className="mt-1 text-sm text-muted">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured categories */}
      <section className="bg-ash">
        <div className="mx-auto max-w-content px-4 py-16 md:px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-primary">Featured Categories</h2>
              <p className="mt-2 text-muted">13 product families covering the full balance of system.</p>
            </div>
            <Link href="/products" className="hidden text-sm font-semibold text-primary hover:underline sm:block">
              View full catalog →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 8).map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Capability band */}
      <section className="mx-auto max-w-content px-4 py-16 md:px-6">
        <div className="grid items-center gap-8 rounded-card border border-line bg-white p-8 shadow-card md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-primary">One supplier. 13 product families.</h2>
            <p className="mt-3 text-muted">
              A typical utility-scale plant spans 40–60 procurement line items. Consolidate your balance-of-system
              sourcing with a single partner — from mounting structures and cabling to earthing, distribution,
              monitoring and safety.
            </p>
            <Link href="/resources" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
              <Icon name="download" className="h-5 w-5" />
              Download datasheets &amp; full catalog
            </Link>
          </div>
          <div className="rounded-card bg-primary p-6 text-white">
            <p className="text-sm uppercase tracking-wide text-accent">Standards &amp; Compliance</p>
            <p className="mt-3 text-white/85">{TRUST_STATEMENT}</p>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
