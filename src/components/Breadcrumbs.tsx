import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {c.href ? (
              <Link href={c.href} className="hover:text-primary">{c.label}</Link>
            ) : (
              <span className="font-semibold text-ink">{c.label}</span>
            )}
            {i < items.length - 1 && <span className="text-line">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
