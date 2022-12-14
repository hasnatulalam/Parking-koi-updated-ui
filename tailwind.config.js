/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FE235B",
          secondary: "#112751",
          accent: "#F3F9FF",
          neutral: "#3d4451",
          overlayprimary: "#F5416B",
          overlaysecondary: "#243A61",
          "base-100": "#ffffff",

          "info": "#3ABFF8",

          "success": "#36D399",

          "warning": "#FBBD23",

          "error": "#F87272",
        },
      },
      "dark",
    ],
  },
  plugins: [require("daisyui")],
}
