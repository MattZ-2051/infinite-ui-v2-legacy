require('../src/app.css');
require('../static/aria/fonts/Graphik/stylesheet.css');
require('../projects/aria/theme/theme.css');
const MarginDecorator = require('./decorators/ThemeDecorator.svelte').default;

//  Lock stories at a specific date
require('mockdate').set('2021-08-11');

module.exports = {
  parameters: {
    backgrounds: {
      disable: true,
    },
  },
  decorators: [() => MarginDecorator],
};
