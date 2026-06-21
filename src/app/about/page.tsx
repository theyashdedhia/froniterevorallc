import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABand from "@/components/CTABand";
import Icon from "@/components/Icon";
import { TRUST_STATEMENT } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Frontier Evora LLC supplies premium Solar Balance of System products to EPCs, installers and developers, built to international quality and safety standards.",
};

const certs = ["ISO 9001", "IEC", "UL", "TÜV Rheinland", "EN 50618"];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-content px-4 py-10 md:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
        <div className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-bold text-primary">A trusted partner in solar infrastructure</h1>
          <p className="mt-4 text-lg text-muted">
            Frontier Evora LLC is a premier supplier of Solar Balance of System (BOS) products. We help EPCs,
            installers and developers source the structural, electrical and safety components that keep solar
            plants running reliably for decades.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: "structure", title: "Engineering-first", text: "We supply specifications, samples and datasheets early — the phase where EPC equipment decisions are made." },
            { icon: "shield", title: "Quality philosophy", text: "Every product line is tested for performance and durability in harsh environmental conditions." },
            { icon: "truck", title: "Built for projects", text: "Project-based supply and logistics tuned to large-scale procurement and construction timelines." },
          ].map((b) => (
            <div key={b.title} className="rounded-card border border-line bg-white p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-md bg-primary/5 text-primary">
                <Icon name={b.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{b.title}</h3>
              <p className="mt-1 text-sm text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-ash">
        <div className="mx-auto max-w-content px-4 py-14 md:px-6">
          <h2 className="text-2xl font-bold text-primary">Certifications &amp; standards</h2>
          <p className="mt-2 max-w-2xl text-muted">{TRUST_STATEMENT}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {certs.map((c) => (
              <span key={c} className="rounded-card border border-line bg-white px-5 py-3 font-semibold text-primary shadow-card">
                {c}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            Note: confirm exact certifications held per product line before publishing. Display only substantiated marks.
          </p>
        </div>
      </section>

      <CTABand title="Need a supplier you can spec in?" subtitle="Get datasheets and a fast, consolidated quote across categories." />
    </>
  );
}
