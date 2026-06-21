import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <h1 className="mt-6 text-3xl font-bold text-primary">Privacy Policy</h1>
      <p className="mt-4 text-muted">
        [Placeholder] Add your privacy policy here. Describe what data is collected through enquiry and newsletter
        forms, how it is used and stored, third-party processors (email/CRM), and contact details for data requests.
      </p>
    </section>
  );
}
