/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        fontSize: {
            xs: '0.6rem',
            sm: '0.8rem',
            base: '1rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '2rem',
            '4xl': '2.5rem',
            '5xl': '3rem'
        },
        extend: { },
    },
    plugins: [
        require("daisyui"),
        require("tailwind-fontawesome")({
            version: 6,
        })
    ],
}
