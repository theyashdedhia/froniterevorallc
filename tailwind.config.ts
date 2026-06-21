import type { Config } from "tailwindcss";

// Design tokens from the Master Website Plan (§2). Keep this the single source of truth.
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B3C5D", // Deep Industrial Blue — trust/engineering
          dark: "#072A43",
        },
        accent: {
          DEFAULT: "#F5B700", // Vibrant Solar Yellow — energy (primary CTA)
          alt: "#2E9E5B", // Eco-Green — sustainability (secondary accent)
        },
        ash: "#F4F6F8", // Light Ash Grey background
        ink: "#1B2A33", // Body text
        muted: "#5A6B75", // Secondary text
        line: "#E1E6EB", // Borders
        danger: "#D7263D", // Warnings (fire/safety pages only)
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(11,60,93,0.08)",
        cardHover: "0 6px 16px rgba(11,60,93,0.12)",
      },
      borderRadius: {
        card: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
