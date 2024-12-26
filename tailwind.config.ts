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
        primary: "#700C08",
        secondary: "#A05D5A",
        tertiary: "#4B0805",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

export default config;
