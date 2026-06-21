import { NextResponse } from "next/server";

// RFQ / bulk-order intake. Currently logs and returns success.
// TODO (wire before launch): send to sales via email (e.g. Resend) and/or push to CRM (HubSpot).
// Add server env: RFQ_TO_EMAIL, RESEND_API_KEY, etc.
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot — silently accept bots without forwarding.
    if (body._company_url) {
      return NextResponse.json({ ok: true });
    }

    // Minimal validation.
    const required = ["name", "company", "email", "phone"];
    for (const f of required) {
      if (!body[f] || String(body[f]).trim() === "") {
        return NextResponse.json({ ok: false, error: `Missing ${f}` }, { status: 400 });
      }
    }

    // Replace with real delivery (email/CRM). For now, log server-side.
    console.log("[RFQ] New request:", {
      name: body.name,
      company: body.company,
      email: body.email,
      phone: body.phone,
      projectSize: `${body.projectSize ?? ""} ${body.projectSizeUnit ?? ""}`.trim(),
      categories: body.categories,
      timeline: body.timeline,
      message: body.message,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
}
