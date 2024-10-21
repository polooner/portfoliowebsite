const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./content/**/*.mdx",
    "./public/**/*.svg",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      typography: {
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)"],
        sans: ["var(--font-geist-sans)"],
      },
      boxShadow: {
        "tv-inner-shadow": "inset 0 -12px 12px 0 rgb(0 0 0 / 0.05)",
        "highlight-upper-shadow": "inset 0 2px 0px 0 rgb(0 0 0 / 0.05)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-from-top": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "none" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "@keyframes shimmer": {
          "0%, 90%, to": {
            backgroundPosition: "calc(-100% - var(--shimmer-width)) 0",
          },
          "30%, 60%": {
            backgroundPosition: "calc(100% + var(--shimmer-width)) 0",
          },
        },

        orbit: {
          "0%": {
            transform:
              "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform:
              "rotate(1turn) translateY(calc(var(--radius) * 1px)) rotate(-1turn)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        "fade-in-from-top":
          "fade-in-from-top 1s var(--animation-delay,0ms) ease forwards",
        "fade-up": "fade-up 1s var(--animation-delay,0ms) ease forwards",

        "hue-shift": "animate-hue-shift 10s linear 1s infinite",
        "fade-in": "fade-in 0.5s ease-in-out",
        orbit: "orbit calc(var(--duration)*1s) linear infinite",
        shimmer: "shimmer 8s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
