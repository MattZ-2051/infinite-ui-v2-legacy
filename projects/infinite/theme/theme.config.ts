const Theme = {
  Dark: 'theme-dark',
};

export const themeConfig = {
  '*.header': Theme.Dark,
  '$index.*.root': Theme.Dark,
  '$collection.*.root': Theme.Dark,
  '$product.*.root': Theme.Dark,
  '$collectors.*.root': Theme.Dark,
};
