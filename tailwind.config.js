/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'sans': ['Inter', '-apple-system', 'sans-serif'],
    },
    colors: {
      'logo-purple': '#8A6EFF',
      'purple': '#6D4AFF',
      'purple-hov': '#7C5CFF',
      'dark': '#16141C',
      'dark-hov': '#24212B',
      'dark-click': '#4A4658',
      'dark-border': '#4A4658',
      'primary': '#FFFFFF',
      'secondary': '#A7A4B5',
      'orange': '#FFA500',
      'red': '#EA3943',
      'green': '#16C784',
      'transparent': 'transparent'
    },
    extend: {},
  },
  plugins: [],
}
