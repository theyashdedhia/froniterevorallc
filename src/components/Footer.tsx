import Link from "next/link";
import { categories } from "@/lib/catalog";
import Icon from "./Icon";

const standards = ["IEC", "UL", "TÜV", "ISO 9001"];

export default function Footer() {
  return (
    <footer className="mt-20 bg-primary text-white/90">
      <div className="mx-auto max-w-content px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded bg-white/10 text-accent">
                <Icon name="bolt" className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold text-white">Frontier Evora</span>
            </div>
            <p className="mt-3 text-sm text-white/70">
              Premium Solar Balance of System (BOS) products for EPCs, installers and developers.
            </p>
            <p className="mt-3 text-sm text-white/70">
              123 Industrial Avenue, [City], [Country]
              <br />
              +1 (000) 000-0000
              <br />
              sales@frontierevora.com
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li><Link href="/products" className="hover:text-accent">Products</Link></li>
              <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
              <li><Link href="/request-a-quote" className="hover:text-accent">Request a Quote</Link></li>
              <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Product Sections</h4>
            <ul className="mt-3 grid grid-cols-1 gap-y-2 text-sm text-white/70">
              {categories.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={`/products/${c.slug}`} className="hover:text-accent">{c.name}</Link>
                </li>
              ))}
              <li><Link href="/products" className="font-semibold text-accent hover:underline">View all →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Newsletter</h4>
            <p className="mt-3 text-sm text-white/70">Product updates and new releases.</p>
            <form className="mt-3 flex gap-2">
              <input
                type="email"
                required
                placeholder="Work email"
                className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-accent focus:outline-none"
              />
              <button type="submit" className="rounded-md bg-accent px-3 py-2 text-sm font-bold text-primary">
                Join
              </button>
            </form>
            <div className="mt-5 flex flex-wrap gap-2">
              {standards.map((s) => (
                <span key={s} className="rounded border border-white/25 px-2 py-1 text-xs font-semibold text-white/80">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-5 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Frontier Evora. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-accent">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
