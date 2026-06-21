# Frontier Evora LLC — Master Website Plan & Sitemap

**Project:** B2B catalog & lead-generation website for a Solar Balance of System (BOS) supplier
**Audience:** EPCs, solar installers, project developers, electrical contractors, procurement teams
**Deliverable type:** Written plan + sitemap (page-by-page wireframes, content, component spec, build roadmap)
**Prepared:** June 2026
**Status:** Ready for design + development handoff

---

## 0. How to read this document

This is the single source of truth a designer and developer can build from without further interpretation. It covers, in order:

1. Strategy & positioning — who we are talking to and what the site must achieve
2. Design system — colors, type, spacing, components (the visual contract)
3. Sitemap & URL structure — every page and how they connect
4. Page-by-page wireframes — section-by-section layout for each template
5. The product catalog — all 13 sections with full sub-category and attribute specs
6. Lead generation & forms — the conversion machinery
7. SEO, technical, and content requirements
8. Build roadmap & tech stack recommendation
9. Asset checklist — what content/photography must be supplied

A note grounded in how this market actually buys: in solar EPC procurement, equipment specs are locked during the *engineering* phase, and suppliers who put technical specifications, datasheets, and samples in front of EPCs early win the most deals. A 100 MW plant spans 40–60 product categories. **This site's primary job is therefore not to "sell" — it is to make Frontier Evora the easiest supplier to spec in.** Every design decision below serves that: fast access to datasheets, unambiguous technical attributes, and a frictionless quote/bulk-order path.

---

## 1. Strategy & positioning

### 1.1 Objectives (in priority order)

1. **Get specced in.** Make datasheets and technical attributes effortless to find and download (no gate, no login).
2. **Generate qualified RFQs.** Capture bulk-order / project enquiries with enough structure (project size, categories, timeline) that sales can respond fast.
3. **Establish trust at a glance.** Certifications, standards compliance, and product breadth must read as "utility-grade, reliable supplier" within the first screen.
4. **Be findable.** Rank for high-intent B2B procurement terms (see §7).

### 1.2 Primary user journeys

- **The spec engineer** — arrives via search for a specific product ("perforated GI cable tray 300mm datasheet"), needs the datasheet and dimensions in under 10 seconds, may bookmark or download to attach to a BOQ.
- **The procurement lead** — browsing breadth, wants to confirm Frontier Evora can supply across categories for a single PO, then submits a bulk-order RFQ listing multiple categories.
- **The installer / contractor** — needs availability, compliance assurance (IEC/UL), and a fast quote.

### 1.3 Measurable success metrics

- RFQ form submissions / month
- Datasheet downloads / month (proxy for "specced in")
- Organic sessions on product category pages
- Quote-request CTA click-through rate
- Bounce rate on product pages (target: low — content must answer fast)

---

## 2. Design system (the visual contract)

### 2.1 Color palette

| Token | Role | Suggested value | Notes |
|---|---|---|---|
| `--color-primary` | Deep Industrial Blue — trust, engineering | `#0A3D62` / `#0B3C5D` | Header, primary buttons, headings, footer |
| `--color-primary-dark` | Hover/active, deep sections | `#072A43` | Button hover, dark overlays |
| `--color-accent` | Vibrant Solar Yellow — energy | `#F5B700` / `#FFC107` | Primary CTAs, highlights, iconography |
| `--color-accent-alt` | Eco-Green — sustainability (secondary accent) | `#2E9E5B` | Sustainability/compliance badges, "in stock" states |
| `--color-bg` | Clean White | `#FFFFFF` | Default page background, product cards |
| `--color-bg-alt` | Light Ash Grey | `#F4F6F8` | Alternating sections, catalog backdrops |
| `--color-border` | Subtle dividers | `#E1E6EB` | Card borders, table lines |
| `--color-text` | Body text | `#1B2A33` | High legibility on white |
| `--color-text-muted` | Secondary text | `#5A6B75` | Captions, metadata |
| `--color-danger` | Warnings (used on safety pages) | `#D7263D` | Danger-board / fire / LOTO sections only |

**Usage rule:** Blue dominates (structure, trust). Yellow is the single primary CTA color — reserve it so "Request a Quote" / "Download Datasheet" always pop. Green is a supporting accent for sustainability/compliance cues, never the main CTA. Keep large surfaces white or ash grey for a clean, catalog-grade feel.

### 2.2 Typography

