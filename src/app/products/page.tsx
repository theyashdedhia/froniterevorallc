import type { Metadata } from "next";
import { categories } from "@/lib/catalog";
import CategoryCard from "@/components/CategoryCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Product Catalog — Solar BOS Components",
  description:
    "Browse Frontier Evora's full Solar Balance of System catalog: mounting structures, cable trays, FRP walkways, wires & cables, earthing, lightning protection, fire safety, distribution boards, combiner boxes, connectors, monitoring and signage.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="mx-auto max-w-content px-4 py-10 md:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
        <div className="mt-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-primary">Product Catalog</h1>
          <p className="mt-3 text-muted">
            Thirteen product families spanning the complete solar balance of system. Open any category for
            specifications and datasheets, or request a consolidated quote across categories.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
