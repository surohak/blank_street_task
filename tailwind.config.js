/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                brand: {
                    900: '#3d3529',
                    800: '#5c5347',
                    700: '#644f33',
                    600: '#664d31',
                    500: '#7a7066',
                    400: '#9a9089',
                    300: '#b5ada6',
                    200: '#c0b5a8',
                },
                surface: {
                    DEFAULT: '#fffaf8',
                    warm: '#faf8f5',
                    input: '#f5f0e8',
                    subtle: '#f0e6db',
                    hover: '#e6d9cc',
                },
                border: {
                    DEFAULT: '#ede5d8',
                    card: '#e0d5c7',
                    dark: '#ddd2c0',
                },
                button: {
                    DEFAULT: '#e8ddd0',
                    hover: '#ddd2c0',
                    active: '#d0c4b4',
                },
                status: {
                    open: '#2d8a4e',
                    closing: '#c2760a',
                    closed: '#b91c1c',
                },
            },
            boxShadow: {
                sheet: '0 -4px 24px rgba(0, 0, 0, 0.1)',
            },
        },
    },
    plugins: [],
};
