import type { Config } from "tailwindcss";

/*
 * tailwind.config.ts — Tailwind v4 compatible
 *
 * In Tailwind v4, most token definitions have moved to @theme blocks in
 * globals.css. This file is kept for:
 *   - content paths (required)
 *   - any plugin registration
 *
 * Brand tokens are defined in app/globals.css @theme inline block.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
