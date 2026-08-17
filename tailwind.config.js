/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2F8',
          100: '#DCE5F2',
          200: '#B3C5E1',
          300: '#8AA6CF',
          400: '#547FBD',
          500: '#2C5AA0',
          600: '#36498C',
          700: '#092752',
          800: '#1A2A5E',
          900: '#04101F'
        },
        secondary: {
          50: '#FEF1F0',
          100: '#FDE3E1',
          200: '#FAC6C1',
          300: '#F59E95',
          400: '#EF6A5E',
          500: '#CC0000',
          600: '#C92A1E',
          700: '#A3241A',
          800: '#7C1C15',
          900: '#561310'
        },
        gold: {
          400: '#F7C84B',
          500: '#FFB000',
          600: '#D99E14'
        },
        ink: '#151515',
        navy: '#36498C',
        brandred: '#CC0000',
        wagreen: '#00A859',
        dark: '#0B2B5A',
        darker: '#04101F'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'elevation-1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevation-2': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevation-3': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevation-4': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }
    },
  },
  plugins: [],
}
