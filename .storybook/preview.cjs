require('../src/app.css');
require('../static/fonts/Graphik/stylesheet.css');

module.exports = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
