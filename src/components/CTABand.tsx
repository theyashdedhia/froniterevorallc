import Link from "next/link";

export default function CTABand({
  title = "Planning a project? Get a bulk quote.",
  subtitle = "Tell us your project size and the categories you need — our team responds fast with pricing and availability.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-5 px-4 py-12 text-center md:flex-row md:px-6 md:text-left">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
          <p className="mt-2 max-w-2xl text-white/75">{subtitle}</p>
        </div>
        <Link
          href="/request-a-quote"
          className="shrink-0 rounded-md bg-accent px-6 py-3 font-bold text-primary transition hover:brightness-95"
        >
          Request a Quote
        </Link>
      </div>
    </section>
  );
}
