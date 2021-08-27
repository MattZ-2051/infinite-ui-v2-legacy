const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');

module.exports = {
  mode: 'aot', // jit
  purge: {
    content: ['./{src,projects}/**/*.{html,js,svelte,ts}'],
    options: {
      defaultExtractor: (content) => [
        // If this stops working, please open an issue at https://github.com/svelte-add/svelte-add/issues rather than bothering Tailwind Labs about it
        ...tailwindExtractor(content),
        // Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
        ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
      ],
    },
    safelist: [/^svelte-[\d\w]+$/],
  },
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
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
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
