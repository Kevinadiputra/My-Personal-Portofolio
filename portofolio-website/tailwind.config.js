/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d091a',
        secondary: '#140e25',
        accent: '#5810ff',
        'accent-hover': '#4a0bde',
        tertiary: '#201837',
        'tertiary-hover': '#271f40',
      },
      fontFamily: {
        primary: ['var(--font-sometype-mono)', 'monospace'],
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      }
    },
  },
  plugins: [],
}