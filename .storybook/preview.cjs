require('../src/app.css');
require('../static/aria/fonts/Graphik/stylesheet.css');
require('../projects/aria/theme/theme.css');
const MarginDecorator = require('./decorators/ThemeDecorator.svelte').default;

module.exports = {
  parameters: {
    backgrounds: {
      disable: true,
    },
  },
  decorators: [() => MarginDecorator],
};
