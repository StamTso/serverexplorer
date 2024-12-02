import { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray': {
          100: '#F3F7FC',
          200: '#E8E8E9',
          300: '#B9BABD',
          600: '#8A8C91',
          800: '#3C3D44',
          900: '#383C43'
        }
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        'm': ['12px', '18px'],
        'l': ['16px', '24px'],
        'xl': ['20px', '30px'],
        '2xl': ['32px', '44px'],
        '3xl': ['48px', '64px']
      },
      maxWidth: {
        'md': '26rem'
      }
    },
  },
  plugins: [],
};

export default config;

