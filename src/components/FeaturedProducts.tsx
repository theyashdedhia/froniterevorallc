"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/catalog";
import { hasProductImage } from "@/lib/productImages";
import Icon from "./Icon";

// One featured item per category — the first product of its first sub-category.
const featured = categories
  .map((category) => {
    const product = category.subCategories[0]?.products[0];
    if (!product) return null;
    return { category, product };
  })
  .filter((f): f is { category: (typeof categories)[number]; product: NonNullable<typeof f>["product"] } => f !== null);

type Featured = (typeof featured)[number];

function FeaturedCard({ item }: { item: Featured }) {
  const { category, product } = item;
  const hasImage = hasProductImage(product.slug);
  return (
    <article className="group relative flex h-full w-[280px] shrink-0 flex-col overflow-hidden rounded-[20px] border border-accent/20 bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_20px_45px_-15px_rgba(83,131,102,0.4)] sm:w-[300px]">
      {/* Product thumbnail — real photo when available, category icon otherwise. */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-ash text-primary/30">
        {hasImage ? (
          <Image
            src={`/products/${product.slug}.jpg`}
            alt={product.name}
            fill
            sizes="300px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Icon name={category.icon} className="h-14 w-14" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-gold">{category.name}</span>
        <h3 className="mt-2 text-lg font-bold text-primary">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.shortDescription}</p>

        <Link
          href={`/products/${category.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 self-start rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gold hover:text-primary"
        >
          View Range
          <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default function FeaturedProducts() {
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
  const loop = [...featured, ...featured];

  return (
    <section
      aria-labelledby="featured-heading"
      className="relative flex min-h-screen items-center overflow-hidden bg-white"
    >
      <div className="relative mx-auto w-full max-w-content px-4 py-20 md:px-6 md:py-24">
        <div className="text-center">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-accent/30 bg-ash px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
            <Icon name="box" className="h-4 w-4 text-gold" />
            Featured Products
          </span>
          <h2 id="featured-heading" className="mt-4 font-serif text-3xl font-bold text-primary md:text-4xl">
            Featured Products
          </h2>
          <p className="mt-2 italic text-muted">
            A representative product from every balance-of-system family
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
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" />

          {/* Arrows (appear on hover, desktop) */}
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Scroll to previous products"
            className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 place-items-center rounded-full border border-line bg-white p-2.5 text-primary opacity-0 shadow-card transition hover:bg-gold hover:text-primary group-hover/carousel:opacity-100 md:grid"
          >
            <Icon name="arrow" className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Scroll to next products"
            className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 place-items-center rounded-full border border-line bg-white p-2.5 text-primary opacity-0 shadow-card transition hover:bg-gold hover:text-primary group-hover/carousel:opacity-100 md:grid"
          >
            <Icon name="arrow" className="h-5 w-5" />
          </button>

          <div
            ref={scrollerRef}
            className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: "none" }}
            role="list"
            aria-label="Featured products"
          >
            {loop.map((item, i) => (
              <div role="listitem" key={`${item.product.slug}-${i}`} aria-hidden={i >= featured.length}>
                <FeaturedCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-gold hover:text-primary"
          >
            Explore the Full Catalog
            <Icon name="arrow" className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
