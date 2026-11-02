import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-reactive tokens (flip between dark/light via CSS vars in globals.css)
        ink: "rgb(var(--ink) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface2) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        mist: "rgb(var(--mist) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        aqua: {
          DEFAULT: "rgb(var(--aqua) / <alpha-value>)",
          soft: "rgb(var(--aqua-soft) / <alpha-value>)",
          dim: "rgb(var(--aqua-dim) / <alpha-value>)",
        },
        azure: {
          DEFAULT: "rgb(var(--azure) / <alpha-value>)",
          soft: "rgb(var(--azure-soft) / <alpha-value>)",
          dim: "rgb(var(--azure-dim) / <alpha-value>)",
        },
        // Fixed tokens for "product screenshot" chrome — always dark,
        // regardless of site theme (mirrors real app screenshots).
        chromeInk: "#060C1C",
        chrome: "#0B142C",
        chrome2: "#101C3C",
        chromeBorder: "#1C2E5C",
        chromeText: "#EDEEF5",
        chromeMist: "#8A9CC0",
        chromeAqua: "#22d3f5",
        chromeAquaSoft: "#a0f4ff",
        chromeAzure: "#0a6cff",
        chromeAzureSoft: "#6fb0ff",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "hex-grid":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='84' height='96' viewBox='0 0 84 96'%3E%3Cg fill='none' stroke='%231C2E5C' stroke-width='1'%3E%3Cpath d='M42 0 L84 24 L84 72 L42 96 L0 72 L0 24 Z'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        scan: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        drift: "drift 6s ease-in-out infinite",
        "drift-slow": "drift 9s ease-in-out infinite",
        pulseGlow: "pulseGlow 3.2s ease-in-out infinite",
        fadeIn: "fadeIn 0.35s ease both",
        floatIn: "floatIn 0.25s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
