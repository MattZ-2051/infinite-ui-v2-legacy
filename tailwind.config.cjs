const tinycolor = require('tinycolor2');

module.exports = {
  content: ['./{src,projects}/**/*.{html,js,svelte,ts}'],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      colors: {
        // Grayscale
        'black-opacity': Object.fromEntries(
          [5, 10, 20, 30, 40, 50, 60, 70, 75, 80, 85, 90, 95].map((opacity) => [
            opacity,
            tinycolor('#000000')
              .setAlpha(opacity / 100)
              .toRgbString(),
          ])
        ),
        'white-opacity': Object.fromEntries(
          [5, 10, 20, 30, 40, 50, 60, 70, 75, 80, 85, 90, 95].map((opacity) => [
            opacity,
            tinycolor('#ffffff')
              .setAlpha(opacity / 100)
              .toRgbString(),
          ])
        ),
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
        default: 'var(--default-color)',
        inverse: 'var(--inverse-color)',
        primary: 'var(--primary-color)',
        'primary-dark': 'var(--primary-dark-color)',
      },
      zIndex: {
        '-1': '-1',
        '∞': 999_999_999,
        toast: 10_000,
        modal: 9000,
        menu: 2000,
        1: 1,
      },
      fontSize: {
        '2.5xl': ['1.6rem', '2rem'],
        '4.5xl': ['2.5rem', '3.5rem'],
      },
      listStyleType: {
        circle: 'circle',
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
      },
      gap: {
        18: '4.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
