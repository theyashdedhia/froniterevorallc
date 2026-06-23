// Download a clean white-background product photo per product from a curated
// slug -> candidate-URL map (sourced via web search), cover-crop to 800x600
// (4:3 — matches ProductCard's aspect-[4/3]) via `sips`, and write to
// public/products/<slug>.jpg. Also merges public/products/attributions.json.
//
// Usage: node scripts/fetch-from-urls.mjs path/to/product-image-urls.json
// Map shape: { "<slug>": { "candidates": ["https://...jpg", ...],
//                          "title": "...", "source": "https://page" }, ... }
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const OUT = new URL("../public/products/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const TARGET_W = 800;
const TARGET_H = 600;
// Browser-like UA so supplier CDNs don't reject the request.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const MAP_PATH =
  process.argv[2] ||
  new URL("../scripts/product-image-urls.json", import.meta.url).pathname;
const MAP = JSON.parse(readFileSync(MAP_PATH, "utf8"));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function download(url, dest, referer) {
  for (let attempt = 0; attempt < 3; attempt++) {
    let res;
    try {
      res = await fetch(url, {
        headers: {
          "User-Agent": UA,
          Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
          ...(referer ? { Referer: referer } : {}),
        },
        redirect: "follow",
      });
    } catch (e) {
      await sleep(800 * (attempt + 1));
      continue;
    }
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 4000) throw new Error("too small");
      writeFileSync(dest, buf);
      return;
    }
    if (res.status === 429 || res.status >= 500) {
      await sleep(1500 * (attempt + 1));
      continue;
    }
    throw new Error(`download ${res.status}`);
  }
  throw new Error("download failed");
}

function coverCrop(src, dest) {
  // `sips` reads jpg/png/webp; format jpeg normalizes the output. Read dims first.
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

const attrPath = join(OUT, "attributions.json");
const attributions = existsSync(attrPath)
  ? JSON.parse(readFileSync(attrPath, "utf8"))
  : {};
const results = { ok: [], failed: [] };
const slugs = Object.keys(MAP);
const force = process.argv.includes("--force");

for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  const entry = MAP[slug];
  const candidates = entry?.candidates ?? [];
  const dest = join(OUT, `${slug}.jpg`);
  if (existsSync(dest) && !force) {
    console.log(`· ${slug} (exists, skip)`);
    results.ok.push(slug);
    continue;
  }
  if (!candidates.length) {
    results.failed.push({ slug, error: "no candidates" });
    console.log(`✗ ${slug} (no candidates)`);
    continue;
  }
  const tmp = join(tmpdir(), `fu_${slug}.img`);
  let used = null;
  for (const url of candidates) {
    try {
      await download(url, tmp, entry.source);
      coverCrop(tmp, dest);
      used = url;
      break;
    } catch (e) {
      await sleep(400);
    }
  }
  rmSync(tmp, { force: true });
  if (used) {
    attributions[slug] = {
      title: entry.title || slug,
      source: entry.source || used,
      image: used,
    };
    results.ok.push(slug);
    console.log(`✓ ${slug}  <- ${used.slice(0, 80)}`);
  } else {
    results.failed.push({ slug, error: "all candidates failed" });
    console.log(`✗ ${slug} (all ${candidates.length} candidates failed)`);
  }
  await sleep(300);
}

writeFileSync(attrPath, JSON.stringify(attributions, null, 2));
console.log(`\nDone. ok=${results.ok.length} failed=${results.failed.length}`);
if (results.failed.length)
  console.log("Failed:", JSON.stringify(results.failed, null, 2));
