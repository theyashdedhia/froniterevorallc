import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Frontier Evora — address, phone, email and enquiry form for Solar BOS procurement.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-content px-4 py-10 md:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <h1 className="mt-6 text-4xl font-bold text-primary">Contact us</h1>
      <p className="mt-3 max-w-2xl text-muted">
        For procurement enquiries, the fastest path is a{" "}
        <Link href="/request-a-quote" className="font-semibold text-primary hover:underline">quote request</Link>. For
        anything else, reach us below.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          {[
            { icon: "structure", label: "Address", value: "Frontier Evora F.Z.C, Office C11F - SF6382, Ajman Free Zone C1 Building, Ajman Free Zone, Ajman, UAE" },
            { icon: "cable", label: "Phone", value: "+971 54 275 7015" },
            { icon: "connector", label: "Email", value: "sales@frontierevora.com" },
            { icon: "sensor", label: "Hours", value: "Mon–Sat, 9:00–18:00" },
          ].map((c) => (
            <div key={c.label} className="flex gap-3 rounded-card border border-line bg-white p-4 shadow-card">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/5 text-primary">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">{c.label}</p>
                <p className="text-ink">{c.value}</p>
              </div>
            </div>
          ))}

          <div className="overflow-hidden rounded-card border border-line">
            <div className="grid h-48 place-items-center bg-ash text-sm text-muted">
              [ Embedded map placeholder — add Google Maps iframe ]
            </div>
          </div>
        </div>

        <form className="rounded-card border border-line bg-white p-6 shadow-card">
          <h2 className="text-lg font-bold text-primary">Send a message</h2>
          <div className="mt-4 grid gap-4">
            <input name="name" required placeholder="Name" className="rounded-md border border-line px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            <input name="email" type="email" required placeholder="Email" className="rounded-md border border-line px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            <input name="subject" placeholder="Subject" className="rounded-md border border-line px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            <textarea name="message" rows={4} placeholder="How can we help?" className="rounded-md border border-line px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            <button type="submit" className="rounded-md bg-accent px-5 py-3 font-bold text-primary transition hover:brightness-95">
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
