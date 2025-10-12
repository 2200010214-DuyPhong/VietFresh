/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#717171',
        'light-blue': '#EDF1F3',
        'gray-300': '#D8D8D8',
        'gray-500': '#AEAEAE',
        'gray-800': '#3A3A3A',
        'primary': '#72AEC8',
      },
      fontFamily: {
        'body': ['Lato', 'sans-serif'],
        'heading': ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}