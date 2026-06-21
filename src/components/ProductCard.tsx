import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/catalog";
import { hasProductImage } from "@/lib/productImages";
import Icon from "./Icon";

export default function ProductCard({ product, categoryIcon }: { product: Product; categoryIcon: string }) {
  const hasImage = hasProductImage(product.slug);
  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition hover:shadow-cardHover">
      {/* Product thumbnail — real photo when available, icon placeholder otherwise. */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-ash text-primary/30">
        {hasImage ? (
          <Image
            src={`/products/${product.slug}.jpg`}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
          />
        ) : (
          <Icon name={categoryIcon} className="h-14 w-14" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-ink">{product.name}</h3>
        <p className="mt-1 text-sm text-muted">{product.shortDescription}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.standards.map((s) => (
            <span key={s} className="rounded bg-primary/5 px-2 py-0.5 text-xs font-semibold text-primary">{s}</span>
          ))}
        </div>

        <dl className="mt-3 space-y-1 text-xs text-muted">
          {product.attributes.slice(0, 3).map((a) => (
            <div key={a.label} className="flex justify-between gap-2">
              <dt className="text-muted">{a.label}</dt>
              <dd className="text-right font-medium text-ink">{a.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
          <a
            href={product.datasheetUrl ?? "#"}
            className="inline-flex items-center gap-1.5 rounded-md border border-primary px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            <Icon name="download" className="h-4 w-4" />
            Datasheet
          </a>
          <Link
            href={`/request-a-quote?product=${encodeURIComponent(product.name)}`}
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-bold text-primary transition hover:brightness-95"
          >
            Add to RFQ
          </Link>
        </div>
      </div>
    </article>
  );
}
