/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-yellow': '#FFD700',
        'primary-black': '#1a1a1a',
      },
    },
  },
  plugins: [],
}
