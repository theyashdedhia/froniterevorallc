import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import RFQForm from "@/components/RFQForm";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a consolidated bulk quote for Solar BOS products. Share your project size and required categories — Frontier Evora responds within one business day.",
};

export default function RequestQuotePage({
  searchParams,
}: {
  searchParams: { product?: string; category?: string };
}) {
  return (
    <section className="mx-auto max-w-content px-4 py-10 md:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]} />

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 className="text-4xl font-bold text-primary">Request a Quote</h1>
          <p className="mt-3 text-muted">
            Get project-based pricing across any of our 13 product families in a single request. The more detail you
            share, the faster and more accurate our response.
          </p>

          <div className="mt-8 space-y-4">
            {[
              { icon: "check", title: "Fast response", text: "We reply within one business day with pricing and availability." },
              { icon: "download", title: "Datasheets included", text: "We send the relevant technical documentation for your BOQ." },
              { icon: "truck", title: "Logistics handled", text: "Delivery planned around your construction timeline." },
            ].map((s) => (
              <div key={s.title} className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/5 text-primary">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">{s.title}</p>
                  <p className="text-sm text-muted">{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-card border border-line bg-ash p-5 text-sm text-muted">
            Prefer to talk? Call <span className="font-semibold text-primary">+1 (000) 000-0000</span> or email{" "}
            <span className="font-semibold text-primary">sales@frontierevora.com</span>.
          </div>
        </div>

        <RFQForm defaultCategory={searchParams.category} defaultProduct={searchParams.product} />
      </div>
    </section>
  );
}
