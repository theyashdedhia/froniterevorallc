import type { Config } from "tailwindcss";

// Design tokens from the Master Website Plan (§2). Keep this the single source of truth.
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#011D3E", // Prussian Blue — trust/engineering
          dark: "#00132A",
        },
        accent: {
          DEFAULT: "#538366", // Jungle Teal — primary CTA / brand accent
          alt: "#6FA083", // Lighter jungle teal — secondary accent
        },
        gold: {
          DEFAULT: "#F6A623", // Golden Amber — stat highlights / premium accent
          soft: "#FFC861",
        },
        ash: "#F4F6F7", // Light ash background
        ink: "#16242E", // Body text
        muted: "#586771", // Secondary text
        line: "#E0E5E9", // Borders
        danger: "#D7263D", // Warnings (fire/safety pages only)
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      keyframes: {
        floatCard: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      maxWidth: {
        content: "1280px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(1,29,62,0.08)",
        cardHover: "0 6px 16px rgba(1,29,62,0.12)",
      },
      borderRadius: {
        card: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
