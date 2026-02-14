/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B5E3C",   // Wood Brown
        secondary: "#F5E6D3", // Warm Beige
        accent: "#D4A373",    // Soft Brown/Gold
        neutral: "#F3F4F6",   // Soft Gray
        dark: "#1F2937",      // Charcoal
        light: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
