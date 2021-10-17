const Theme = {
  Dark: 'theme-dark',
  Light: 'theme-light',
  BrandFooter: 'theme-brand-footer',
};

export const themeConfig = {
  '*.header': Theme.Dark,
  '$marketplace.root': Theme.Light,
  '$marketplace.*.footer': Theme.BrandFooter,
  '$marketplace.root.footer': Theme.Light,
  '$help.*.root': Theme.Light,
  '*.sku-offsreen': Theme.Light,
  '*.wallet-list': Theme.Light,
  '*.modal': Theme.Light,
  '*.error': Theme.Light,
};
