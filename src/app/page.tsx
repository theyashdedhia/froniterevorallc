import Link from "next/link";
import { TRUST_STATEMENT } from "@/lib/catalog";
import TrustBar from "@/components/TrustBar";
import CTABand from "@/components/CTABand";
import HeroVideo from "@/components/HeroVideo";
import OperationalMetrics from "@/components/OperationalMetrics";
import BOSClientele from "@/components/BOSClientele";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandsWeSupply from "@/components/BrandsWeSupply";

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

      <OperationalMetrics />

      <FeaturedProducts />

      <BOSClientele />

      <BrandsWeSupply />

      <CTABand />
    </>
  );
}
