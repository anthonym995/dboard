/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        shake: "shake 0.5s ease-in-out",
        pulse: "pulse 1.5s infinite",
      },
      keyframes: {
        shake: {
          "0%, 100%": {
            transform: "translateX(-10px)",
          },
          "50%": {
            transform: "translateX(10px)",
          },
        },
        pulse: {
          "0%": {
            opacity: "0.5",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0.5",
          },
        },
      },
    },
  },
  plugins: [],
};