- **Family:** `Inter` (primary) with system-ui fallback. Alternatives that fit the brief: Roboto, Montserrat (use Montserrat for headlines if a more architectural feel is wanted; keep body in Inter/Roboto for legibility).
- **Scale (desktop):**
  - H1 — 48px / 700 / -0.02em (hero headlines)
  - H2 — 34px / 700 (section titles)
  - H3 — 24px / 600 (card/category titles)
  - H4 — 18px / 600 (product names, spec labels)
  - Body — 16px / 400 / 1.6 line-height
  - Small / caption — 14px / 400
  - Eyebrow/label — 13px / 600 / uppercase / 0.08em tracking
- **Mobile:** scale H1 down to ~32px, H2 to ~26px; body stays 16px.

### 2.3 Spacing, grid, radius, elevation

- **Grid:** 12-column, max content width 1200–1280px, 24px gutters. Catalog grids: 4 columns desktop / 2 tablet / 1 mobile.
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- **Radius:** 8px cards, 6px buttons/inputs, 4px badges. Industrial-clean — avoid heavily rounded "consumer app" shapes.
- **Elevation:** subtle. Card shadow `0 1px 3px rgba(11,60,93,0.08)`; hover lifts to `0 6px 16px rgba(11,60,93,0.12)`.
- **Imagery treatment:** product photos on white/ash with consistent padding; hero/lifestyle images get a subtle blue gradient overlay (`rgba(10,61,98,0.45)`) so white headline text stays legible.

### 2.4 Core components (the reusable kit)

- **Buttons:** Primary (yellow fill, blue text), Secondary (blue outline), Ghost (text + arrow). Datasheet button = secondary style with a download icon.
- **Product card:** thumbnail (white bg, 4:3), product name (H4), one-line description, attribute chips (e.g. "Grade 304", "TÜV"), "Download Datasheet" + "Add to RFQ" actions.
- **Category card:** icon or hero thumbnail, category name, item count, short blurb, arrow link.
- **Spec table:** two-column key/value, zebra striping in ash grey, used on product detail.
- **Attribute chip / badge:** small pill for standards (IEC, UL, TÜV), grade, material, finish.
- **Trust bar:** horizontal strip of certification/standard badges, reused on home + every catalog page footer area.
- **CTA band:** full-width blue band with headline + RFQ button; appears bottom of most pages.
- **Mega-menu:** Products dropdown listing all 13 sections in columns with icons.
- **Breadcrumbs:** Home / Products / [Category] / [Product] — important for deep catalog SEO and orientation.
- **RFQ "cart" pattern (recommended):** an "Add to RFQ" action on products builds a lightweight enquiry list the user submits as one bulk request (no payment, no pricing shown). This is the highest-value interaction on the site — see §6.

---

## 3. Sitemap & URL structure

```
/                                   Homepage
/products                           Catalog landing (all 13 sections as cards)
/products/mms-structures            Section 1  — Module Mounting Structures
/products/cable-trays               Section 2  — Cable Trays & Accessories
/products/frp-walkways              Section 3  — FRP Walkways
/products/wires-cables              Section 4  — Wires & Cables
/products/earthing-protection       Section 5  — Earthing Protection
/products/lightning-protection      Section 6  — Lightning Protection
/products/fire-safety               Section 7  — Fire Safety Equipment
/products/cable-management          Section 8  — Cable Management (Ties & Routing)
/products/electrical-distribution   Section 9  — Electrical Distribution (ACDB & DCDB)
/products/combiner-junction-boxes   Section 10 — Combiner & Junction Boxes
/products/connectors-tools          Section 11 — Connectors & Tools
/products/scada-monitoring          Section 12 — SCADA & Weather Monitoring
/products/safety-signage            Section 13 — Safety & Warning Signage
/products/[category]/[product]      Product detail (optional deeper tier — see §5.4)

/about                              About Us (story, capability, quality, certifications)
/resources                          Resources / Downloads hub (all datasheets, catalogs)
/resources/[doc]                    Individual download (or direct PDF links)
/request-a-quote                    Standalone RFQ / bulk-order form
/contact                            Contact (address, map, phone, email, form)

/privacy-policy                     Legal
/terms                              Legal
/sitemap.xml  /robots.txt           Technical SEO
```

**Decision — single page vs. dedicated pages per category:** Use **dedicated pages per category** (the URLs above), not one long anchor-linked page. Rationale: each category page can rank independently for its product keywords, load faster, and be linked directly from a BOQ or email. (The brief allows either; dedicated pages are the stronger choice for a catalog this size.) Within each category page, sub-categories are anchor-linked sections for fast in-page navigation.

