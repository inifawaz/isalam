/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Outfit", defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: colors.amber,
                warning: colors.rose,
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
