const Theme = {
  Dark: 'theme-dark',
  Light: 'theme-light',
  variant2: 'theme-variant-2',
  // BrandFooter: 'theme-brand-footer',
};

export const themeConfig = {
  '*.header': Theme.variant2,
  // '$marketplace.root': Theme.Light,
  // '$marketplace.*.footer': Theme.BrandFooter,
  // '$marketplace.root.footer': Theme.Light,
  // '$u.$wallet.$deposit.root': Theme.Light,
  // '$help.*.root': Theme.Light,
  // '*.sku-offsreen': Theme.Light,
  // '*.wallet-list': Theme.Light,
  // '*.modal': Theme.Light,
  // '*.error': Theme.Light,
};