---

## 4. Page-by-page wireframes

Notation: each block below is a vertical section of the page, top to bottom.

### 4.1 Global header (every page)

- Left: **Frontier Evora LLC** logo (links home).
- Center/right nav: **Products** (mega-menu ▾), **About Us**, **Resources / Downloads**, **Contact**.
- Far right: **Request a Quote** (yellow primary button) + optional **RFQ list (n)** indicator if the RFQ-cart pattern is used.
- Sticky on scroll (condensed height). Mobile: hamburger → full-screen menu; Products expands to the 13 sections; persistent "Request a Quote" button.
- **Mega-menu (Products ▾):** 3–4 columns listing all 13 sections with a small icon each and a one-line descriptor; a featured tile on the right ("New: SCADA & Monitoring" or "Download full catalog").

### 4.2 Global footer (every page)

- Column 1: logo + one-line positioning + address, phone, email.
- Column 2: Quick links (Products, About, Resources, Request a Quote, Contact).
- Column 3: Product sections (the 13, or top 8 + "View all").
- Column 4: Newsletter signup (email + button) + social icons.
- Trust strip: ISO / quality / standards badges (IEC, UL, TÜV) in a row.
- Bottom bar: © Frontier Evora LLC, Privacy, Terms.

### 4.3 Homepage (`/`)

1. **Hero** — full-width background video or slider of a commercial solar farm / industrial rooftop, blue gradient overlay.
   - Headline: **"Empowering Solar Infrastructure with Premium BOS Solutions."**
   - Sub-headline: *"Your trusted partner for high-grade mounting structures, cabling, and safety systems."*
   - Primary CTA: **Explore Our Catalog** → `/products`. Secondary CTA: **Request a Quote**.
2. **Trust bar** — "Trusted by EPCs and developers" + certification badges (IEC / UL / TÜV / ISO).
3. **Why Choose Frontier Evora** — 4-icon grid: *Utility-Grade Quality*, *UV & Weather-Resistant Materials*, *Fast Fulfillment*, *Industry Compliant*. Each: icon + title + one sentence.
4. **Featured categories** — grid of 6–8 category cards (MMS, Cable Trays, Wires & Cables, Earthing, ACDB/DCDB, Combiner Boxes…) linking into the catalog. "View full catalog →".
5. **Capability / breadth band** — "One supplier, 13 product families, 40–60 BOQ line items covered." Short copy reinforcing single-PO convenience for EPCs.
6. **Standards & compliance** — short section restating the trust line: *"All Frontier Evora products undergo rigorous testing and meet IEC/UL standards for long-term reliability in harsh environmental conditions."*
7. **Resources teaser** — "Download datasheets & the full product catalog" → `/resources`.
8. **CTA band** — blue, "Planning a project? Get a bulk quote." → `/request-a-quote`.
9. Footer.

### 4.4 Catalog landing (`/products`)

1. Page header: title "Product Catalog" + one-line intro + search/filter bar (search by product or category).
2. Grid of **all 13 section cards** (icon, name, item count, blurb, arrow).
3. CTA band + footer.

### 4.5 Product category page template (used by all 13)

This is the workhorse template. Structure:

