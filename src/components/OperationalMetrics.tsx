"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

type Stat = {
  icon: string;
  /** Numeric target enables a count-up animation; omit for text headlines. */
  countTo?: number;
  /** Text shown after the number (count-up) or as the whole headline. */
  headline: string;
  suffix?: string;
  subheading: string;
  description: string;
};

const stats: Stat[] = [
  {
    icon: "handshake",
    countTo: 10,
    suffix: "+",
    headline: "10+",
    subheading: "Leading EPC Partners",
    description:
      "Trusted by India's leading EPC companies for reliable solar and infrastructure solutions.",
  },
  {
    icon: "pin",
    headline: "South Asia",
    subheading: "Operational Presence",
    description:
      "Serving customers across South Asia through a robust sourcing, logistics and project-support network.",
  },
  {
    icon: "panel",
    headline: "GW-Scale",
    subheading: "Projects Supported",
    description:
      "Supplying products and engineering solutions for utility-scale and commercial solar infrastructure projects.",
  },
  {
    icon: "shield",
    headline: "Zero",
    subheading: "Compromise on Quality",
    description:
      "Every product is sourced, inspected and delivered with uncompromising quality standards.",
  },
];

/** Animated count-up that fires once the card enters the viewport. */
function useCountUp(target: number | undefined, active: boolean) {
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (target == null || !active || done.current) return;
    done.current = true;
    const duration = 1200;
    let raf = 0;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);

  return value;
}

function StatCard({ stat, inView }: { stat: Stat; inView: boolean }) {
  const count = useCountUp(stat.countTo, inView);

  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-gold/50 hover:bg-white/[0.09] hover:shadow-[0_18px_50px_-12px_rgba(246,166,35,0.35)] motion-safe:animate-[floatCard_6s_ease-in-out_infinite]">
      {/* Hover glow wash */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px 180px at 30% 0%, rgba(246,166,35,0.18), transparent)" }}
      />
      <span className="relative grid h-14 w-14 place-items-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/30 transition-all duration-300 group-hover:bg-gold/25 group-hover:shadow-[0_0_28px_rgba(246,166,35,0.55)]">
        <Icon name={stat.icon} className="h-7 w-7" />
        {stat.icon === "pin" && (
          <span className="absolute inset-0 rounded-xl ring-2 ring-gold/40 opacity-0 group-hover:opacity-100 motion-safe:group-hover:animate-ping" />
        )}
      </span>

      <p className="relative mt-6 font-serif text-5xl font-bold leading-none text-gold md:text-6xl">
        {stat.countTo != null ? `${count}${stat.suffix ?? ""}` : stat.headline}
      </p>
      <p className="relative mt-3 text-base font-semibold text-white">{stat.subheading}</p>
      <p className="relative mt-2 text-sm leading-relaxed text-white/75">{stat.description}</p>
    </div>
  );
}

export default function OperationalMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Mobile carousel state
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-rotate the mobile carousel.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % stats.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const go = (i: number) => setSlide(((i % stats.length) + stats.length) % stats.length);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="metrics-heading"
      className="relative flex min-h-screen items-center overflow-hidden bg-primary"
    >
      {/* Energy-wave + gradient backdrop */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(900px 420px at 85% -10%, rgba(246,166,35,0.18), transparent), radial-gradient(720px 520px at -5% 110%, rgba(83,131,102,0.28), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] motion-safe:animate-[spin_60s_linear_infinite]"
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, transparent, #F6A623, transparent 40%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-content px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold">
            Operational Metrics
          </span>
          <h2 id="metrics-heading" className="mt-4 font-serif text-3xl font-bold text-white md:text-4xl">
            Trust, scale &amp; uncompromising quality
          </h2>
          <p className="mt-3 text-white/75">
            A premium Solar &amp; Data Center infrastructure partner, proven across South Asia.
          </p>
        </div>

        {/* Desktop / tablet: 2×2 grid */}
        <div className="mt-12 hidden gap-5 sm:grid sm:grid-cols-2">
          {stats.map((s) => (
            <StatCard key={s.subheading} stat={s} inView={inView} />
          ))}
        </div>

        {/* Mobile: single-card swipe carousel */}
        <div className="mt-10 sm:hidden">
          <div
            className="overflow-hidden"
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {stats.map((s) => (
                <div key={s.subheading} className="w-full shrink-0 px-1">
                  <StatCard stat={s} inView={inView} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(slide - 1)}
              aria-label="Previous statistic"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:border-gold/60 hover:text-gold"
            >
              <Icon name="arrow" className="h-5 w-5 rotate-180" />
            </button>
            <div className="flex items-center gap-2" role="tablist" aria-label="Statistics">
              {stats.map((s, i) => (
                <button
                  key={s.subheading}
                  type="button"
                  role="tab"
                  aria-selected={i === slide}
                  aria-label={s.subheading}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === slide ? "w-6 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(slide + 1)}
              aria-label="Next statistic"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:border-gold/60 hover:text-gold"
            >
              <Icon name="arrow" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
