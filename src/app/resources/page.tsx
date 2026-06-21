import type { Metadata } from "next";
import { categories, allProducts } from "@/lib/catalog";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABand from "@/components/CTABand";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Resources & Downloads — Datasheets",
  description:
    "Download Frontier Evora product datasheets and the full catalog, organized by category. Ungated technical documentation for engineers and procurement teams.",
};

export default function ResourcesPage() {
  const rows = allProducts();
  return (
    <>
      <section className="mx-auto max-w-content px-4 py-10 md:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-primary">Resources &amp; Downloads</h1>
            <p className="mt-3 text-muted">
              Technical datasheets for every product, grouped by category — no login required. Attach them directly
              to your BOQ.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 font-bold text-primary"
          >
            <Icon name="download" className="h-5 w-5" />
            Download full catalog (PDF)
          </a>
        </div>

        <div className="mt-10 space-y-8">
          {categories.map((c) => (
            <div key={c.slug} className="rounded-card border border-line bg-white shadow-card">
              <div className="flex items-center gap-3 border-b border-line px-5 py-3">
                <span className="text-primary"><Icon name={c.icon} className="h-5 w-5" /></span>
                <h2 className="font-semibold text-ink">{c.name}</h2>
              </div>
              <ul className="divide-y divide-line">
                {rows
                  .filter((r) => r.category.slug === c.slug)
                  .map((r) => (
                    <li key={r.product.slug} className="flex items-center justify-between gap-4 px-5 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink">{r.product.name}</p>
                        <p className="truncate text-xs text-muted">{r.sub.name}</p>
                      </div>
                      <a
                        href={r.product.datasheetUrl ?? "#"}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-primary px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white"
                      >
                        <Icon name="download" className="h-4 w-4" />
                        PDF
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">
          Datasheet links are placeholders — wire each to the supplied PDF in the catalog data (datasheetUrl).
        </p>
      </section>

      <CTABand />
    </>
  );
}
