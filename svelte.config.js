import path from 'node:path';
import preprocess from 'svelte-preprocess';
import { imagetools } from 'vite-imagetools';
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

export default config;
