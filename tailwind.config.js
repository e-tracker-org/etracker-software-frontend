const { fontFamily, screens } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/layouts/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontFamily: {
                sans: ['var(--font-dm-sans)', ...fontFamily.sans],
            },
            fontSize: {
                '3.5xl': '32px',
            },
            dropShadow: {
                '3xl': '0px 20px 20px rgba(0, 0, 0, 0.25)',
                hover_3xl: '0px 20px 20px rgba(0, 255, 0, 0.25)',
                't-xs': '0px 0px 20px rgba(0, 0, 0, 0.1)',
            },
            colors: {
                primary: {
                    100: '#E7E9FD',
                    200: '#949EFF',
                    600: '#2F42ED',
                },
                black: '#313131',
                gray: {
                    300: '#D9D9D9',
                    500: '#13131373',
                    700: '#131313',
                },
                white: '#FFFFFF',
                red: {
                    300: '#E80404',
                },
                link: '#2E7DDAEB',
                brand: {
                    red: '#E80404BF',
                    inactive: '#585757BF',
                    bg: '#F8F8F9FA',
                    gray: {
                        200: '#7B7B7B',
                        300: '#D9D9D9',
                    },
                },
            },
            screens: {
                '4xl': '2000px',
            },
            boxShadow: {
                medium: '0px 0px 20px rgba(0, 0, 0, 0.25)',
            },
        },
    },
    plugins: [],
};
