/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      cream: '#FFFDF0',
      black: '#141C25',
      darkGray: '#606D80',
      lightGray: '#CCD1DB',
      redOrange: '#FD5F3F',
      darkRed: '#A52E16',
      paleBlue: '#C8E4DD',
      brightYellow: '#FFEA',
    },
    extend: {
      fontFamily: {
        sans: ['Cardo', ...defaultTheme.fontFamily.sans],
        shout: ['"Climate Crisis"', ...defaultTheme.fontFamily.sans],
        heading: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
