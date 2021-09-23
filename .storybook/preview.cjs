require('../projects/aria/theme/theme.css');
require('../src/app.css');
require('../projects/aria/theme/app.css');
require('../static/aria/fonts/Graphik/stylesheet.css');
const ThemeDecorator = require('./decorators/ThemeDecorator.svelte').default;

//  Lock stories at a specific date
require('mockdate').set('2021-08-11');

module.exports = {
  parameters: {
    backgrounds: {
      disable: true,
    },
  },
  decorators: [() => ThemeDecorator],
};
