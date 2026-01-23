const { fontFamily } = require('tailwindcss/defaultTheme');

const svgToDataUri = require('mini-svg-data-uri');

const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './content/**/*.mdx',
    './public/**/*.svg',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
      colors: {
        'heathered-gray': {
          '50': '#f8f7f4',
          '100': '#efede5',
          '200': '#ddd9cb',
          '300': '#bdb398',
          '400': '#b1a286',
          '500': '#a18e6e',
          '600': '#947e62',
          '700': '#7c6752',
          '800': '#655547',
          '900': '#53463b',
          '950': '#2c241e',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
        // Nested roundedness utilities: parent = child + padding
        // Format: rounded-nest-[child]-[padding]
        'nest-lg-1': '0.75rem',    // rounded-lg (8px) + p-1 (4px) = 12px
        'nest-lg-2': '1rem',       // rounded-lg (8px) + p-2 (8px) = 16px
        'nest-xl-1': '1rem',       // rounded-xl (12px) + p-1 (4px) = 16px
        'nest-xl-2': '1.25rem',    // rounded-xl (12px) + p-2 (8px) = 20px
        'nest-2xl-1': '1.25rem',   // rounded-2xl (16px) + p-1 (4px) = 20px
        'nest-2xl-2': '1.5rem',    // rounded-2xl (16px) + p-2 (8px) = 24px
      },
      fontFamily: {
        mono: ['var(--font-mono)'],
        sans: ['var(--font-azeret)'],
      },
      boxShadow: {
        'tv-inner-shadow': 'inset 0 -12px 12px 0 rgb(0 0 0 / 0.05)',
        'highlight-upper-shadow': 'inset 0 2px 0px 0 rgb(0 0 0 / 0.05)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-from-top': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        'fade-up': {
          '0%': {
            opacity: 'var(--from-opacity, 0)',
            transform: 'translateY(var(--translate-from, 10px))',
          },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        '@keyframes shimmer': {
          '0%, 90%, to': {
            backgroundPosition: 'calc(-100% - var(--shimmer-width)) 0',
          },
          '30%, 60%': {
            backgroundPosition: 'calc(100% + var(--shimmer-width)) 0',
          },
        },

        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },

        orbit: {
          '0%': {
            transform: 'rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(1turn) translateY(calc(var(--radius) * 1px)) rotate(-1turn)',
          },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',

        'fade-in-from-top': 'fade-in-from-top 1s var(--animation-delay,0ms) ease forwards',
        'fade-up': 'fade-up 1s var(--animation-delay,0ms) ease forwards',
        'hue-shift': 'animate-hue-shift 10s linear 1s infinite',
        'fade-in': 'fade-in 0.5s ease-in-out',
        orbit: 'orbit calc(var(--duration)*1s) linear infinite',
        shimmer: 'shimmer 8s infinite',
      },
      transitionTimingFunction: {
        'in-quad': 'var(--ease-in-quad)',
        'in-cubic': 'var(--ease-in-cubic)',
        'in-quart': 'var(--ease-in-quart)',
        'in-quint': 'var(--ease-in-quint)',
        'in-expo': 'var(--ease-in-expo)',
        'in-circ': 'var(--ease-in-circ)',

        'out-quad': 'var(--ease-out-quad)',
        'out-cubic': 'var(--ease-out-cubic)',
        'out-quart': 'var(--ease-out-quart)',
        'out-quint': 'var(--ease-out-quint)',
        'out-expo': 'var(--ease-out-expo)',
        'out-circ': 'var(--ease-out-circ)',

        'in-out-quad': 'var(--ease-in-out-quad)',
        'in-out-cubic': 'var(--ease-in-out-cubic)',
        'in-out-quart': 'var(--ease-in-out-quart)',
        'in-out-quint': 'var(--ease-in-out-quint)',
        'in-out-expo': 'var(--ease-in-out-expo)',
        'in-out-circ': 'var(--ease-in-out-circ)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // Lab item container utility
    function ({ addUtilities }: any) {
      addUtilities({
        '.lab-item': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '250px',
          gap: '1rem',
          width: '100%',
          alignSelf: 'center',
        },
      });
    },
    // thanks to aceternity ui!
    // https://ui.aceternity.com/components/grid-and-dot-backgrounds
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'bg-grid': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-grid-small': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-dot': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      );
    },
    addVariablesForColors,
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}
