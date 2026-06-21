// Lightweight inline SVG icon set (no external dependency).
// Category icons + utility icons, all stroke = currentColor.

type IconProps = { name: string; className?: string };

const paths: Record<string, React.ReactNode> = {
  structure: (
    <>
      <path d="M3 20h18M5 20l3-12h8l3 12M9 8V5h6v3" />
      <path d="M7 14h10" />
    </>
  ),
  tray: (
    <>
      <path d="M3 7h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7Z" />
      <path d="M7 7V5M12 7V5M17 7V5" />
    </>
  ),
  walkway: (
    <>
      <path d="M4 18 8 6M20 18 16 6M6 12h12M7 9h10M5 15h14" />
    </>
  ),
  cable: (
    <>
      <path d="M4 7a3 3 0 0 1 6 0v10a3 3 0 0 0 6 0" />
      <path d="M2 7h4M18 17h4" />
    </>
  ),
  earth: (
    <>
      <path d="M12 3v9M6 12h12M8 16h8M10 20h4" />
    </>
  ),
  lightning: (
    <>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </>
  ),
  fire: (
    <>
      <path d="M12 3c1 4 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 .5 2 2 2 2 2 0-3-1-5 1-7Z" />
    </>
  ),
  tie: (
    <>
      <path d="M5 8h12a3 3 0 0 1 0 6H5a2 2 0 0 1 0-4h10" />
      <path d="M5 8v8" />
    </>
  ),
  panel: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h8M8 15h4" />
    </>
  ),
  box: (
    <>
      <path d="M3 7l9-4 9 4-9 4-9-4Z" />
      <path d="M3 7v8l9 4 9-4V7" />
    </>
  ),
  connector: (
    <>
      <rect x="3" y="8" width="8" height="8" rx="2" />
      <path d="M11 12h4M19 12h2M15 9v6" />
    </>
  ),
  sensor: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </>
  ),
  sign: (
    <>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12l4 4 10-10" />,
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  truck: (
    <>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

export default function Icon({ name, className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.box}
    </svg>
  );
}
