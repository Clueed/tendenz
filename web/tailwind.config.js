/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      tomato: generateScale("tomato"),
      red: generateScale("red"),
      crimson: generateScale("crimson"),
      pink: generateScale("pink"),
      plum: generateScale("plum"),
      purple: generateScale("purple"),
      violet: generateScale("violet"),
      indigo: generateScale("indigo"),
      blue: generateScale("blue"),
      cyan: generateScale("cyan"),
      teal: generateScale("teal"),
      green: generateScale("green"),
      grass: generateScale("grass"),
      orange: generateScale("orange"),
      brown: generateScale("brown"),
      sky: generateScale("sky"),
      mint: generateScale("mint"),
      lime: generateScale("lime"),
      yellow: generateScale("yellow"),
      amber: generateScale("amber"),
      gray: generateScale("gray"),
      mauve: generateScale("mauve"),
      slate: generateScale("slate"),
      sage: generateScale("sage"),
      olive: generateScale("olive"),
      sand: generateScale("sand"),
      bronze: generateScale("bronze"),
      gold: generateScale("gold"),
      black: generateScale("black", true),
      white: generateScale("white", true),
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

function generateScale(name, alpha_only = false) {
  let scale = Array.from({ length: 12 }, (_, i) => {
    let id = i + 1;
    r = [[`a${id}`, `var(--${name}-a${id})`]];
    if (!alpha_only) {
      r.push([id, `var(--${name}-${id})`]);
    }
    return r;
  }).flat();

  return Object.fromEntries(scale);
}
