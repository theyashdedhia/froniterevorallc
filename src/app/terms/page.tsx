import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <h1 className="mt-6 text-3xl font-bold text-primary">Terms of Use</h1>
      <p className="mt-4 text-muted">
        [Placeholder] Add your terms of use here — site usage, intellectual property, product information disclaimers,
        and limitation of liability.
      </p>
    </section>
  );
}
