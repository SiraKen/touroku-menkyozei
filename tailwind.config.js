/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
        },
        center: true,
      },
    },
  },
  plugins: [],
};
