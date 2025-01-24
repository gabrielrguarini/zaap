import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "structrure-gradient":
          "linear-gradient(90deg, var(--background) 0%, transparent 20%, transparent 80%, var(--background) 100%)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
      },
      fontSize: {
        xss: "0.6rem",
      },
      screens: {
        xss: "412px",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "scroll 30s linear infinite",
        "fade-up": "fadeUp 0.6s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
