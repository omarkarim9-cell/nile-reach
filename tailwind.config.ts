import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nile: {
          50: "#F4F7FA",
          100: "#E8EFF5",
          200: "#C8D8E6",
          300: "#9BB6CD",
          400: "#5E8AAE",
          500: "#2C6FA0",
          600: "#1E4E78",
          700: "#163C5E",
          800: "#0E2A47",
          900: "#08182A",
        },
        sand: {
          50: "#FAF7F2",
          100: "#F2EBDE",
          200: "#E5D6BC",
          300: "#D4BC8E",
          400: "#C9A961",
          500: "#B8893E",
          600: "#8F6629",
        },
        earth: {
          500: "#4A7C5F",
          600: "#3A6249",
          700: "#2D5039",
        },
        ink: "#1A1A1A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
