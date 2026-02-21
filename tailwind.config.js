/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                'primary-light': 'var(--color-primary-light)',
                accent: 'var(--color-accent)',
                'accent-hover': 'var(--color-accent-hover)',
                bg: 'var(--color-bg)',
                'bg-paper': 'var(--color-bg-paper)',
            },
            fontFamily: {
                heading: ['var(--font-heading)'],
                body: ['var(--font-body)'],
            }
        },
    },
    plugins: [],
}
