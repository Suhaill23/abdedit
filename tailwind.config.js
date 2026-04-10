/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './App.tsx', './index.tsx', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: {
          blue: 'var(--color-accent-blue)',
          pink: 'var(--color-accent-pink)',
          red: 'var(--color-accent-red)',
        },
        brand: {
          blue: 'var(--brand-blue)',
          cyan: 'var(--brand-cyan)',
          green: 'var(--brand-green)',
          teal: 'var(--brand-teal)',
        },
      },
      fontFamily: {
        ibm: ['"IBM Plex Sans Arabic"', 'sans-serif'],
        sans: ['Cairo', '"IBM Plex Sans Arabic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
