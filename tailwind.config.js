/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      cream: '#FFFDF0',
      black: '#141C25',
      'dark-gray': '#606D80',
      'light-gray': '#CCD1DB',
      'red-orange': '#FD5F3F',
      'dark-red': '#A52E16',
      'pale-blue': '#C8E4DD',
      'bright-yellow': '#FFEA64',
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
