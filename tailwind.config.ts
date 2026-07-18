import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f4fb",
          100: "#e9e6f6",
          200: "#cec6e8",
          300: "#aea0d6",
          400: "#8c77c0",
          500: "#6f58a8",
          600: "#59448c",
          700: "#493870",
          800: "#3a2c59",
          900: "#2a2043",
          950: "#18132a",
        },
        gold: {
          400: "#d9b45e",
          500: "#c79a3d",
          600: "#a87d2d",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(180deg, rgba(24,19,42,0.75) 0%, rgba(24,19,42,0.55) 45%, rgba(24,19,42,0.92) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
