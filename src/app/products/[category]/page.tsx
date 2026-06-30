import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, categorySlugs, TRUST_STATEMENT } from "@/lib/catalog";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import RFQForm from "@/components/RFQForm";
import Icon from "@/components/Icon";

export function generateStaticParams() {
  return categorySlugs().map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const c = getCategory(params.category);
  if (!c) return { title: "Product not found" };
  return {
    title: `${c.name} — ${c.tagline}`,
    description: c.intro,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category);
  if (!category) notFound();

  return (
    <>
      {/* Category header */}
      <section className="border-b border-line bg-ash">
        <div className="mx-auto max-w-content px-4 py-10 md:px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: category.name },
            ]}
          />
          <div className="mt-4 flex items-start gap-4">
            <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-md bg-primary text-white sm:grid">
              <Icon name={category.icon} className="h-7 w-7" />
            </span>
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold text-primary md:text-4xl">{category.name}</h1>
              <p className="mt-2 text-muted">{category.intro}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {category.standards.map((s) => (
                  <span key={s} className="rounded bg-white px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-line">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* In-page sub-nav */}
          <div className="mt-6 flex flex-wrap gap-2">
            {category.subCategories.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-ink hover:border-primary hover:text-primary"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-category blocks */}
      <section className="mx-auto max-w-content px-4 py-12 md:px-6">
        {category.subCategories.map((sub) => (
          <div key={sub.slug} id={sub.slug} className="mb-14 scroll-mt-28">
            <h2 className="text-xl font-bold text-ink md:text-2xl">{sub.name}</h2>
            <p className="mt-1 text-sm text-muted">{sub.descriptor}</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sub.products.map((product) => (
                <ProductCard key={product.slug} product={product} categoryIcon={category.icon} />
              ))}
            </div>
          </div>
        ))}

        {/* Compliance note */}
        <div className="rounded-card border border-line bg-ash p-5 text-sm text-muted">
          <span className="font-semibold text-primary">Standards &amp; compliance: </span>
          {TRUST_STATEMENT}
        </div>
      </section>

      {/* Lead-gen block (bottom of every catalog page) */}
      <section className="bg-ash">
        <div className="mx-auto max-w-content px-4 py-14 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-bold text-primary">Request a bulk quote for {category.name}</h2>
              <p className="mt-3 text-muted">
                Tell us your project size and the categories you need. Our team responds within one business day
                with pricing and availability — and you can request multiple categories in one go.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink">
                {["Project-based net pricing", "Specs & samples for engineering", "Logistics built for EPC timelines"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Icon name="check" className="h-5 w-5 text-accent-alt" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <RFQForm defaultCategory={category.name} compact />
          </div>
        </div>
      </section>

      {/* Related categories */}
      <section className="mx-auto max-w-content px-4 py-12 md:px-6">
        <h2 className="text-lg font-semibold text-ink">Explore other categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <a
                key={c.slug}
                href={`/products/${c.slug}`}
                className="rounded-full border border-line px-3 py-1.5 text-sm text-muted hover:border-primary hover:text-primary"
              >
                {c.name}
              </a>
            ))}
        </div>
      </section>
    </>
  );
}
