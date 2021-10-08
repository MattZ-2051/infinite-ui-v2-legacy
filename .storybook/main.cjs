const { readFileSync } = require('fs');
const postcss = require('postcss');
const sveltePreprocess = require('svelte-preprocess');
const path = require('path');
const webpack = require('webpack');
const {
  compilerOptions: { paths },
} = JSON.parse(readFileSync('tsconfig.json', 'utf8'));

const storyPaths = Object.values(paths)
  .map(([path]) => path)
  .filter((path) => path.endsWith('*'))
  .map((path) => path.substring(0, path.length - 2));

module.exports = {
  stories: [`../+(${storyPaths.join('|')})/**/*.stories.svelte`],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-svelte-csf',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: postcss,
        },
      },
    },
  ],
  core: {
    builder: 'webpack5',
  },
  svelteOptions: {
    preprocess: [
      sveltePreprocess({
        postcss: true,
      }),
    ],
  },
  webpackFinal: async (config) => {
    const { alias } = await import('../path-alias.js');
    const svelteConfig = await import('../svelte.config.js');
    config.plugins.push(new webpack.DefinePlugin(svelteConfig.default.kit.vite.define));

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        svelte: path.resolve(__dirname, '..', 'node_modules', 'svelte'),
        $app: path.resolve('./scripts/test/$app'),
        '$lib/variables': path.resolve('./scripts/test/$lib/variables'),
        $lib: path.resolve('./src/lib'),
        ...Object.fromEntries(alias.map(([key, value]) => [key, path.resolve(`./${value}`)])),
      },
      mainFields: ['svelte', 'browser', 'module', 'main'],
    };

    config.module.rules.push({
      resolve: {
        fullySpecified: false,
        extensions: ['.js', '.ts'],
      },
    });

    return config;
  },
};
