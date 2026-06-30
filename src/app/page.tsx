import Link from "next/link";
import { TRUST_STATEMENT } from "@/lib/catalog";
import TrustBar from "@/components/TrustBar";
import CTABand from "@/components/CTABand";
import Icon from "@/components/Icon";
import HeroVideo from "@/components/HeroVideo";
import OperationalMetrics from "@/components/OperationalMetrics";
import BOSClientele from "@/components/BOSClientele";
import FeaturedProducts from "@/components/FeaturedProducts";

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
      <section className="relative flex min-h-screen items-center overflow-hidden bg-primary">
        {/* Background video */}
        <HeroVideo />
        {/* Brand overlay — gradient keeps text legible while letting the video show through */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/65 to-primary/40" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(900px 400px at 80% -10%, #F5B70055, transparent), radial-gradient(700px 500px at 0% 120%, #2E9E5B33, transparent)",
          }}
        />
        <div className="relative mx-auto w-full max-w-content px-4 py-20 md:px-6 md:py-28">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
              Solar Balance of System
            </span>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
              Empowering Infrastructure with Premium BOS Solutions.
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="rounded-md bg-accent px-6 py-3 font-bold text-primary transition hover:brightness-95">
                Explore Our Catalog
              </Link>
              <Link href="/request-a-quote" className="rounded-md border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Why choose */}
      <section className="flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-content px-4 py-16 md:px-6">
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
        </div>
      </section>

      <OperationalMetrics />

      <FeaturedProducts />

      <BOSClientele />

      

      <CTABand />
    </>
  );
}
