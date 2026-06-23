# Frontier Evora — Website

B2B catalog & lead-generation website for a Solar Balance of System (BOS) supplier.
Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript** and **Tailwind CSS**.

The full product/design brief lives in [`docs/Frontier-Evora-Website-Plan.md`](docs/Frontier-Evora-Website-Plan.md).

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # lint
```

## Project structure

```
src/
  app/
    layout.tsx                 Root layout (header, footer, fonts, SEO metadata)
    page.tsx                   Homepage
    products/page.tsx          Catalog landing (all 13 categories)
    products/[category]/       Dynamic category page (SSG via generateStaticParams)
    about/  resources/  contact/  request-a-quote/
    privacy-policy/  terms/
    api/rfq/route.ts           RFQ form handler (logs; wire to email/CRM)
    sitemap.ts  robots.ts      Technical SEO
  components/                  Header, Footer, ProductCard, CategoryCard,
                               RFQForm, CTABand, TrustBar, Breadcrumbs, Icon
  lib/catalog.ts               Catalog data — the single source of truth
```

## Adding / editing products

Everything in the catalog is driven by `src/lib/catalog.ts`. To add a product,
append to the relevant sub-category's `products` array. To add a category, append
a `Category`. Pages, cards, spec tables, the Resources library and the sitemap all
update automatically.

## Design tokens

Colors, type scale and spacing from the plan (§2) are defined in
`tailwind.config.ts` — change them there and the whole site follows.

## Before launch (TODOs)

- **Product photography & datasheets** — replace the icon placeholders in
  `ProductCard`/`Resources` with real images, and set each product's `datasheetUrl`.
- **RFQ delivery** — `src/app/api/rfq/route.ts` currently logs submissions. Wire it
  to email (e.g. Resend) and/or a CRM (HubSpot). Add `NEXT_PUBLIC_SITE_URL` and any
  email/CRM keys to `.env`.
- **Spam protection** — a honeypot is included; add reCAPTCHA/Turnstile for production.
- **Certifications** — confirm exactly which IEC/UL/TÜV/ISO marks the company holds
  and only display substantiated badges (see plan §7.5).
- **Company details** — replace placeholder address/phone/email and the map embed.
- **Schema.org** — add `Organization` and `Product` JSON-LD (plan §7.3).

## Deploy

Optimized for Vercel (`vercel` / connect the repo). Any Node host works:
`npm run build && npm run start`.
