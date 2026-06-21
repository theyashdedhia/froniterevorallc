// One-off: download a relevant, CC-licensed photo per product from Openverse,
// cover-crop to 800x600 (4:3 — matches ProductCard's aspect-[4/3]) via `sips`,
// and write to public/products/<slug>.jpg. Also writes attributions.json.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const OUT = new URL("../public/products/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const TARGET_W = 800;
const TARGET_H = 600;
const UA = "FrontierEvoraCatalog/1.0 (image fetch for internal demo)";

// slug -> search query (curated for relevance)
const QUERIES = {
  "gi-ground-mount-fixed-tilt": "solar panel ground mount array field",
  "gi-ground-mount-2p": "solar farm ground mounted panels",
  "rooftop-flat-ballast": "solar panels flat roof",
  "rooftop-pitched-rail": "solar panels pitched roof house",
  "trapezoidal-hooks": "solar panel roof mounting bracket",
  "mounting-rails": "solar panel mounting rail aluminium",
  "carport-single": "solar carport canopy",

  "perforated-gi-tray": "perforated cable tray",
  "ladder-tray": "ladder cable tray",
  "wire-mesh-tray": "wire mesh cable basket tray",
  "tray-accessories-set": "cable tray installation",

  "frp-molded-grating": "fiberglass grating",
  "frp-pultruded-walkway": "industrial walkway grating platform",
  "frp-handrail": "industrial handrail railing",

  "dc-solar-cable-4": "solar cable wire reel",
  "dc-solar-cable-6": "electrical cable copper wire",
  "dc-solar-cable-10": "power cable spool",
  "ac-armoured-al": "armoured power cable",
  "ac-armoured-cu": "copper power cable",
  "rs485-cable": "communication data cable wire",

  "hdg-earthing-strip": "galvanized steel strip metal",
  "copper-bonded-rod": "copper ground rod earthing",
  "cast-iron-earthing-pipe": "grounding electrode pipe",
  "earthing-compound": "bentonite powder bag",

  "spike-arrester": "lightning rod conductor",
  "ese-arrester": "lightning arrester terminal",
  "arrester-mast": "lightning mast tower",

  "co2-extinguisher": "co2 fire extinguisher",
  "dcp-extinguisher": "fire extinguisher red",
  "fire-sand-bucket": "fire sand bucket",
  "fire-alarm-panel": "fire alarm control panel",

  "ss-cable-tie": "stainless steel cable tie",
  "uv-cable-tie": "nylon cable zip tie",
  "cable-cleat": "cable cleat clamp",
  "cable-gland": "cable gland connector",
  "trefoil-clamp": "cable clamp metal",

  "acdb-1ph": "electrical distribution board",
  "acdb-3ph": "electrical distribution panel board",
  "dcdb": "solar dc combiner box",
  "lt-panel": "electrical control panel cabinet",

  "scb": "solar combiner box",
  "ajb": "electrical junction box outdoor",
  "mjb": "electrical junction box industrial",

  "mc4-pair": "mc4 solar connector",
  "mc4-branch": "solar panel connector cable",
  "crimp-tool-kit": "crimping tool pliers",

  "data-logger": "data logger electronic device",
  "pyranometer": "solar irradiance sensor",
  "weather-sensors": "anemometer weather station",

  "danger-board": "high voltage danger sign",
  "loto-kit": "lockout tagout padlock safety",
  "array-label": "warning label sticker electrical",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const looksLikeImage = (u = "") => /\.(jpe?g|png)(\?|$)/i.test(u);

async function searchImage(query) {
  const url =
    "https://api.openverse.org/v1/images/?" +
    new URLSearchParams({
      q: query,
      page_size: "30",
      mature: "false",
      license_type: "all",
    });
  // retry on rate-limit / transient
  let data;
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (res.ok) { data = await res.json(); break; }
    if (res.status === 429 || res.status === 403 || res.status >= 500) {
      await sleep(3000 * (attempt + 1));
      continue;
    }
    throw new Error(`search ${res.status}`);
  }
  if (!data) throw new Error("search rate-limited");

  const candidates = [];
  for (const r of data.results ?? []) {
    if (!r.url) continue;
    const ext = (r.filetype || "").toLowerCase();
    if (!["jpg", "jpeg", "png"].includes(ext) && !looksLikeImage(r.url)) continue;
    const w = r.width || 0;
    const h = r.height || 0;
    if (w && h) {
      if (w < 500 || h < 380) continue;
      const ar = w / h;
      if (ar < 0.6 || ar > 2.8) continue; // skip panoramas / too-tall
    }
    candidates.push(r);
  }
  return candidates; // try them in order until one downloads + validates
}

async function download(url, dest) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 5000) throw new Error("too small");
      writeFileSync(dest, buf);
      return;
    }
    if (res.status === 429 || res.status >= 500) { await sleep(2500 * (attempt + 1)); continue; }
    throw new Error(`download ${res.status}`);
  }
  throw new Error("download rate-limited");
}

function coverCrop(src, dest) {
  // read dimensions
  const out = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", src], {
    encoding: "utf8",
  });
  const w = +(/pixelWidth: (\d+)/.exec(out)?.[1]);
  const h = +(/pixelHeight: (\d+)/.exec(out)?.[1]);
  if (!w || !h) throw new Error("no dims");
  const scale = Math.max(TARGET_W / w, TARGET_H / h);
  const nw = Math.ceil(w * scale);
  const nh = Math.ceil(h * scale);
  // scale up to cover, then center-crop to exact target, output jpeg
  execFileSync("sips", [
    "-s", "format", "jpeg",
    "-s", "formatOptions", "82",
    "-z", String(nh), String(nw),
    "-c", String(TARGET_H), String(TARGET_W),
    src, "--out", dest,
  ]);
}

// merge with any prior attributions so re-runs only fill gaps
const attrPath = join(OUT, "attributions.json");
const attributions = existsSync(attrPath)
  ? JSON.parse(readFileSync(attrPath, "utf8"))
  : {};
const results = { ok: [], failed: [] };
const slugs = Object.keys(QUERIES);

for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  const q = QUERIES[slug];
  const dest = join(OUT, `${slug}.jpg`);
  if (existsSync(dest)) { console.log(`· ${slug} (exists, skip)`); continue; }
  const tmp = join(tmpdir(), `fe_${slug}.img`);
  try {
    const candidates = await searchImage(q);
    if (!candidates.length) throw new Error("no result");
    let used = null;
    for (const hit of candidates.slice(0, 6)) {
      try {
        await download(hit.url, tmp);
        coverCrop(tmp, dest);
        used = hit;
        break;
      } catch (e) {
        await sleep(800);
      }
    }
    rmSync(tmp, { force: true });
    if (!used) throw new Error("all candidates failed");
    attributions[slug] = {
      title: used.title,
      creator: used.creator,
      license: `CC ${used.license?.toUpperCase()} ${used.license_version ?? ""}`.trim(),
      source: used.foreign_landing_url,
      query: q,
    };
    results.ok.push(slug);
    console.log(`✓ ${slug}  <- ${q}`);
  } catch (e) {
    results.failed.push({ slug, error: String(e.message || e) });
    console.log(`✗ ${slug}  (${e.message || e})`);
  }
  await sleep(1500); // be polite to the API
}

writeFileSync(attrPath, JSON.stringify(attributions, null, 2));
console.log(`\nDone. ok=${results.ok.length} failed=${results.failed.length}`);
if (results.failed.length) console.log("Failed:", JSON.stringify(results.failed, null, 2));
