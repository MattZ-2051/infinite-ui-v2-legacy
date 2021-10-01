const Theme = {
  Dark: 'theme-dark',
  Light: 'theme-light',
};

export const themeConfig = {
  '$index.root': Theme.Light,
  '$about.root': Theme.Light,
  '*.header': Theme.Dark,
  '$marketplace.root': Theme.Light,
  '$help.*.root': Theme.Light,
  '*.sku-offsreen': Theme.Light,
  '*.wallet-list': Theme.Light,
  '*.modal': Theme.Light,
  '$collection.*.root': Theme.Light,
};
