/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        myColor: {
          500: "#f0f0ef",
          100: "#e2e1df",
          200: "#c4c3bf",
          300: "#a7a5a0",
          400: "#898780",
          50: "#6c6960",
          600: "#56544d",
          700: "#413f3a",
          800: "#2b2a26",
          900: "#161513",
        },
        bg: {
          100: "#F7F6F1",
        },
        boder: {
          100: "#EEEDE7",
          200: "#EEEDE7",
          300: "#EEEDE7",
          400: "#EEEDE7",
          500: "#EEEDE7",
        },
      },
      fontFamily: {
        "custom-font-regular": ["CustomFontRegular", "sans"],
        "custom-font-bold": ["CustomFontBold", "sans"],
      },
    },
  },
  plugins: [],
};
