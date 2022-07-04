module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-primary": "var(--primary)",
        "theme-secondary": "var(--secondary)",
        "theme-tertiary": "var(--tertiary)",
        "theme-background": "var(--background)",
        "theme-surface": "var(--surface)",
        "theme-error": "var(--error)",
        "theme-on-primary": "var(--on-primary)",
        "theme-on-secondary": "var(--on-secondary)",
        "theme-on-background": "var(--on-background)",
        "theme-on-surface": "var(--on-surface)",
        "theme-on-error": "var(--on-error)",
        "theme-shadow": "var(--shadow)",
      },
      fontFamily: {
        poppins: ["Poppins Regular", "sans-serif"],
        prohibition: ["Prohibition", "sans-serif"],
        "poppins-medium": ["Poppins Medium", "sans-serif"],
        "poppins-bold": ["Poppins Bold", "sans-serif"],
        anaheim: ["Anaheim", "sans-serif"],
        "cascadia-code": ["Cascadia Code", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      screens: {
        wide: "1600px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
