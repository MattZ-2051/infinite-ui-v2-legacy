import path from 'node:path';
import process from 'node:process';
import fs from 'node:fs';
import preprocess from 'svelte-preprocess';
import { imagetools } from 'vite-imagetools';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import nodeAdapter from '@sveltejs/adapter-node';
import staticAdapter from '@sveltejs/adapter-static';
import tailwindConfig from './scripts/tailwind/fullConfig.js';
import { alias } from './path-alias.js';

const project = alias.find(([key]) => key === '$project')[1].split('/')[1];

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
      assets: `static/${project}`,
      template: fs.existsSync(`projects/${project}/app.html`) ? `projects/${project}/app.html` : 'src/app.html',
    },

    vite: {
      envDir: path.resolve(`./projects/${project}`),

      resolve: {
        alias: Object.fromEntries(alias.map(([key, value]) => [key, path.resolve(`./${value}`)])),
      },

      plugins: [imagetools()],

      ssr: {
        noExternal: ['p-debounce', 'web-social-share'],
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
          'svelte-popperjs',
          'svelte-previous',
          'tippy.js',
          'xss',
          'yup',
        ],
      },
    },
  },
};

const { SVELTEKIT_ADAPTER: adapter, SVELTEKIT_MODE } = process.env;

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

if (SVELTEKIT_MODE) {
  config.kit.vite.mode = SVELTEKIT_MODE;
}

export default config;
