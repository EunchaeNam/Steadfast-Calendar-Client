/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFD8D8",
        secondary: "#A7D3A7",
        background: "#FDF7F7",
        "text-main": "#5C5C5C",
        "event-couple": "#FFB6B9",
        "event-me": "#B2EBF2",
        "event-you": "#C8E6C9",
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      borderRadius: {
        "box": "12px",
        "button": "8px",
      },
      boxShadow: {
        soft: "0 4px 6px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
} 