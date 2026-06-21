"use client";

import { useState } from "react";
import { categories, TRUST_STATEMENT } from "@/lib/catalog";
import Icon from "./Icon";

type Props = {
  defaultCategory?: string; // category name to pre-select
  defaultProduct?: string; // product name to mention
  compact?: boolean;
};

export default function RFQForm({ defaultCategory, defaultProduct, compact = false }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [selected, setSelected] = useState<string[]>(defaultCategory ? [defaultCategory] : []);

  function toggle(name: string) {
    setSelected((prev) => (prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = { ...data, categories: selected };
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
      setSelected(defaultCategory ? [defaultCategory] : []);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-card border border-accent-alt/40 bg-accent-alt/5 p-6 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-alt/15 text-accent-alt">
          <Icon name="check" className="h-6 w-6" />
        </div>
        <h3 className="mt-3 text-lg font-semibold text-ink">Request received</h3>
        <p className="mt-1 text-sm text-muted">
          Thanks — our team will respond within one business day with pricing and availability.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card border border-line bg-white p-6 shadow-card">
      <h3 className="text-lg font-bold text-primary">Bulk Order Request</h3>
      <p className="mt-1 text-sm text-muted">
        Share your project details and we&apos;ll get back fast.
      </p>

      {defaultProduct && (
        <p className="mt-3 rounded-md bg-primary/5 px-3 py-2 text-sm text-primary">
          Enquiring about: <span className="font-semibold">{defaultProduct}</span>
        </p>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" required />
        <div>
          <label className="mb-1 block text-sm font-semibold text-ink">Project Size</label>
          <div className="flex gap-2">
            <input
              name="projectSize"
              type="number"
              min={0}
              placeholder="e.g. 5"
              className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <select
              name="projectSizeUnit"
              className="rounded-md border border-line px-2 py-2 text-sm focus:border-primary focus:outline-none"
              defaultValue="MW"
            >
              <option>kW</option>
              <option>MW</option>
            </select>
          </div>
        </div>
        <Field label="Location / Timeline" name="timeline" placeholder="Optional" />
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-semibold text-ink">Required Product Categories</label>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <label key={c.slug} className="flex cursor-pointer items-center gap-2 rounded-md border border-line px-3 py-1.5 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <input
                type="checkbox"
                checked={selected.includes(c.name)}
                onChange={() => toggle(c.name)}
                className="accent-primary"
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold text-ink">Message / BOQ notes</label>
        <textarea
          name="message"
          rows={compact ? 2 : 3}
          className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-primary focus:outline-none"
          placeholder="Quantities, specifications, or attach a BOQ in your reply."
        />
      </div>

      {/* Honeypot for basic spam protection */}
      <input type="text" name="_company_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <label className="mt-4 flex items-start gap-2 text-xs text-muted">
        <input type="checkbox" required className="mt-0.5 accent-primary" />
        I agree to be contacted about this enquiry and accept the privacy policy.
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full rounded-md bg-accent px-5 py-3 font-bold text-primary transition hover:brightness-95 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit Request"}
      </button>

      {status === "error" && (
        <p className="mt-2 text-sm text-danger">Something went wrong. Please email sales@frontierevora.com.</p>
      )}

      <p className="mt-4 border-t border-line pt-3 text-xs text-muted">{TRUST_STATEMENT}</p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
    </div>
  );
}
