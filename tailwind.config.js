/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#2B3E89',
          light: '#3C4FA4',
          dark: '#212C6C',
        },
        secondary: {
          main: '#C62F3C',
          light: '#D9424E',
          dark: '#A22731',
        },
      },
      fontFamily: {
        sans: ['Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
