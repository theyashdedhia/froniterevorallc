import Image from "next/image";

type Brand = { name: string; file: string };

// Manufacturers we supply — logos sourced from our brand catalog.
const brands: Brand[] = [
  { name: "ABB", file: "abb" },
  { name: "Schneider Electric", file: "schneider-electric" },
  { name: "Philips", file: "philips" },
  { name: "GEWISS", file: "gewiss" },
  { name: "Ducab", file: "ducab" },
  { name: "Furse", file: "furse" },
  { name: "Raychem RPG", file: "raychem-rpg" },
  { name: "Makita", file: "makita" },
  { name: "Stanley", file: "stanley" },
  { name: "Tridonic", file: "tridonic" },
  { name: "Brennenstuhl", file: "brennenstuhl" },
  { name: "Decoduct", file: "decoduct" },
  { name: "Khind", file: "khind" },
  { name: "Atkore Flexicon", file: "atkore-flexicon" },
  { name: "Cellpack", file: "cellpack" },
  { name: "Davis", file: "davis" },
  { name: "MESC", file: "mesc" },
  { name: "National Cables Industry", file: "national-cables-industry" },
  { name: "CopperPlus", file: "copperplus" },
  { name: "Elmex", file: "elmex" },
  { name: "RAKCAB", file: "rakcab" },
  { name: "Escalux", file: "escalux" },
  { name: "Tenka Solar", file: "tenka-solar" },
];

export default function BrandsWeSupply() {
  return (
    <section aria-labelledby="brands-heading" className="bg-white">
      <div className="mx-auto w-full max-w-content px-4 py-20 md:px-6 md:py-24">
        <div className="text-center">
          <span className="mx-auto inline-flex items-center rounded-full border border-accent/30 bg-ash px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
            Our Manufacturers
          </span>
          <h2 id="brands-heading" className="mt-4 font-serif text-3xl font-bold text-primary md:text-4xl">
            Brands We Supply
          </h2>
          <p className="mt-2 italic text-muted">
            Genuine components from the world&apos;s leading electrical manufacturers
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brands.map((b) => (
            <li key={b.file}>
              <div className="flex h-24 items-center justify-center rounded-card border border-line bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_16px_35px_-15px_rgba(83,131,102,0.4)]">
                <Image
                  src={`/brands/${b.file}.png`}
                  alt={`${b.name} logo`}
                  width={160}
                  height={110}
                  className="max-h-14 w-auto object-contain"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
