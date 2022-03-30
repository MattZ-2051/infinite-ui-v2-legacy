import path from 'node:path';
import process from 'node:process';
import fs from 'node:fs';
import preprocess from 'svelte-preprocess';
import { imagetools } from 'vite-imagetools';
import netlifyAdapter from '@sveltejs/adapter-netlify';
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
    adapter: netlifyAdapter(),

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

      optimizeDeps: {
        include: ['p-debounce', 'swiper'],
      },

      ssr: {
        noExternal: ['p-debounce', 'svelte-previous', 'swiper', 'web-social-share'],
      },

      define: {
        'process.env.tw': JSON.stringify({ screens: tailwindConfig.theme.screens }),
      },

      server: {
        fs: {
          allow: [path.resolve(`./projects/`), path.resolve(`./mocks/`)],
        },

        proxy: {
          '/api': {
            target: 'https://api-dev.infiniteworld.com',
            changeOrigin: true,
            rewrite: (p) => p.replace(/^\/api/, ''),
          },
        },
      },
    },
  },
};

const { SVELTEKIT_MODE, NODE_ENV, VITE_API_URL, NETLIFY, CONTEXT, URL, DEPLOY_PRIME_URL } = process.env;

if (SVELTEKIT_MODE) {
  config.kit.vite.mode = SVELTEKIT_MODE;
}

if (!VITE_API_URL) {
  if (NETLIFY) {
    process.env.VITE_API_URL = CONTEXT === 'deploy-preview' ? `${DEPLOY_PRIME_URL}/api` : `${URL}/api`;
  } else if (NODE_ENV === 'development' && !SVELTEKIT_MODE) {
    // For local development we use a proxy for API calls
    process.env.VITE_API_URL = 'http://localhost:3000/api';
  }
}

export default config;
