import Icon from "./Icon";

const items = ["IEC", "UL", "TÜV Rheinland", "ISO 9001", "EN 50618"];

export default function TrustBar() {
  return (
    <div className="border-y border-line bg-ash">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-4 py-5 md:flex-row md:justify-between md:px-6">
        <p className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Icon name="shield" className="h-5 w-5 text-accent-alt" />
          Trusted by EPCs &amp; developers — built to international standards
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {items.map((s) => (
            <span key={s} className="rounded border border-line bg-white px-3 py-1 text-xs font-semibold text-muted">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
