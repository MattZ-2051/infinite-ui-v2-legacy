const Theme = {
  Default: 'theme-default',
  Dark: 'theme-dark',
};

export const themeConfig = {
  $index: Theme.Dark,
  '*.header': Theme.Dark,
  '$collection.*': Theme.Dark,
  '$product.*': Theme.Dark,
  '$collectors.*': Theme.Dark,
};
