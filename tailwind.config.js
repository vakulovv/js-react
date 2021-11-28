module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            display: ["Tenor Sans", "Georgia", "serif"],
            body: ["Inter", "system-Ui", "sans-serif"],
        },
        extend: {
          scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
          backgroundColor: ['active'],
        },
    },
    variants: {
        extend: {
          scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
          backgroundColor: ['active'],
        },
    },
    plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("@tailwindcss/aspect-ratio")],
};
