import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        romero: {
          gray: {
            light: "#c5c6c8",
            DEFAULT: "#818284",
            medium: "#4e4f51",
            dark: "#171718",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
