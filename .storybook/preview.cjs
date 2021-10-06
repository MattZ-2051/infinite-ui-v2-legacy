require('$theme/theme.css');
require('../src/app.css');
require('$theme/app.css');
require('$static/fonts/stylesheet.css');
const ThemeDecorator = require('./decorators/ThemeDecorator.svelte').default;

//  Lock stories at a specific date
require('mockdate').set('2021-08-11');

module.exports = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      disable: true,
    },
  },
  decorators: [(_, { parameters }) => ({ Component: ThemeDecorator, props: { ...parameters } })],
};
