const Theme = {
  Dark: 'theme-dark',
  Light: 'theme-light',
  BrandFooter: 'theme-brand-footer',
};

export const themeConfig = {
  '*.header': Theme.Dark,
  '$index.*.root': Theme.Dark,
  '$collection.*.root': Theme.Dark,
  '$marketplace.root': Theme.Light,
  '$marketplace.*.root': [Theme.Dark, Theme.BrandFooter],
  '*.sku-price-box': Theme.Light,
  '*.sku-offsreen': Theme.Light,
  '$product.*.root': Theme.Dark,
  '$collectors.*.root': Theme.Dark,
  '*.modal': Theme.Light,
};
