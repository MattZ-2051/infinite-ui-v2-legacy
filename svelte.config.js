import path from 'node:path';
import process from 'node:process';
import preprocess from 'svelte-preprocess';
import { imagetools } from 'vite-imagetools';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import nodeAdapter from '@sveltejs/adapter-node';
import staticAdapter from '@sveltejs/adapter-static';
import tailwindConfig from './scripts/tailwind/fullConfig.js';
import { alias } from './path-alias.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',

    files: {
      assets: alias.find(([key]) => key === '$static')[1],
    },

    vite: {
      resolve: {
        alias: Object.fromEntries(alias.map(([key, value]) => [key, path.resolve(`./${value}`)])),
      },

      plugins: [imagetools()],

      ssr: {
        noExternal: ['p-debounce'],
      },

      define: {
        'process.env.tw': JSON.stringify({ screens: tailwindConfig.theme.screens }),
      },

      optimizeDeps: {
        include: [
          '@auth0/auth0-spa-js',
          '@felte/validator-yup',
          '@mdi/js',
          '@popperjs/core',
          'clsx',
          'clipboard-copy',
          'dayjs',
          'dayjs/plugin/advancedFormat.js',
          'effector',
          'felte',
          'flatpickr',
          'focus-trap',
          'js-cookie',
          'just-debounce',
          'msw',
          'p-debounce',
          'svelte-media',
          'svelte-previous',
          'tippy.js',
          'xss',
          'yup',
        ],
      },
    },
  },
};

const { SVELTEKIT_ADAPTER: adapter } = process.env;

switch (adapter) {
  case 'node': {
    config.kit.adapter = nodeAdapter();
    break;
  }

  case 'netlify': {
    config.kit.adapter = netlifyAdapter();
    break;
  }

  case 'static': {
    config.kit.ssr = false;
    config.kit.prerender = { pages: ['/'] };
    config.kit.adapter = staticAdapter({ fallback: '/index.html' });
    break;
  }

  default:
    if (adapter) {
      throw new Error(`Adapter "${adapter}" is not supported.`);
    }
}

export default config;
