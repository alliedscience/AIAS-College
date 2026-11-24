import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ".dark"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      screens: {
        // xs breakpoint: very small phones (320px–480px)
        xs: "480px",
      },
      colors: {
        // Core Academic Palette from Project Specification
        navy: {
          950: "#07172C",
          900: "#0B2545",
          DEFAULT: "#102D4F", // Primary Deep Navy
          800: "#143760",
          700: "#1C4A80",
          600: "#2762A5",
          100: "#E6EEF8",
          50: "#F0F5FB",
        },
        ivory: {
          DEFAULT: "#F7F5EF", // Warm Ivory background
          dark: "#EFECE1",
          light: "#FAF9F5",
        },
        gold: {
          dark: "#967A46",
          DEFAULT: "#B99A62", // Muted Gold accent
          light: "#D8C090",
          50: "#FDFBF7",
        },
        // Institutional Accent Palettes
        forest: {
          DEFAULT: "#14532D", // AIAS Laurel Green
          dark: "#0B351D",
          light: "#166534",
          50: "#F0FDF4",
        },
        medical: {
          DEFAULT: "#044E54", // Nursing Academy Teal
          dark: "#022F33",
          light: "#0A747C",
          50: "#F0FDFA",
        },
        terracotta: {
          DEFAULT: "#9A3412", // P.N. Das D.El.Ed
          dark: "#6C240C",
          light: "#C2410C",
          50: "#FFF7ED",
        },
        // System tokens
        border: "hsl(var(--border, 214 32% 91%))",
        input: "hsl(var(--input, 214 32% 91%))",
        ring: "hsl(var(--ring, 212 66% 19%))",
        background: "hsl(var(--background, 45 33% 95%))",
        foreground: "hsl(var(--foreground, 215 25% 15%))",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        heading: ["'Cormorant Garamond'", "Georgia", "serif"],
        brand: ["'Cinzel'", "'Cormorant Garamond'", "serif"],
        serif: ["'Playfair Display'", "'Cormorant Garamond'", "Georgia", "serif"],
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        // Notice: strictly avoiding full / pill-shaped buttons
      },
      boxShadow: {
        xs: "0 1px 2px rgba(16, 45, 79, 0.05)",
        subtle: "0 1px 3px rgba(16, 45, 79, 0.06)",
        card: "0 4px 12px rgba(16, 45, 79, 0.08)",
        lift: "0 10px 25px -3px rgba(16, 45, 79, 0.12), 0 4px 6px -2px rgba(16, 45, 79, 0.05)",
        header: "0 2px 10px rgba(7, 23, 44, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
