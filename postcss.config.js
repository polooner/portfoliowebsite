module.exports = {
  plugins: {
    tailwindcss: {
      content: [
        "./pages/**/*.{html,js,ts,tsx}",
        "./components/**/*.{html,js,ts,tsx}",
      ],
    },
    autoprefixer: {},
  },
};
