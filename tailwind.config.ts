import type { Config } from "tailwindcss";

/**
 * Qori Foods design system.
 * Colors are exposed as CSS variables (see globals.css) so the same tokens can be
 * reused outside Tailwind (e.g. inline styles, canvas, third-party embeds).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Andean field green — primary brand
        field: {
          50: "#f2f7f0",
          100: "#e0ecdc",
          200: "#c2d9bb",
          300: "#9bbf90",
          400: "#6f9f61",
          500: "#4f8340",
          600: "#3b6830",
          700: "#305427",
          800: "#284322",
          900: "#22381e",
          950: "#0f1f0d",
        },
        // Warm terracotta / Andean clay — accent
        clay: {
          50: "#fbf5f0",
          100: "#f6e6da",
          200: "#eccbb4",
          300: "#e0a985",
          400: "#d38159",
          500: "#c8623b",
          600: "#b94d30",
          700: "#9a3c2a",
          800: "#7c3227",
          900: "#652b23",
          950: "#371410",
        },
        // Blueberry indigo — secondary accent (nods to flagship crop)
        berry: {
          50: "#f2f3fb",
          100: "#e6e8f8",
          200: "#d1d5f1",
          300: "#b0b6e6",
          400: "#8890d7",
          500: "#6a6ec9",
          600: "#5652b9",
          700: "#4a44a3",
          800: "#3e3a84",
          900: "#35346a",
          950: "#22213e",
        },
        // Warm bone / cream neutrals — backgrounds
        bone: {
          50: "#fdfcf9",
          100: "#faf7f0",
          200: "#f3ede0",
          300: "#e8dfca",
          400: "#d8cbac",
        },
        // Ink neutral scale — text & UI
        ink: {
          50: "#f6f6f5",
          100: "#e7e7e4",
          200: "#cfcfc9",
          300: "#adaca3",
          400: "#84837a",
          500: "#69685f",
          600: "#53524b",
          700: "#44433e",
          800: "#3a3935",
          900: "#26251f",
          950: "#171612",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        // Fluid display scale
        "display-xl": ["clamp(2.75rem, 1.6rem + 5.2vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 1.5rem + 3.4vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.85rem, 1.4rem + 2.1vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.5rem, 1.25rem + 1.1vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "section": "clamp(4rem, 2.5rem + 6vw, 8rem)",
        "section-sm": "clamp(2.5rem, 1.8rem + 3vw, 4.5rem)",
      },
      maxWidth: {
        prose: "68ch",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(23, 22, 18, 0.04), 0 8px 24px -12px rgba(23, 22, 18, 0.12)",
        "card-hover": "0 2px 4px rgba(23, 22, 18, 0.06), 0 24px 48px -20px rgba(23, 22, 18, 0.22)",
        ring: "0 0 0 1px rgba(23, 22, 18, 0.06)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        shimmer: "shimmer 1.6s infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
