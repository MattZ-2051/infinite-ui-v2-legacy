const postcss = require('postcss');
const sveltePreprocess = require('svelte-preprocess');
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
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
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        svelte: path.resolve(__dirname, '..', 'node_modules', 'svelte'),
        $app: path.resolve('./.svelte-kit/dev/runtime/app'),
        $ui: path.resolve('./src/ui'),
        $lib: path.resolve('./src/lib'),
        $util: path.resolve('./src/util'),
        $static: path.resolve('./static'),
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
