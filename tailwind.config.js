const { nextui } = require('@nextui-org/react');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}','./src/**/*.{js,ts,jsx,tsx}'],
  serverless: true,
  serverlessConfig: {
    api: {
      timeout: 30,
    },
  },
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.zinc,
        red: colors.rose,
        yellow: colors.amber,
        green: colors.green,
        blue: colors.sky,
        indigo: colors.indigo,
        purple: colors.purple,
        pink: colors.pink,
        teal: colors.teal,
        cyan: colors.cyan,
        orange: colors.orange,
        white: "#ffffff",
        black: "#000000",
        gray: {
          850: '#222226',
          666: '#666',
        },
        slate: {
          900: '#000000',
          800: '#1e293b',
          700: '#334155',
        },
      },
      screens: {
      'xss': '80px',
      // => @media (min-width: 80px) { ... }
      'xs': '285px',
      // => @media (min-width: 285px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
      flexGrow: {
        'half': 0.5,
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
