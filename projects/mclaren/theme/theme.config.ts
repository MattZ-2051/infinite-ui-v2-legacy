const Theme = {
  Light: 'theme-light',
  Variant2: 'theme-variant-2',
  WalletButtons: 'theme-brand-wallet-buttons',
  WalletBalance: 'theme-wallet-balance',
  // BrandFooter: 'theme-brand-footer',
};

export const themeConfig = {
  // '$index.root': Theme.Dark,
  '*.header': Theme.Variant2,
  // '$marketplace.root': Theme.Light,
  // '$marketplace.*.footer': Theme.BrandFooter,
  // '$marketplace.root.footer': Theme.Light,
  '*.wallet-list': Theme.Light,
  // '$u.$wallet.root': Theme.Dark,
  '*.wallet-buttons': Theme.WalletButtons,
  '*.wallet-balance': Theme.WalletBalance,
  // '$u.$wallet.$deposit.root': Theme.Light,
  // '$help.*.root': Theme.Light,
  // '*.sku-offsreen': Theme.Light,
  // '*.modal': Theme.Light,
  // '*.error': Theme.Light,
};
