/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0047FF',
          foreground: '#FFFFFF',
        },
        background: '#FFFFFF',
        foreground: '#000000',
        border: '#000000',
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
