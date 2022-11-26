// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    content: {
      "check-mark": 'url("./public/images/icon-check.svg")',
    },
    extend: {
      screens: {
        "3xl": "2100px",
      },
      container: {
        padding: "2rem",
      },
      colors: {
        sunglow: "#FFD048",
        "sunglow-blue": "#196499",
        "blue-dark": "#003366",
        "light-blue": "#1aabfc",
        error: "#FF5E5E",
        "primary-green": "#0CAE87",
        "main-gray": "#495A67",
      },
    },
  },
  plugins: [],
};
