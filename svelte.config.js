import path from 'node:path';
import process from 'node:process';
import preprocess from 'svelte-preprocess';
import { imagetools } from 'vite-imagetools';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import nodeAdapter from '@sveltejs/adapter-node';
import staticAdapter from '@sveltejs/adapter-static';
import tailwindConfig from './scripts/tailwind/fullConfig.js';

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

    vite: {
      resolve: {
        alias: {
          $ui: path.resolve('./src/ui'),
          $util: path.resolve('./src/util'),
          $static: path.resolve('./static'),
        },
      },
      plugins: [imagetools()],

      define: {
        'process.env.tw': JSON.stringify({ screens: tailwindConfig.theme.screens }),
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
