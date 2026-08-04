import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f6f8",
          100: "#e4ebf0",
          200: "#c8d6e0",
          300: "#9bb4c4",
          400: "#6a90a5",
          500: "#4d738a",
          600: "#3d5c70",
          700: "#334b5c",
          800: "#2c3f4d",
          900: "#273642",
          950: "#0f1b24",
        },
        dawn: {
          300: "#f0d089",
          400: "#e0b85a",
          500: "#c9a03c",
          600: "#a67f28",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(180deg, rgba(15,27,36,0.55) 0%, rgba(15,27,36,0.35) 40%, rgba(15,27,36,0.88) 100%)",
        "page-hero-gradient":
          "linear-gradient(135deg, rgba(15,27,36,0.97) 0%, rgba(45,75,92,0.92) 55%, rgba(166,127,40,0.35) 100%)",
        "mist-gradient":
          "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(224,184,90,0.12), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 10%, rgba(107,144,165,0.14), transparent 50%), linear-gradient(180deg, #f3f6f8 0%, #ffffff 100%)",
        "ink-glow":
          "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(224,184,90,0.16), transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(1.25rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.06)" },
        },
        "draw-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-up-delay": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both",
        "fade-up-delay-2": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both",
        "fade-in": "fade-in 1s ease both",
        "slow-zoom": "slow-zoom 18s ease-out both",
        "draw-line": "draw-line 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both",
      },
    },
  },
  plugins: [],
};

export default config;
