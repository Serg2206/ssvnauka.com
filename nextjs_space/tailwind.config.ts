
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Наша палитра "Neon Noir"
        background: "#050505", // Void Black
        surface: "#121212",    // Dark Graphite
        foreground: "#EAEAEA", // Paper White
        primary: {
          DEFAULT: "#00F0FF", // Electric Blue
          glow: "rgba(0, 240, 255, 0.5)",
        },
        accent: {
          DEFAULT: "#CCFF00", // Acid Lime
          glow: "rgba(204, 255, 0, 0.5)",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains)'],
        display: ['var(--font-manrope)'],
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(to right, #00F0FF, #CCFF00)',
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      }
    },
  },
  plugins: [],
};
export default config;
