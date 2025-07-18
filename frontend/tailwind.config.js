// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router
    "./components/**/*.{js,ts,jsx,tsx}", // If you have a components folder
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"], // Add your custom font here
      },
      backdropBlur: {
        sm: "4px",
        DEFAULT: "10px",
        lg: "20px",
      },
    },
    variants: {
      extend: {
        backdropBlur: ["responsive"],
      },
    },
  },
  plugins: [],
};
