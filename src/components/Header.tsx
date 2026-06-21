"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/lib/catalog";
import Icon from "./Icon";

export default function Header() {
  const [open, setOpen] = useState(false); // mobile menu
  const [mega, setMega] = useState(false); // desktop products mega-menu

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded bg-primary text-accent">
            <Icon name="bolt" className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-primary">
            Frontier Evora<span className="text-muted"> LLC</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
          >
            <Link href="/products" className="flex items-center gap-1 py-2 text-sm font-semibold text-ink hover:text-primary">
              Products
              <Icon name="arrow" className="h-3.5 w-3.5 rotate-90" />
            </Link>
            {mega && (
              <div className="absolute left-1/2 top-full w-[min(880px,90vw)] -translate-x-1/2 rounded-card border border-line bg-white p-5 shadow-cardHover">
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-3">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/products/${c.slug}`}
                      className="flex items-start gap-3 rounded-md p-2 hover:bg-ash"
                    >
                      <span className="mt-0.5 text-primary">
                        <Icon name={c.icon} className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">{c.name}</span>
                        <span className="block text-xs text-muted">{c.tagline}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <Link href="/products" className="text-sm font-semibold text-primary hover:underline">
                    View full catalog →
                  </Link>
                  <Link href="/resources" className="text-sm text-muted hover:text-primary">
                    Download datasheets
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link href="/about" className="text-sm font-semibold text-ink hover:text-primary">About Us</Link>
          <Link href="/resources" className="text-sm font-semibold text-ink hover:text-primary">Resources</Link>
          <Link href="/contact" className="text-sm font-semibold text-ink hover:text-primary">Contact</Link>
        </nav>

        <div className="hidden md:block">
          <Link
            href="/request-a-quote"
            className="rounded-md bg-accent px-4 py-2 text-sm font-bold text-primary transition hover:brightness-95"
          >
            Request a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-primary md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-white px-4 py-3 md:hidden">
          <Link href="/products" className="block py-2 font-semibold text-ink" onClick={() => setOpen(false)}>
            Products
          </Link>
          <div className="mb-2 grid grid-cols-1 gap-0.5 border-l border-line pl-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/products/${c.slug}`}
                className="py-1 text-sm text-muted"
                onClick={() => setOpen(false)}
              >
                {c.name}
              </Link>
            ))}
          </div>
          <Link href="/about" className="block py-2 font-semibold text-ink" onClick={() => setOpen(false)}>About Us</Link>
          <Link href="/resources" className="block py-2 font-semibold text-ink" onClick={() => setOpen(false)}>Resources</Link>
          <Link href="/contact" className="block py-2 font-semibold text-ink" onClick={() => setOpen(false)}>Contact</Link>
          <Link
            href="/request-a-quote"
            className="mt-2 block rounded-md bg-accent px-4 py-2 text-center text-sm font-bold text-primary"
            onClick={() => setOpen(false)}
          >
            Request a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
