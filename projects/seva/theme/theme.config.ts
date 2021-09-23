const Theme = {
  Dark: 'theme-dark',
  Light: 'theme-light',
};

export const themeConfig = {
  '*.header': Theme.Dark,
  '$marketplace.root': Theme.Light,
  '$help.*.root': Theme.Light,
  '*.sku-offsreen': Theme.Light,
  '*.wallet-list': Theme.Light,
  '*.modal': Theme.Light,
};
