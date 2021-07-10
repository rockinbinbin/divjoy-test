module.exports = {
  purge: [
    "./src/**/*.{js,jsx,ts,tsx,vue}",
    './public/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit', // Enables JIT compiler for Tailwind Styles
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
