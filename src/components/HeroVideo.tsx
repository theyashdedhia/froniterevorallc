"use client";

import { useEffect, useRef } from "react";

/**
 * Background hero video.
 * React's `muted` JSX prop is not reliably reflected to the DOM, and most
 * browsers block autoplay unless the element is muted *before* play() — so we
 * force it imperatively and kick off playback on mount.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const play = () => v.play().catch(() => {});
    play();
    // Retry once metadata is ready (covers slow connections / Safari).
    v.addEventListener("loadeddata", play);
    return () => v.removeEventListener("loadeddata", play);
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src="/BgVideo.mp4" type="video/mp4" />
    </video>
  );
}