1. **Breadcrumbs** — Home / Products / [Section].
2. **Category header** — section title, descriptive intro paragraph (what it is, where it's used, why it matters in a solar plant), and a small banner image. Include the relevant standards for that family as chips.
3. **In-page sub-nav** — anchor chips for each sub-category (sticky on scroll) so a spec engineer jumps straight to the sub-type.
4. **Sub-category blocks** — for each sub-category: an H2/H3 heading, a short descriptor, then a **product grid**. Each product card has:
   - High-quality thumbnail (white/ash background)
   - Product name
   - Brief description (1 line)
   - Key attribute chips (size range, material/grade, standard)
   - **Download Datasheet** button
   - **Add to RFQ** action (and/or "Request Quote")
5. **Technical / compliance note** — standards this family meets.
6. **Lead-gen block (bottom of every catalog page, per brief):**
   - **Bulk Order Request Form** — Name, Company, Email, Phone, Project Size (kW/MW), multi-select dropdown of required product categories, message.
   - **Trust signal text:** *"All Frontier Evora products undergo rigorous testing and meet IEC/UL standards for long-term reliability in harsh environmental conditions."*
7. CTA band + footer.

### 4.6 Product detail page (optional deeper tier — `/products/[category]/[product]`)

Use where a product warrants its own page (complex items: ACDB/DCDB, combiner boxes, ESE arresters, data loggers). Structure: breadcrumb → image gallery (left) + summary (right: name, description, attribute chips, Download Datasheet, Add to RFQ, Request Quote) → full **spec table** → "applications" copy → related products → lead-gen block → footer. For simpler commodity items (cable ties, connectors), the card on the category page is sufficient — no separate page needed.

### 4.7 About Us (`/about`)

Company story and mission → capability (manufacturing/sourcing, scale, geographies served) → quality philosophy & testing → certifications wall (ISO / IEC / UL / TÜV badges with short captions) → "Why EPCs choose us" → leadership/team (optional) → CTA band → footer.

### 4.8 Resources / Downloads (`/resources`)

Searchable, filterable library of **all datasheets** and the **full product catalog PDF**, grouped by the 13 sections. Each row: doc name, section tag, file type/size, **Download** button. Optional filter by category. This page is a major SEO and "spec-in" asset — keep all downloads ungated.

### 4.9 Request a Quote (`/request-a-quote`)

Standalone, expanded version of the bulk-order form (see §6) + reassurance copy (response time, what happens next) + trust signals + contact alternatives (phone/email) for buyers who prefer direct contact.

### 4.10 Contact (`/contact`)

Address + embedded map, phone, email, hours, contact form, and the company's certifications strip. Link to Request a Quote for procurement enquiries.

---

## 5. The product catalog — all 13 sections (fully detailed)

Each section below specifies: the category page intro angle, its sub-categories, the **product attributes/spec fields** each product card and datasheet should carry, and the **relevant standards** to display as trust chips. Attribute fields drive both the on-page spec tables and the datasheet template (§9). Standards are shown for context; confirm exact certifications held before publishing (see §7.5 claims note).

### Section 1 — MMS Structures (Module Mounting Structures) · `/products/mms-structures`
*Intro angle:* The structural backbone of every array — engineered for wind/snow loads and decades of outdoor exposure.

| Sub-category | Typical attributes to display |
|---|---|
| Galvanized Iron (GI) Ground Mount Structures | Material & grade, galvanization (HDG, microns e.g. 80µm), wind-speed rating, module orientation, tilt angle, foundation type, warranty |
| Rooftop MMS (Flat & Pitched Roof) | Roof type, ballast vs. penetrating, tilt, material/finish, max module size |
| Tin Shed / Trapezoidal Hooks & Rails | Sheet/profile compatibility, hook type, rail length/section, material |
| Carport Mounting Structures | Span, height clearance, panels supported, load rating, finish |

*Standards/trust chips:* HDG to ISO 1461 / ASTM A123, structural design to applicable wind codes (e.g. ASCE 7 / IS 875), aluminium grade where used.

### Section 2 — Cable Trays & Accessories · `/products/cable-trays`
*Intro angle:* Mechanical protection and clean routing for DC/AC runs across the plant.

| Sub-category | Typical attributes |
|---|---|
| Perforated GI Cable Trays | Width range (50–900mm), height, thickness (gauge), finish (GI/HDG/SS), perforation, load/span |
| Ladder-Type Cable Trays | Rung spacing, width, height, material/finish, load class |
| Wire Mesh Cable Trays | Mesh size, width/height, wire diameter, finish |
| Cable Tray Covers, Bends & Reducers | Type (cover/bend/reducer/tee), radius/angle, matching tray size, material |

*Standards/trust chips:* HDG to ISO 1461, load tested per NEMA VE-1 / IEC 61537.

### Section 3 — FRP Walkways · `/products/frp-walkways`
*Intro angle:* Non-conductive, anti-slip access platforms for safe O&M on solar sites.

| Sub-category | Typical attributes |
|---|---|
| FRP Molded Gratings (Anti-slip) | Panel size, mesh, thickness, load rating, resin (isophthalic/vinyl ester), surface (gritted) |
| FRP Pultruded Walkways | Profile, span, load, color, UV stabilization |
| FRP Handrails & Support Structures | Height, rail config, connectors, color, fire-retardant grade |

*Standards/trust chips:* Anti-slip rating, fire retardancy (ASTM E84 Class 1), corrosion-resistant, non-conductive.

### Section 4 — Wires & Cables · `/products/wires-cables`
*Intro angle:* TÜV-approved DC solar cable and balance AC/comms cabling rated for harsh outdoor PV environments.

| Sub-category | Typical attributes |
|---|---|
| DC Solar Cables (4 / 6 / 10 sq mm) | Cross-section, voltage rating (up to 1.5kV DC), temp range (−40 to +90°C, 120°C short-term), insulation (XLPO/XLPE, halogen-free), TÜV/UL approval, color |
| AC Armoured Cables (Aluminium & Copper) | Conductor (Al/Cu), cores, size, armour type, voltage grade, insulation |
| Communication / RS485 Cables | Pairs, AWG, shielding, impedance, jacket rating |

*Standards/trust chips:* **DC solar cable to IEC 62930 (IEC 131) / EN 50618, UL 4703, TÜV Rheinland approved**; rated 1.5kV DC, −40 to +90°C, halogen-free, UV & weather resistant. *(These standards are near-identical under TÜV solar-cable certification — see Sources at end.)*

### Section 5 — Earthing Protection · `/products/earthing-protection`
*Intro angle:* Reliable grounding for fault protection and equipment safety.

| Sub-category | Typical attributes |
|---|---|
| Hot Dip Galvanized (HDG) Earthing Strips | Size (e.g. 25×3, 50×6mm), material, galvanization microns, length |
| Copper Bonded Earthing Rods | Diameter, length, copper bonding thickness (µm), threading |
| Cast Iron Earthing Pipes | Length, diameter, pipe-in-pipe, terminal |
| Chemical Earthing Compounds (Bentonite / Marconite) | Type, bag/pack size, resistivity, application |

*Standards/trust chips:* IEC 62561 / IS 3043 earthing practice, copper-bonding thickness compliance.

### Section 6 — Lightning Protection · `/products/lightning-protection`
*Intro angle:* Air-termination and arrester systems to protect arrays and structures from strikes.

| Sub-category | Typical attributes |
|---|---|
| Conventional Lightning Arresters (Spike Type) | Material, number of spikes, height, base type |
| ESE (Early Streamer Emission) Arresters | Trigger time (∆T µs), protection radius, material, mounting |
| Lightning Arrester Masts & Bases | Mast height, sections, base type, material/finish |

*Standards/trust chips:* IEC 62305 (LPS), ESE to NF C 17-102, materials per spec.

### Section 7 — Fire Safety Equipment · `/products/fire-safety`
*Intro angle:* Code-compliant fire detection and suppression for solar plant rooms and yards. *(Use `--color-danger` accents sparingly here for warning cues.)*

| Sub-category | Typical attributes |
|---|---|
| CO₂ & DCP Fire Extinguishers | Type (CO₂/DCP), capacity (kg), rating, mounting, refillable |
| Fire Sand Buckets with Stands | Bucket capacity, set size, stand type, finish |
| Automatic Fire Detection & Alarm Panels | Zones, detector types, battery backup, certifications |

*Standards/trust chips:* IS 2190 / NFPA where applicable, BIS-marked extinguishers, panel certifications.

### Section 8 — Cable Management (Ties & Routing) · `/products/cable-management`
*Intro angle:* UV-stable ties, cleats, and clamps that keep cabling secured for the plant's life.

| Sub-category | Typical attributes |
|---|---|
| Stainless Steel (SS) Cable Ties (Grade 304/316) | Grade (304/316), width, length, coated/uncoated, tensile/loop strength |
| UV-Resistant PVC Cable Ties | Length, width, color (UV black), tensile strength, temp range |
| Cable Cleats & Glands | Cable Ø range, material, single/trefoil, IP rating (glands) |
| Metal, PVC & Trefoil Clamps | Type, cable Ø, material/finish, fixing |

*Standards/trust chips:* SS grade 304/316, UV-stabilized (outdoor-rated), cleats short-circuit tested (IEC 61914) where applicable.

### Section 9 — Electrical Distribution (ACDB & DCDB) · `/products/electrical-distribution`
*Intro angle:* Protection and isolation boards engineered for solar AC/DC distribution. *(Strong candidate for product-detail pages — see §4.6.)*

| Sub-category | Typical attributes |
|---|---|
| Solar ACDB (Single & Three Phase) | Phase, rating (A), SPD type, MCB/MCCB config, IP rating, enclosure |
| Solar DCDB | Strings/inputs, DC voltage rating, fuses, DC SPD, isolator, IP rating |
| LT/HT Panels | Voltage class, busbar rating, configuration, protection scheme |

*Standards/trust chips:* IEC 61439 panels, SPD to IEC 61643, enclosure IP65/outdoor-rated.

### Section 10 — Combiner & Junction Boxes · `/products/combiner-junction-boxes`
*Intro angle:* String aggregation with protection and optional monitoring.

| Sub-category | Typical attributes |
|---|---|
| String Combiner Boxes (SCB) | Inputs, fuse rating, DC SPD, isolator, monitoring option, IP rating |
| Array Junction Boxes (AJB) with String Monitoring | Strings, monitoring (per-string current), comms, IP rating |
| Main Junction Boxes (MJB) | Capacity, busbar, protection, IP rating |

*Standards/trust chips:* IP65 enclosure, IEC 61439 / IEC 60529, DC SPD IEC 61643.

### Section 11 — Connectors & Tools · `/products/connectors-tools`
*Intro angle:* Genuine MC4-compatible connectors and the tools to terminate them correctly.

| Sub-category | Typical attributes |
|---|---|
| MC4 Connectors (Male/Female Pairs) | Current rating, voltage (1.5kV), cable Ø range, IP rating, TÜV |
| Y-Branch & T-Branch MC4 Connectors | Branch config, rating, compatibility |
| Solar Wire Stripping & Crimping Tools | Tool type, cable sizes supported, kit contents |

*Standards/trust chips:* TÜV/UL, IP68 mated, 1.5kV DC rated.

### Section 12 — SCADA & Weather Monitoring · `/products/scada-monitoring`
*Intro angle:* Sensing and data acquisition for performance monitoring and plant analytics.

| Sub-category | Typical attributes |
|---|---|
| Solar Data Loggers | Channels, protocols (Modbus/RS485), connectivity, storage, compatibility |
| Pyranometers (Irradiance Sensors) | Class (ISO 9060 Class A/B/C), spectral range, output, accuracy |
| Anemometers, Module Temperature Sensors | Range, accuracy, output signal, mounting |

*Standards/trust chips:* ISO 9060 (pyranometers), Modbus/RS485 compatibility, IP-rated.

### Section 13 — Safety & Warning Signage · `/products/safety-signage`
*Intro angle:* Compliance signage and lockout kits for safe plant operation. *(Use `--color-danger` cues.)*

| Sub-category | Typical attributes |
|---|---|
| Danger Boards (High-Voltage warnings) | Size, material, voltage class, language, reflective option |
| LOTO (Lockout/Tagout) Kits | Kit contents, lock type, tags, station/board |
| Solar Array Identification Labels | Material (UV/weatherproof), size, print, adhesive |

*Standards/trust chips:* Weatherproof/UV materials, electrical-safety signage compliance, OSHA-style LOTO.

### 5.4 Catalog data model (for the developer)

Whether built static or CMS-driven, model the catalog as:

- **Category** { slug, name, intro, icon, standards[], order }
- **SubCategory** { slug, name, descriptor, categorySlug, order }
- **Product** { slug, name, shortDescription, subCategorySlug, thumbnail, images[], attributes[{label,value}], standards[], datasheetUrl, longDescription?, hasDetailPage }

This makes adding products trivial and keeps spec tables, cards, and the Resources library all reading from one source. A headless CMS (e.g. Sanity, Contentful, or even MDX files in-repo) is recommended so the client can add products without a developer.

---

## 6. Lead generation & forms

### 6.1 Bulk Order Request Form (the core conversion asset)

Appears at the **bottom of every catalog page** and as the standalone `/request-a-quote` page.

**Fields:**

- Name *(required)*
- Company *(required)*
- Email *(required, validated)*
- Phone *(required)*
- Project Size — kW / MW *(numeric + unit toggle)*
- Required Product Categories *(multi-select dropdown of the 13 sections — pre-filled with the current category when submitted from a category page)*
- Project location / timeline *(optional, helps sales qualify)*
- Message / BOQ notes *(optional textarea; allow file attach for a BOQ if feasible)*
- Consent checkbox (privacy)

**Behavior:**

- Spam protection: honeypot + invisible captcha (e.g. reCAPTCHA v3 / Turnstile).
- On submit: success state with "what happens next + response time"; email routed to sales (and CRM/Sheet/HubSpot if available).
- Pre-fill the category multi-select when launched from a specific category page (reduces friction, improves data quality).

### 6.2 "Add to RFQ" list (recommended enhancement)

A lightweight, no-pricing enquiry list: users add products across categories, then submit the whole list via the bulk-order form (the list auto-populates the categories + product names in the message). Mirrors how EPCs actually buy (one PO, many line items) and meaningfully lifts RFQ quality. No payment, no stored pricing — consistent with a catalog (not transactional e-commerce) model.

### 6.3 Trust signals (reused near every form)

> *"All Frontier Evora products undergo rigorous testing and meet IEC/UL standards for long-term reliability in harsh environmental conditions."*

Plus the certification badge strip (IEC / UL / TÜV / ISO).

### 6.4 Secondary capture

- Newsletter signup (footer) → product updates / new datasheets.
- Datasheet downloads stay **ungated** (do not trade a download for an email — gating kills the "spec-in" goal). Optionally offer an opt-in *after* download.

---

## 7. SEO, technical & content requirements

### 7.1 Keyword strategy (high-intent B2B)

Target buyer-stage, product-specific terms rather than broad "solar" terms. Map one primary keyword cluster per category page, e.g.:

- "perforated GI cable tray supplier", "ladder cable tray manufacturer"
- "TÜV approved DC solar cable 4/6/10 sqmm", "IEC 62930 solar cable"
- "solar module mounting structure manufacturer", "GI ground mount structure"
- "solar ACDB DCDB manufacturer", "string combiner box supplier"
- "copper bonded earthing rod", "chemical earthing compound"
- "ESE lightning arrester supplier", "MC4 connector TÜV"
- Modifiers that signal procurement intent: *supplier, manufacturer, distributor, datasheet, price, bulk, EPC, wholesale, for solar plant*.

Run a dedicated keyword-clustering pass before content writing (a clustering tool/skill can map the full keyword list to these 13 pages).

### 7.2 On-page SEO (every page)

- Unique title tag + meta description per page; H1 once per page = the category/product name.
- Descriptive, keyword-aligned URLs (already defined in §3).
- Image alt text on every product photo (product + key attribute).
- Internal linking: home → categories → sub-categories → related products; breadcrumbs everywhere.
- Datasheet PDFs named descriptively and linked with anchor text.

### 7.3 Structured data (schema.org JSON-LD)

- `Organization` (logo, contact, sameAs socials) on all pages.
- `Product` schema per product (name, image, description, brand, category; omit price/offer since none is shown, or use `Offer` with `availability` only if appropriate).
- `BreadcrumbList` on catalog pages.
- `WebSite` + `SearchAction` if on-site search exists.

### 7.4 Technical SEO & performance

- `sitemap.xml` (auto-generated, includes all category/product pages) + `robots.txt`.
- Core Web Vitals: optimize hero media (compress/lazy-load video, prefer a poster image + lazy video), responsive images (`next/image` or `<picture>`/AVIF/WebP), preconnect fonts.
- Mobile-first responsive (field engineers browse on phones).
- HTTPS, canonical tags, 404 page, fast TTFB (static/SSG where possible).
- Accessibility: semantic headings, color contrast (the blue/yellow/white palette passes AA at the specified values — verify final shades), focus states, alt text, form labels.

### 7.5 Claims & compliance note (important)

The brief asks to state IEC/UL/TÜV compliance and ISO/quality badges. **Before publishing, confirm exactly which certifications Frontier Evora (and each product line) actually holds** and only display badges/standards the company can substantiate. Where a product *meets* a standard vs. is *certified* to it, use precise wording ("manufactured to IEC 62930" vs. "TÜV-certified"). This protects the brand and avoids misrepresentation in a market where buyers verify certificates.

---

## 8. Build roadmap & tech stack

### 8.1 Recommended stack

- **Framework:** Next.js (App Router) + React, deployed on Vercel — gives SSG/ISR for fast, SEO-friendly catalog pages and `next/image` optimization out of the box.
- **Styling:** Tailwind CSS with the design tokens in §2 mapped to the config (colors, type scale, spacing).
- **Content:** headless CMS (Sanity/Contentful) **or** MDX/JSON files in-repo for the catalog (start file-based, migrate to CMS if the client needs self-service editing).
- **Forms:** a form handler/route that emails sales + posts to CRM (HubSpot) or a Google Sheet; spam protection via Turnstile/reCAPTCHA.
- **Analytics:** GA4 + a privacy-friendly alternative optional; track datasheet downloads and RFQ submits as events.
- **Hosting/DNS:** Vercel + custom domain; CDN for PDFs/images.

*(Alternative low-code path if no dev team: Webflow or WordPress + a catalog/CMS plugin can deliver the same structure. Trade-off: less control over performance and the RFQ-cart pattern.)*

### 8.2 Phased delivery

**Phase 1 — Foundation (Weeks 1–2):** design system in code, global header/footer, homepage, catalog landing, one category page fully built as the template, the bulk-order form, Contact, About. Verify on real devices.

**Phase 2 — Full catalog (Weeks 3–5):** build the remaining 12 category pages from the template, populate all sub-categories and products, wire up datasheets, Resources/Downloads library, schema, sitemap.

**Phase 3 — Conversion & polish (Week 6):** RFQ "Add to RFQ" list, CRM/email routing, analytics events, SEO pass (titles/meta/alt/schema), performance/Core Web Vitals tuning, accessibility audit.

**Phase 4 — Launch (Week 7):** content/cert review (§7.5), QA across browsers/devices, 301s if replacing an existing site, submit sitemap to Search Console, go live.

*(Timeline assumes product photography, datasheets, and copy are supplied on schedule — see §9.)*

---

## 9. Asset checklist (what the client must supply)

To build on schedule, Frontier Evora needs to provide:

1. **Logo** in vector (SVG/AI) + favicon.
2. **Brand confirmation** — sign off on final hex values, font choice (Inter vs. Montserrat headlines).
3. **Product photography** — high-res, consistent white/ash background per product (or a list of products to shoot). Hero/lifestyle images of commercial solar farms / industrial rooftops (or budget for licensed stock).
4. **Datasheets (PDF)** for each product — the single most important asset for the "spec-in" goal. Use a consistent datasheet template keyed to the attribute fields in §5.
5. **Product data** — for each product: name, short description, attributes/values, applicable standards, datasheet file. (Populate the §5.4 data model — a spreadsheet works as the intake format.)
6. **Certifications** — copies/badges of every cert held (ISO, IEC, UL, TÜV) for the trust strip and §7.5 verification.
7. **Company content** — About copy, address, phone, email, hours, social links, map location.
8. **Legal** — privacy policy & terms (or approval to draft standard versions).
9. **Routing** — destination email(s) for RFQ/contact, and CRM access if integrating.

### Datasheet template (recommended fields)

Header (logo + product name + model) · product image · description · **specifications table** (the §5 attributes) · **standards/compliance** · dimensions/drawing · packaging/ordering info · company contact + website footer.

---

## 10. Requirements coverage check

Every element of the original brief is mapped above:

- **Visual identity** (palette, typography, vibe, imagery) → §2.
- **Global nav** (mega-menu, Request-a-Quote CTA, footer with certs/newsletter/social) → §4.1, §4.2.
- **Homepage** (hero + headline/sub/CTA, Why-Choose grid, featured categories) → §4.3.
- **Catalog structure** with dedicated pages, thumbnail + name + description + datasheet button per product → §3, §4.5, §5.
- **All 13 sections** with every listed sub-category → §5 (Sections 1–13, including the "added for completeness" 11–13).
- **Lead gen** — bulk order form (Name, Company, Email, Phone, Project Size, multi-select categories) at bottom of every catalog page → §4.5, §6.1.
- **Trust signals** — exact IEC/UL standards statement + cert badges → §6.3, repeated per page.
- Plus added value: URL/sitemap, SEO, schema, data model, tech stack, phased roadmap, asset checklist.

---

## Sources (technical standards referenced)

- IEC 62930 / EN 50618 / UL 4703 solar DC cable standards & TÜV certification: [Jianyun Cable — Solar Cable Certification Standards](https://www.jianyuncable.com/a/blog/solar-cable-certification-standards.html), [FR-Cable — UL4703 vs IEC 62930 vs EN 50618](https://www.fr-cable.com/post/ul4703-vs-iec-62930-vs-en-50618-what-s-the-real-difference-in-solar-cable-standards), [TÜV/IEC 62930 (IEC 131) reference](https://www.kbe-elektrotechnik.com/en/products/solar-cables/kbe-solar-db-h1z2z2-k-vde-tuev-62930-iec-131/)
- B2B solar BOS procurement / EPC engineering-phase spec-in behavior: [Solar Builder — Ground-Mount Solar BOS Buyer's Guide 2026](https://solarbuildermag.com/mounting-solutions-guide/ground-mount-solar-bos-buyers-guide-2026/), [HeadsUp B2B — What is EPC in Solar Energy (2026)](https://www.headsupb2b.com/research/what-is-epc-in-solar-energy)

*Note: standards above are listed for design/context. Confirm Frontier Evora's actual held certifications per product before publishing any compliance claim (see §7.5).*
