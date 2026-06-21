// Fill remaining product images from Wikimedia Commons (no auth, high limits).
// Cover-crops to 800x600 via sips. Skips slugs that already have a file.
import { execFileSync } from "node:child_process";
import { writeFileSync, rmSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const OUT = new URL("../public/products/", import.meta.url).pathname;
const TARGET_W = 800, TARGET_H = 600;
const UA = "FrontierEvoraCatalog/1.0 (https://frontierevora.example; internal demo) node-fetch";

const QUERIES = {
  "rooftop-flat-ballast": "rooftop solar panels installation",
  "trapezoidal-hooks": "solar roof mounting bracket",
  "mounting-rails": "aluminium profile extrusion rail",
  "perforated-gi-tray": "cable tray",
  "wire-mesh-tray": "wire mesh cable tray",
  "frp-molded-grating": "fiberglass grating",
  "frp-pultruded-walkway": "grating walkway industrial",
  "dc-solar-cable-4": "electrical cable reel",
  "dc-solar-cable-6": "copper electrical wire",
  "ac-armoured-cu": "power cable copper",
  "rs485-cable": "data cable",
  "hdg-earthing-strip": "galvanized steel flat bar",
  "earthing-compound": "bentonite",
  "ese-arrester": "lightning rod",
  "co2-extinguisher": "carbon dioxide fire extinguisher",
  "ss-cable-tie": "cable tie",
  "uv-cable-tie": "cable ties nylon",
  "cable-cleat": "cable clamp",
  "cable-gland": "cable gland",
  "acdb-1ph": "electrical distribution board",
  "acdb-3ph": "electrical switchboard panel",
  "dcdb": "combiner box solar",
  "lt-panel": "electrical control cabinet",
  "scb": "solar combiner box",
  "ajb": "junction box electrical",
  "mjb": "electrical junction box",
  "mc4-pair": "MC4 connector",
  "mc4-branch": "solar cable connector",
  "crimp-tool-kit": "crimping pliers tool",
  "data-logger": "data logger",
  "pyranometer": "pyranometer",
  "loto-kit": "lockout tagout",
  "array-label": "warning sign electrical",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function searchCommons(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      format: "json",
      generator: "search",
      gsrnamespace: "6",
      gsrsearch: query + " filetype:bitmap",
      gsrlimit: "20",
      prop: "imageinfo",
      iiprop: "url|size|mime",
      iiurlwidth: "1100",
    });
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`search ${res.status}`);
  const data = await res.json();
  const pages = Object.values(data?.query?.pages ?? {});
  const cands = [];
  for (const pg of pages) {
    const ii = pg.imageinfo?.[0];
    if (!ii) continue;
    if (!["image/jpeg", "image/png"].includes(ii.mime)) continue;
    if ((ii.width || 0) < 600 || (ii.height || 0) < 450) continue;
    const ar = ii.width / ii.height;
    if (ar < 0.6 || ar > 2.8) continue;
    cands.push({ src: ii.thumburl || ii.url, page: pg.title });
  }
  return cands;
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) throw new Error(`dl ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("too small");
  writeFileSync(dest, buf);
}

function coverCrop(src, dest) {
  const out = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", src], { encoding: "utf8" });
  const w = +(/pixelWidth: (\d+)/.exec(out)?.[1]);
  const h = +(/pixelHeight: (\d+)/.exec(out)?.[1]);
  if (!w || !h) throw new Error("no dims");
  const scale = Math.max(TARGET_W / w, TARGET_H / h);
  execFileSync("sips", [
    "-s", "format", "jpeg", "-s", "formatOptions", "82",
    "-z", String(Math.ceil(h * scale)), String(Math.ceil(w * scale)),
    "-c", String(TARGET_H), String(TARGET_W),
    src, "--out", dest,
  ]);
}

const attrPath = join(OUT, "attributions.json");
const attributions = existsSync(attrPath) ? JSON.parse(readFileSync(attrPath, "utf8")) : {};
let ok = 0; const failed = [];

for (const [slug, q] of Object.entries(QUERIES)) {
  const dest = join(OUT, `${slug}.jpg`);
  if (existsSync(dest)) { console.log(`· ${slug} (exists)`); continue; }
  const tmp = join(tmpdir(), `fc_${slug}.img`);
  try {
    const cands = await searchCommons(q);
    if (!cands.length) throw new Error("no result");
    let used = null;
    for (const c of cands.slice(0, 6)) {
      try { await download(c.src, tmp); coverCrop(tmp, dest); used = c; break; }
      catch { await sleep(400); }
    }
    rmSync(tmp, { force: true });
    if (!used) throw new Error("all candidates failed");
    attributions[slug] = { source: "https://commons.wikimedia.org/wiki/" + encodeURIComponent(used.page), license: "Wikimedia Commons", query: q };
    ok++; console.log(`✓ ${slug}  <- ${q}`);
  } catch (e) {
    failed.push({ slug, error: String(e.message || e) });
    console.log(`✗ ${slug}  (${e.message || e})`);
  }
  await sleep(500);
}

writeFileSync(attrPath, JSON.stringify(attributions, null, 2));
console.log(`\nDone. ok=${ok} failed=${failed.length}`);
if (failed.length) console.log(JSON.stringify(failed, null, 2));
