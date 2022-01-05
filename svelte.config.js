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

      server: {
        fs: {
          allow: [path.resolve(`./projects/`)],
        },
      },
    },
  },
};

const {
  SVELTEKIT_ADAPTER: adapter,
  SVELTEKIT_MODE,
  NODE_ENV,
  VITE_API_URL,
  NETLIFY,
  CONTEXT,
  URL,
  DEPLOY_PRIME_URL,
} = process.env;

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

if (!VITE_API_URL) {
  if (NETLIFY) {
    process.env.VITE_API_URL = CONTEXT === 'deploy-preview' ? `${DEPLOY_PRIME_URL}/api` : `${URL}/api`;
  } else if (NODE_ENV === 'development' && !SVELTEKIT_MODE) {
    // For local development we use a proxy for API calls
    process.env.VITE_API_URL = 'http://localhost:3001';
  }
}

export default config;
