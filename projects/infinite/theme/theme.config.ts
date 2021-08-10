const Theme = {
  Default: 'theme-default',
  Dark: 'theme-dark',
};

export const themeConfig = {
  '*.root': Theme.Default,
  '*.header': Theme.Dark,
  '$index.*.root': Theme.Dark,
  '$collection.*.root': Theme.Dark,
  '$product.*.root': Theme.Dark,
  '$collectors.*.root': Theme.Dark,
};
