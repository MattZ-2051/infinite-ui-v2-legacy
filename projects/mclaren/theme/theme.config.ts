const Theme = {
  Dark: 'theme-dark',
  Light: 'theme-light',
  variant2: 'theme-variant-2',
  WalletBalance: 'theme-wallet-balance',
  WalletButtons: 'theme-brand-wallet-buttons',
  // BrandFooter: 'theme-brand-footer',
};

export const themeConfig = {
  '*.header': Theme.variant2,
  '$index.root': Theme.variant2,
  '*.wallet-buttons': Theme.WalletButtons,
  '*.wallet-balance': Theme.WalletBalance,
  // '$marketplace.root': Theme.Light,
  // '$marketplace.*.footer': Theme.BrandFooter,
  // '$marketplace.root.footer': Theme.Light,
  // '$u.$wallet.$deposit.root': Theme.Light,
  // '$help.*.root': Theme.Light,
  // '*.sku-offsreen': Theme.Light,
  // '*.modal': Theme.Light,
  // '*.error': Theme.Light,
};
