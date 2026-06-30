// Catalog data model — the single source of truth for the product catalog.
// To add products: append to a sub-category's `products` array. To add a category:
// append a Category object. Pages, cards, spec tables, sitemap and the Resources
// library all read from here. See docs/Frontier-Evora-Website-Plan.md §5.

export type Attribute = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  attributes: Attribute[];
  standards: string[];
};

export type SubCategory = {
  slug: string;
  name: string;
  descriptor: string;
  products: Product[];
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  icon: string; // key into the Icon component
  standards: string[];
  subCategories: SubCategory[];
};

// Helper to keep product entries terse.
const p = (
  slug: string,
  name: string,
  shortDescription: string,
  attributes: Attribute[],
  standards: string[]
): Product => ({ slug, name, shortDescription, attributes, standards });

export const categories: Category[] = [
  {
    slug: "mms-structures",
    name: "MMS Structures",
    tagline: "Module Mounting Structures",
    intro:
      "The structural backbone of every array — engineered for wind and snow loads and decades of outdoor exposure. Hot-dip galvanized and aluminium systems for ground, rooftop, tin-shed and carport installations.",
    icon: "structure",
    standards: ["HDG to ISO 1461 / ASTM A123", "Wind design to ASCE 7 / IS 875"],
    subCategories: [
      {
        slug: "gi-ground-mount",
        name: "Galvanized Iron (GI) Ground Mount Structures",
        descriptor: "Utility-scale ground-mount frames with hot-dip galvanized protection.",
        products: [
          p("gi-ground-mount-fixed-tilt", "GI Fixed-Tilt Ground Mount", "Hot-dip galvanized fixed-tilt structure for utility ground-mount arrays.", [
            { label: "Material", value: "GI / HDG steel" },
            { label: "Galvanization", value: "80 µm (HDG)" },
            { label: "Wind rating", value: "Up to 180 km/h" },
            { label: "Tilt", value: "10°–30° (configurable)" },
            { label: "Foundation", value: "Ramming / pile / concrete" },
          ], ["ISO 1461", "ASTM A123"]),
        ],
      },
      {
        slug: "rooftop-mms",
        name: "Rooftop MMS (Flat & Pitched Roof)",
        descriptor: "Ballasted and penetrating systems for flat and pitched roofs.",
        products: [
          p("rooftop-pitched-rail", "Roof Rail System", "Rail-and-clamp system for pitched/metal roofs.", [
            { label: "Roof type", value: "Pitched / metal" },
            { label: "Mounting", value: "Penetrating with flashing" },
            { label: "Material", value: "Anodized aluminium" },
          ], []),
        ],
      },
      {
        slug: "tin-shed-trapezoidal",
        name: "Tin Shed / Trapezoidal Hooks & Rails",
        descriptor: "Hooks and rails matched to trapezoidal and tin-sheet profiles.",
        products: [
          p("mounting-rails", "Aluminium/Trapezoidal Mounting Rails", "Structural rails for tin-shed and metal-roof arrays.", [
            { label: "Section", value: "40×40 / 41×35 mm" },
            { label: "Length", value: "3.3 m / 4.4 m" },
            { label: "Material", value: "Aluminium 6063-T6" },
          ], []),
        ],
      },
      {
        slug: "carport",
        name: "Carport Mounting Structures",
        descriptor: "Single and double-row solar carport canopies.",
        products: [
          p("carport-single", "Single-Row Solar Carport", "Steel carport canopy with integrated module mounting.", [
            { label: "Span", value: "5.0–5.5 m" },
            { label: "Clearance", value: "2.2–2.5 m" },
            { label: "Load rating", value: "Designed to local wind/snow code" },
            { label: "Finish", value: "HDG + optional powder coat" },
          ], ["ISO 1461"]),
        ],
      },
    ],
  },
  {
    slug: "cable-trays",
    name: "Cable Trays & Accessories",
    tagline: "Routing & mechanical protection",
    intro:
      "Mechanical protection and clean routing for DC and AC runs across the plant. Perforated, ladder and wire-mesh trays with matching covers, bends and reducers.",
    icon: "tray",
    standards: ["HDG to ISO 1461", "Load tested to NEMA VE-1 / IEC 61537"],
    subCategories: [
      {
        slug: "perforated-gi",
        name: "Perforated GI Cable Trays",
        descriptor: "Ventilated trays for DC string and AC cabling.",
        products: [
          p("perforated-gi-tray", "Perforated GI Cable Tray", "Hot-dip galvanized perforated tray for solar cable runs.", [
            { label: "Width", value: "50–900 mm" },
            { label: "Height", value: "25 / 50 / 75 mm" },
            { label: "Thickness", value: "1.6 / 2.0 mm" },
            { label: "Finish", value: "GI / HDG / SS" },
          ], ["ISO 1461", "IEC 61537"]),
        ],
      },
      {
        slug: "ladder-type",
        name: "Ladder-Type Cable Trays",
        descriptor: "High-capacity ladder trays for heavy cable loads.",
        products: [
          p("ladder-tray", "Ladder-Type Cable Tray", "Rung-style tray for long spans and heavy loads.", [
            { label: "Rung spacing", value: "150 / 300 mm" },
            { label: "Width", value: "150–900 mm" },
            { label: "Finish", value: "HDG / pre-galvanized" },
          ], ["NEMA VE-1"]),
        ],
      },
      {
        slug: "wire-mesh",
        name: "Wire Mesh Cable Trays",
        descriptor: "Lightweight mesh baskets for flexible routing.",
        products: [
          p("wire-mesh-tray", "Wire Mesh Cable Tray", "Welded steel mesh basket tray, electro-galvanized or HDG.", [
            { label: "Mesh", value: "50×100 mm" },
            { label: "Wire Ø", value: "4.0 / 5.0 mm" },
            { label: "Finish", value: "EG / HDG / SS 304" },
          ], []),
        ],
      },
      {
        slug: "tray-accessories",
        name: "Cable Tray Covers, Bends & Reducers",
        descriptor: "Covers, bends, tees and reducers to complete the run.",
        products: [
          p("tray-accessories-set", "Tray Covers, Bends & Reducers", "Matching accessories for any tray width.", [
            { label: "Types", value: "Cover / bend / tee / reducer" },
            { label: "Angles", value: "45° / 90°" },
            { label: "Finish", value: "Matches base tray" },
          ], []),
        ],
      },
    ],
  },
  {
    slug: "frp-walkways",
    name: "FRP Walkways",
    tagline: "Non-conductive access platforms",
    intro:
      "Non-conductive, anti-slip access platforms for safe O&M on solar sites. Molded and pultruded FRP gratings, walkways and handrails with UV stabilization.",
    icon: "walkway",
    standards: ["Anti-slip gritted surface", "Fire retardant ASTM E84 Class 1", "Non-conductive"],
    subCategories: [
      {
        slug: "molded-gratings",
        name: "FRP Molded Gratings (Anti-slip)",
        descriptor: "Corrosion-proof molded gratings with gritted top.",
        products: [
          p("frp-molded-grating", "FRP Molded Grating", "Anti-slip molded grating for walkways and platforms.", [
            { label: "Panel", value: "1 m × 3 m / 1.2 m × 3.66 m" },
            { label: "Thickness", value: "25 / 38 / 50 mm" },
            { label: "Resin", value: "Isophthalic / vinyl ester" },
            { label: "Surface", value: "Gritted anti-slip" },
          ], ["ASTM E84 Class 1"]),
        ],
      },
      {
        slug: "pultruded-walkways",
        name: "FRP Pultruded Walkways",
        descriptor: "High-strength pultruded walkway sections.",
        products: [
          p("frp-pultruded-walkway", "FRP Pultruded Walkway", "Lightweight, high-strength walkway profile.", [
            { label: "Profile", value: "Pultruded plank" },
            { label: "Span", value: "Up to 1.5 m unsupported" },
            { label: "UV", value: "UV-stabilized" },
          ], []),
        ],
      },
      {
        slug: "frp-handrails",
        name: "FRP Handrails & Support Structures",
        descriptor: "Non-conductive handrails and support framing.",
        products: [
          p("frp-handrail", "FRP Handrail System", "Corrosion-resistant handrail with connectors.", [
            { label: "Height", value: "1.0 / 1.1 m" },
            { label: "Config", value: "Top rail + mid rail + toe board" },
            { label: "Grade", value: "Fire-retardant FRP" },
          ], []),
        ],
      },
    ],
  },
  {
    slug: "wires-cables",
    name: "Wires & Cables",
    tagline: "DC, AC & communication cabling",
    intro:
      "TÜV-approved DC solar cable and balance AC/communication cabling rated for harsh outdoor PV environments — halogen-free, UV and weather resistant, rated to 1.5 kV DC.",
    icon: "cable",
    standards: ["IEC 62930 (IEC 131)", "EN 50618", "UL 4703", "TÜV Rheinland approved"],
    subCategories: [
      {
        slug: "dc-solar-cables",
        name: "DC Solar Cables (TÜV Approved)",
        descriptor: "Single-core PV cable in 4, 6 and 10 sq mm.",
        products: [
          p("dc-solar-cable-4", "DC Solar Cable — 4 sq mm", "TÜV-approved halogen-free DC PV cable, 4 sq mm.", [
            { label: "Cross-section", value: "4 sq mm" },
            { label: "Voltage", value: "1.5 kV DC" },
            { label: "Temp range", value: "−40 °C to +90 °C (120 °C short-term)" },
            { label: "Insulation", value: "XLPO, halogen-free" },
          ], ["IEC 62930", "EN 50618", "TÜV"]),
          p("dc-solar-cable-6", "DC Solar Cable — 6 sq mm", "TÜV-approved halogen-free DC PV cable, 6 sq mm.", [
            { label: "Cross-section", value: "6 sq mm" },
            { label: "Voltage", value: "1.5 kV DC" },
            { label: "Temp range", value: "−40 °C to +90 °C" },
          ], ["IEC 62930", "EN 50618", "TÜV"]),
          p("dc-solar-cable-10", "DC Solar Cable — 10 sq mm", "TÜV-approved halogen-free DC PV cable, 10 sq mm.", [
            { label: "Cross-section", value: "10 sq mm" },
            { label: "Voltage", value: "1.5 kV DC" },
            { label: "Insulation", value: "XLPO, UV resistant" },
          ], ["IEC 62930", "UL 4703", "TÜV"]),
        ],
      },
      {
        slug: "ac-armoured-cables",
        name: "AC Armoured Cables (Aluminium & Copper)",
        descriptor: "Armoured LT power cables for AC distribution.",
        products: [
          p("ac-armoured-al", "AC Armoured Cable — Aluminium", "XLPE armoured aluminium conductor power cable.", [
            { label: "Conductor", value: "Aluminium" },
            { label: "Cores", value: "3.5C / 4C" },
            { label: "Armour", value: "GI strip / wire" },
            { label: "Grade", value: "1.1 kV" },
          ], ["IS 7098 / IEC 60502"]),
          p("ac-armoured-cu", "AC Armoured Cable — Copper", "XLPE armoured copper conductor power cable.", [
            { label: "Conductor", value: "Copper" },
            { label: "Cores", value: "Multi-core" },
            { label: "Grade", value: "1.1 kV" },
          ], ["IEC 60502"]),
        ],
      },
      {
        slug: "communication-cables",
        name: "Communication / RS485 Cables",
        descriptor: "Shielded data cables for monitoring & SCADA.",
        products: [
          p("rs485-cable", "RS485 / Communication / CAT6 Cable", "Shielded twisted-pair cable for Modbus/RS485 networks.", [
            { label: "Pairs", value: "1 / 2 pair" },
            { label: "Gauge", value: "22 / 24 AWG" },
            { label: "Shield", value: "Foil + braid" },
            { label: "Jacket", value: "UV-resistant PVC" },
          ], []),
        ],
      },
    ],
  },
  {
    slug: "earthing-protection",
    name: "Earthing Protection",
    tagline: "Grounding & fault protection",
    intro:
      "Reliable grounding for fault protection and equipment safety — galvanized strips, copper-bonded rods, cast-iron pipes and chemical earthing compounds.",
    icon: "earth",
    standards: ["IEC 62561", "IS 3043 earthing practice"],
    subCategories: [
      {
        slug: "hdg-earthing-strips",
        name: "Hot Dip Galvanized (HDG) Earthing Strips",
        descriptor: "Galvanized steel earthing/bonding strips.",
        products: [
          p("hdg-earthing-strip", "HDG Earthing Strip", "Hot-dip galvanized earthing strip for grounding grids.", [
            { label: "Size", value: "25×3 / 50×6 mm" },
            { label: "Material", value: "MS, hot-dip galvanized" },
            { label: "Galvanization", value: "≥ 70 µm" },
          ], ["IS 3043"]),
        ],
      },
      {
        slug: "copper-bonded-rods",
        name: "Copper Bonded Earthing Rods",
        descriptor: "Copper-bonded steel rods for low-resistance earthing.",
        products: [
          p("copper-bonded-rod", "Copper Bonded Earthing Rod", "Molecularly bonded copper-over-steel earth rod.", [
            { label: "Diameter", value: "14.2 / 17.2 mm" },
            { label: "Length", value: "1 m / 2 m / 3 m" },
            { label: "Copper bonding", value: "250 µm" },
            { label: "Thread", value: "Rolled, couplable" },
          ], ["IEC 62561"]),
        ],
      },
      {
        slug: "cast-iron-pipes",
        name: "Cast Iron Earthing Pipes",
        descriptor: "Pipe-in-pipe cast-iron earthing electrodes.",
        products: [
          p("cast-iron-earthing-pipe", "Cast Iron Earthing Pipe", "Pipe-in-pipe earthing electrode with terminal.", [
            { label: "Length", value: "2 m / 3 m" },
            { label: "Type", value: "Pipe-in-pipe" },
            { label: "Terminal", value: "GI bolt terminal" },
          ], []),
        ],
      },
      {
        slug: "chemical-compounds",
        name: "Chemical Earthing Compounds",
        descriptor: "Bentonite and Marconite back-fill compounds.",
        products: [
          p("earthing-compound", "Earthing Back-fill Compound", "Conductive back-fill to lower earth resistance.", [
            { label: "Type", value: "Bentonite / Marconite" },
            { label: "Pack", value: "25 kg bag" },
            { label: "Function", value: "Moisture-retentive, low resistivity" },
          ], []),
        ],
      },
    ],
  },
  {
    slug: "lightning-protection",
    name: "Lightning Protection",
    tagline: "Air termination & arresters",
    intro:
      "Air-termination and arrester systems to protect arrays and structures from direct strikes — conventional spike, ESE and mast/base systems.",
    icon: "lightning",
    standards: ["IEC 62305 (LPS)", "ESE to NF C 17-102"],
    subCategories: [
      {
        slug: "conventional-arresters",
        name: "Conventional Lightning Arresters (Spike Type)",
        descriptor: "Franklin-rod spike air terminals.",
        products: [
          p("spike-arrester", "Spike-Type Lightning Arrester", "Multi-spike copper/SS air terminal.", [
            { label: "Spikes", value: "Single / multi (3–7)" },
            { label: "Material", value: "Copper / SS" },
            { label: "Base", value: "Threaded" },
          ], ["IEC 62305"]),
        ],
      },
      {
        slug: "ese-arresters",
        name: "ESE (Early Streamer Emission) Arresters",
        descriptor: "Wide-radius early-streamer air terminals.",
        products: [
          p("ese-arrester", "ESE Lightning Arrester", "Early-streamer-emission terminal for large protection radius.", [
            { label: "Trigger (ΔT)", value: "25 / 40 / 60 µs" },
            { label: "Protection radius", value: "Up to ~100 m (level/height dependent)" },
            { label: "Material", value: "Stainless steel" },
          ], ["NF C 17-102"]),
        ],
      },
      {
        slug: "masts-bases",
        name: "Lightning Arrester Masts & Bases",
        descriptor: "Support masts and mounting bases.",
        products: [
          p("arrester-mast", "Lightning Arrester Mast & Base", "Sectional mast with mounting base.", [
            { label: "Height", value: "3 / 5 / 7 m" },
            { label: "Sections", value: "Couplable" },
            { label: "Finish", value: "HDG / aluminium" },
          ], []),
        ],
      },
    ],
  },
  {
    slug: "fire-safety",
    name: "Fire Safety Equipment",
    tagline: "Detection & suppression",
    intro:
      "Code-compliant fire detection and suppression for solar plant rooms and yards — extinguishers, sand buckets and automatic detection & alarm panels.",
    icon: "fire",
    standards: ["IS 2190 / NFPA where applicable", "BIS-marked extinguishers"],
    subCategories: [
      {
        slug: "extinguishers",
        name: "CO₂ & DCP Fire Extinguishers",
        descriptor: "Portable extinguishers for electrical fires.",
        products: [
          p("co2-extinguisher", "CO₂ Fire Extinguisher", "Clean-agent extinguisher for electrical (Class C) fires.", [
            { label: "Type", value: "CO₂" },
            { label: "Capacity", value: "2 / 4.5 kg" },
            { label: "Mounting", value: "Wall bracket" },
          ], ["IS 15683"]),
          p("dcp-extinguisher", "DCP Fire Extinguisher", "Dry chemical powder extinguisher, multi-class.", [
            { label: "Type", value: "ABC / BC DCP" },
            { label: "Capacity", value: "4 / 6 / 9 kg" },
            { label: "Refillable", value: "Yes" },
          ], ["IS 15683"]),
        ],
      },
      {
        slug: "sand-buckets",
        name: "Fire Sand Buckets with Stands",
        descriptor: "Sand bucket sets for first-response.",
        products: [
          p("fire-sand-bucket", "Fire Sand Bucket Set", "Painted steel sand buckets with stand.", [
            { label: "Capacity", value: "9 L each" },
            { label: "Set", value: "4 buckets + stand" },
            { label: "Finish", value: "Red enamel" },
          ], []),
        ],
      },
      {
        slug: "alarm-panels",
        name: "Automatic Fire Detection & Alarm Panels",
        descriptor: "Conventional/addressable detection panels.",
        products: [
          p("fire-alarm-panel", "Fire Detection & Alarm Panel", "Zone-based detection and alarm control panel.", [
            { label: "Zones", value: "2 / 4 / 8" },
            { label: "Detectors", value: "Smoke / heat compatible" },
            { label: "Backup", value: "Battery backup" },
          ], []),
        ],
      },
    ],
  },
  {
    slug: "cable-management",
    name: "Cable Management",
    tagline: "Ties, cleats & clamps",
    intro:
      "UV-stable ties, cleats and clamps that keep cabling secured for the plant's life — stainless steel and UV-resistant PVC ties, glands and trefoil clamps.",
    icon: "tie",
    standards: ["SS Grade 304 / 316", "UV-stabilized (outdoor)", "IEC 61914 cleats"],
    subCategories: [
      {
        slug: "ss-cable-ties",
        name: "Stainless Steel (SS) Cable Ties",
        descriptor: "Grade 304/316 ties for harsh environments.",
        products: [
          p("ss-cable-tie", "SS Cable Tie (304 / 316)", "Self-locking stainless steel cable tie.", [
            { label: "Grade", value: "304 / 316" },
            { label: "Width", value: "4.6 / 7.9 mm" },
            { label: "Length", value: "200–600 mm" },
            { label: "Coating", value: "Bare / polyester-coated" },
          ], ["AISI 304 / 316"]),
        ],
      },
      {
        slug: "pvc-cable-ties",
        name: "UV-Resistant PVC Cable Ties",
        descriptor: "UV-black nylon ties for outdoor runs.",
        products: [
          p("uv-cable-tie", "UV-Resistant Nylon Cable Tie", "Weatherproof UV-black self-locking tie.", [
            { label: "Length", value: "100–400 mm" },
            { label: "Color", value: "UV black" },
            { label: "Tensile", value: "8 / 18 / 50 kg" },
            { label: "Temp", value: "−20 °C to +85 °C" },
          ], []),
        ],
      },
      {
        slug: "cleats-glands",
        name: "Cable Cleats & Glands",
        descriptor: "Single and trefoil cleats; IP-rated glands.",
        products: [
          p("cable-cleat", "Cable Cleat (Single / Trefoil)", "Short-circuit-rated cleat for power cables.", [
            { label: "Cable Ø", value: "20–80 mm" },
            { label: "Type", value: "Single / trefoil" },
            { label: "Material", value: "SS 316 / LSF polymer" },
          ], ["IEC 61914"]),
          p("cable-gland", "Cable Gland", "Weatherproof brass/nylon cable gland.", [
            { label: "Cable Ø", value: "Various" },
            { label: "IP rating", value: "IP68" },
            { label: "Material", value: "Brass / nylon" },
          ], []),
        ],
      },
      {
        slug: "clamps",
        name: "Metal, PVC & Trefoil Clamps",
        descriptor: "Routing clamps in metal and polymer.",
        products: [
          p("trefoil-clamp", "Trefoil / Cable Clamp", "Clamp set for single and trefoil cable groups.", [
            { label: "Type", value: "Metal / PVC / trefoil" },
            { label: "Cable Ø", value: "Range to suit" },
            { label: "Finish", value: "Galvanized / polymer" },
          ], []),
        ],
      },
    ],
  },
  {
    slug: "electrical-distribution",
    name: "Electrical Distribution",
    tagline: "ACDB, DCDB & panels",
    intro:
      "Protection and isolation boards engineered for solar AC/DC distribution — ACDBs, DCDBs and LT/HT panels with surge protection and outdoor-rated enclosures.",
    icon: "panel",
    standards: ["IEC 61439 panels", "SPD to IEC 61643", "Enclosure IP65"],
    subCategories: [
      {
        slug: "solar-acdb",
        name: "Solar ACDB (Single & Three Phase)",
        descriptor: "AC distribution boards with surge & breaker protection.",
        products: [
          p("acdb-1ph", "Solar ACDB ", "Single-phase AC combiner/distribution board.", [
            { label: "Phase", value: "1-phase" },
            { label: "Protection", value: "MCB + AC SPD Type 2" },
            { label: "Rating", value: "Up to 63 A" },
            { label: "Enclosure", value: "IP65" },
          ], ["IEC 61439", "IEC 61643"]),
        ],
      },
      {
        slug: "solar-dcdb",
        name: "Solar DCDB",
        descriptor: "DC distribution/combiner boards with fuses & SPD.",
        products: [
          p("dcdb", "Solar DCDB", "DC distribution board with fuses, SPD and isolator.", [
            { label: "Inputs", value: "2 / 4 / 8 strings" },
            { label: "DC voltage", value: "Up to 1000 / 1500 V DC" },
            { label: "Protection", value: "Fuses + DC SPD + isolator" },
            { label: "Enclosure", value: "IP65" },
          ], ["IEC 61439", "IEC 61643"]),
        ],
      },
      {
        slug: "lt-ht-panels",
        name: "LT/HT Panels",
        descriptor: "Low- and high-tension distribution panels.",
        products: [
          p("lt-panel", "LT Distribution Panel", "Custom-built LT panel with protection scheme.", [
            { label: "Voltage class", value: "LT (415 V)" },
            { label: "Busbar", value: "Copper, rated to spec" },
            { label: "Build", value: "IEC 61439 compliant" },
          ], ["IEC 61439"]),
        ],
      },
    ],
  },
  {
    slug: "combiner-junction-boxes",
    name: "Combiner & Junction Boxes",
    tagline: "String aggregation & monitoring",
    intro:
      "String aggregation with protection and optional monitoring — string combiner boxes, array junction boxes with string monitoring, and main junction boxes.",
    icon: "box",
    standards: ["IP65 enclosure (IEC 60529)", "DC SPD IEC 61643", "IEC 61439"],
    subCategories: [
      {
        slug: "string-combiner-boxes",
        name: "String Combiner Boxes (SCB)",
        descriptor: "Combine multiple strings with protection.",
        products: [
          p("scb", "String Combiner Box (SCB)", "Combines strings with fuses, SPD and isolator.", [
            { label: "Inputs", value: "8 / 12 / 16 strings" },
            { label: "Protection", value: "Fuses + DC SPD + isolator" },
            { label: "Monitoring", value: "Optional per-string" },
            { label: "Enclosure", value: "IP65" },
          ], ["IEC 61643", "IEC 60529"]),
        ],
      },
      {
        slug: "array-junction-boxes",
        name: "Array Junction Boxes (AJB) with Monitoring",
        descriptor: "Aggregation with per-string current monitoring.",
        products: [
          p("ajb", "Array Junction Box (AJB)", "AJB with per-string current monitoring and comms.", [
            { label: "Strings", value: "Up to 24" },
            { label: "Monitoring", value: "Per-string current" },
            { label: "Comms", value: "RS485 / Modbus" },
            { label: "Enclosure", value: "IP65" },
          ], ["IEC 61643"]),
        ],
      },
      {
        slug: "main-junction-boxes",
        name: "Main Junction Boxes (MJB)",
        descriptor: "Plant-level aggregation boxes.",
        products: [
          p("mjb", "Main Junction Box (MJB)", "Main aggregation box with busbar and protection.", [
            { label: "Capacity", value: "Plant-level" },
            { label: "Busbar", value: "Copper" },
            { label: "Enclosure", value: "IP65" },
          ], ["IEC 61439"]),
        ],
      },
    ],
  },
  {
    slug: "connectors-tools",
    name: "Connectors & Tools",
    tagline: "MC4 connectors & termination tools",
    intro:
      "Genuine MC4-compatible connectors and the tools to terminate them correctly — straight pairs, Y/T branch connectors, and stripping/crimping tools.",
    icon: "connector",
    standards: ["TÜV / UL", "1.5 kV DC", "IP68 mated"],
    subCategories: [
      {
        slug: "mc4-connectors",
        name: "MC4 Connectors (Male/Female Pairs)",
        descriptor: "Standard PV connector pairs.",
        products: [
          p("mc4-pair", "MC4 Connector Pair", "TÜV/UL-rated male/female PV connector pair.", [
            { label: "Current", value: "30 A" },
            { label: "Voltage", value: "1.5 kV DC" },
            { label: "Cable Ø", value: "4 / 6 / 10 sq mm" },
            { label: "IP rating", value: "IP68 (mated)" },
          ], ["TÜV", "UL"]),
        ],
      },
      {
        slug: "branch-connectors",
        name: "Y-Branch & T-Branch MC4 Connectors",
        descriptor: "Parallel-string branch connectors.",
        products: [
          p("mc4-branch", "Y/T-Branch MC4 Connector", "Branch connector for paralleling strings.", [
            { label: "Config", value: "Y (2-to-1) / T" },
            { label: "Rating", value: "30 A, 1.5 kV DC" },
            { label: "Compatibility", value: "MC4-standard" },
          ], ["TÜV"]),
        ],
      },
      {
        slug: "tools",
        name: "Solar Wire Stripping & Crimping Tools",
        descriptor: "Termination toolkits for PV cable.",
        products: [
          p("crimp-tool-kit", "Solar Crimping & Stripping Tool Kit", "Kit for stripping and crimping MC4 contacts.", [
            { label: "Tools", value: "Stripper + crimper + spanners" },
            { label: "Cable sizes", value: "2.5 / 4 / 6 sq mm" },
            { label: "Case", value: "Included" },
          ], []),
        ],
      },
    ],
  },
  {
    slug: "scada-monitoring",
    name: "SCADA & Weather Monitoring",
    tagline: "Sensing & data acquisition",
    intro:
      "Sensing and data acquisition for performance monitoring and plant analytics — data loggers, pyranometers, anemometers and module-temperature sensors.",
    icon: "sensor",
    standards: ["ISO 9060 (pyranometers)", "Modbus / RS485", "IP-rated"],
    subCategories: [
      {
        slug: "data-loggers",
        name: "Solar Data Loggers",
        descriptor: "Acquire and forward plant data.",
        products: [
          p("data-logger", "Solar Data Logger", "Multi-channel logger with Modbus/RS485 and connectivity.", [
            { label: "Channels", value: "Multi-channel" },
            { label: "Protocols", value: "Modbus RTU/TCP, RS485" },
            { label: "Connectivity", value: "Ethernet / GPRS" },
            { label: "Storage", value: "Onboard + cloud" },
          ], []),
        ],
      },
      {
        slug: "pyranometers",
        name: "Pyranometers (Irradiance Sensors)",
        descriptor: "Measure plane-of-array irradiance.",
        products: [
          p("pyranometer", "Pyranometer (Irradiance Sensor)", "ISO 9060-classified irradiance sensor.", [
            { label: "Class", value: "ISO 9060 Class A / B / C" },
            { label: "Output", value: "0–20 mV / 4–20 mA / Modbus" },
            { label: "Spectral", value: "285–2800 nm" },
          ], ["ISO 9060"]),
        ],
      },
      {
        slug: "weather-sensors",
        name: "Anemometers & Temperature Sensors",
        descriptor: "Wind speed and module/ambient temperature.",
        products: [
          p("weather-sensors", "Anemometer & Temperature Sensors", "Wind-speed and module/ambient temperature sensors.", [
            { label: "Wind range", value: "0–60 m/s" },
            { label: "Temp", value: "Module + ambient (PT100/PT1000)" },
            { label: "Output", value: "Analog / Modbus" },
          ], []),
        ],
      },
    ],
  },
  {
    slug: "safety-signage",
    name: "Safety & Warning Signage",
    tagline: "Signage & lockout",
    intro:
      "Compliance signage and lockout kits for safe plant operation — high-voltage danger boards, LOTO kits and weatherproof array identification labels.",
    icon: "sign",
    standards: ["Weatherproof / UV materials", "Electrical-safety signage", "OSHA-style LOTO"],
    subCategories: [
      {
        slug: "danger-boards",
        name: "Danger Boards (High-Voltage Warnings)",
        descriptor: "Mandatory high-voltage warning boards.",
        products: [
          p("danger-board", "High-Voltage Danger Board", "Weatherproof HV warning board.", [
            { label: "Size", value: "200×150 / 300×200 mm" },
            { label: "Material", value: "ACP / metal" },
            { label: "Finish", value: "Reflective option" },
          ], []),
        ],
      },
      {
        slug: "loto-kits",
        name: "LOTO (Lockout/Tagout) Kits",
        descriptor: "Energy-isolation lockout kits.",
        products: [
          p("loto-kit", "LOTO Kit", "Lockout/tagout kit for safe isolation.", [
            { label: "Contents", value: "Locks + hasps + tags + station" },
            { label: "Lock type", value: "Keyed padlocks" },
            { label: "Station", value: "Wall board included" },
          ], []),
        ],
      },
      {
        slug: "array-labels",
        name: "Solar Array Identification Labels",
        descriptor: "UV-stable identification & circuit labels.",
        products: [
          p("array-label", "Solar Array Identification Label", "Weatherproof UV-stable identification label.", [
            { label: "Material", value: "UV/weatherproof vinyl / engraved" },
            { label: "Size", value: "Custom" },
            { label: "Adhesive", value: "Outdoor-grade" },
          ], []),
        ],
      },
    ],
  },
  {
    slug: "energy-storage",
    name: "Energy Storage Solutions",
    tagline: "Battery storage systems",
    intro:
      "Scalable battery energy storage for commercial and industrial solar plants — peak shaving, load shifting and backup power with integrated battery management and safety.",
    icon: "bolt",
    standards: ["IEC 62619", "UL 1973", "IEC 62933 (BESS)"],
    subCategories: [
      {
        slug: "commercial-battery-systems",
        name: "Commercial Solar Battery Systems",
        descriptor: "Integrated C&I battery energy storage systems.",
        products: [
          p("com-solar-battery", "Commercial Solar Battery System", "Integrated lithium battery energy storage system for commercial and industrial solar.", [
            { label: "Chemistry", value: "LiFePO₄ (LFP)" },
            { label: "Capacity", value: "Modular, scalable kWh–MWh" },
            { label: "Voltage", value: "Low / high voltage configurations" },
            { label: "Management", value: "Integrated BMS + EMS" },
            { label: "Enclosure", value: "Outdoor-rated, IP-protected" },
          ], ["IEC 62619", "UL 1973", "IEC 62933"]),
        ],
      },
    ],
  },
];

export const TRUST_STATEMENT =
  "All Frontier Evora products undergo rigorous testing and meet IEC/UL standards for long-term reliability in harsh environmental conditions.";

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function categorySlugs(): string[] {
  return categories.map((c) => c.slug);
}

export function allProducts(): { category: Category; sub: SubCategory; product: Product }[] {
  const out: { category: Category; sub: SubCategory; product: Product }[] = [];
  for (const category of categories) {
    for (const sub of category.subCategories) {
      for (const product of sub.products) {
        out.push({ category, sub, product });
      }
    }
  }
  return out;
}
