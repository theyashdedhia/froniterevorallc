import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto grid max-w-content place-items-center px-4 py-28 text-center md:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent-alt">404</p>
      <h1 className="mt-2 text-3xl font-bold text-primary">Page not found</h1>
      <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/products" className="mt-6 rounded-md bg-accent px-5 py-3 font-bold text-primary">
        Browse the catalog
      </Link>
    </section>
  );
}
