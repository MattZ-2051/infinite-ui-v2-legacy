const Theme = {
  Dark: 'theme-dark',
  Light: 'theme-light',
  BrandFooter: 'theme-brand-footer',
};

export const themeConfig = {
  '*.header': Theme.Dark,
  '$marketplace.root': Theme.Light,
  '$marketplace.*.footer': Theme.BrandFooter,
  '*.sku-price-box': Theme.Light,
  '*.sku-offsreen': Theme.Light,
  '*.wallet-list': Theme.Light,
  '*.modal': Theme.Light,
};
