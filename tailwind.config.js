/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050D1B',
          900: '#0A1B33',
          850: '#0D2140',
          800: '#0F2747',
          700: '#173963',
          600: '#204A7D',
          500: '#2E5C94',
        },
        gold: {
          600: '#A87D1B',
          500: '#C9A227',
          400: '#D9B54A',
          300: '#E8CE85',
          200: '#F3E4BC',
          100: '#F9F1DC',
        },
        ivory: {
          50: '#FBF9F4',
          100: '#F5F1E7',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 4px 14px -4px rgba(201,162,39,0.35)',
        'gold-md': '0 12px 30px -8px rgba(201,162,39,0.45)',
        'navy-lg': '0 24px 60px -16px rgba(5,13,27,0.55)',
        'card': '0 1px 2px rgba(10,27,51,0.04), 0 8px 24px -8px rgba(10,27,51,0.10)',
        'card-hover': '0 1px 2px rgba(10,27,51,0.06), 0 20px 40px -12px rgba(10,27,51,0.22)',
      },
    },
  },
  plugins: [],
};
