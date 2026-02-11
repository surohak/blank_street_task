/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                surface: {
                    DEFAULT: 'var(--color-bg)',
                    warm: 'var(--color-bg)',
                    card: 'var(--color-bg-card)',
                    input: 'var(--color-bg-input)',
                    subtle: 'var(--color-bg-subtle)',
                    hover: 'var(--color-bg-hover)',
                },
                border: {
                    DEFAULT: 'var(--color-border)',
                    card: 'var(--color-border-card)',
                },
                button: {
                    DEFAULT: 'var(--color-btn)',
                    hover: 'var(--color-btn-hover)',
                    active: 'var(--color-btn-active)',
                },
                primary: {
                    bg: 'var(--color-btn-primary-bg)',
                    text: 'var(--color-btn-primary-text)',
                    hover: 'var(--color-btn-primary-hover)',
                },
                th: {
                    text: 'var(--color-text)',
                    secondary: 'var(--color-text-secondary)',
                    muted: 'var(--color-text-muted)',
                    faint: 'var(--color-text-faint)',
                    faintest: 'var(--color-text-faintest)',
                },
                tab: {
                    active: 'var(--color-tab-active)',
                    inactive: 'var(--color-tab-inactive)',
                    'inactive-hover': 'var(--color-tab-inactive-hover)',
                    underline: 'var(--color-tab-underline)',
                },
                skeleton: 'var(--color-skeleton)',
                status: {
                    open: '#2d8a4e',
                    closing: '#c2760a',
                    closed: '#b91c1c',
                },
            },
            boxShadow: {
                sheet: '0 -4px 24px var(--color-shadow)',
            },
        },
    },
    plugins: [],
};
