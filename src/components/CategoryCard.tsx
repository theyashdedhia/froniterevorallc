import Link from "next/link";
import type { Category } from "@/lib/catalog";
import Icon from "./Icon";

export default function CategoryCard({ category }: { category: Category }) {
  const count = category.subCategories.reduce((n, s) => n + s.products.length, 0);
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group flex flex-col rounded-card border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover"
    >
      <span className="grid h-12 w-12 place-items-center rounded-md bg-primary/5 text-primary transition group-hover:bg-primary group-hover:text-white">
        <Icon name={category.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-ink">{category.name}</h3>
      <p className="mt-1 text-sm text-muted">{category.tagline}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        {count} products
        <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
