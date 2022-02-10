const Theme = {
  Dark: 'theme-dark',
  Light: 'theme-light',
  ButtonsVariant2: 'theme-buttons-variant-2',
  WalletButtons: 'theme-brand-wallet-buttons',
  WalletBalance: 'theme-wallet-balance',
  // BrandFooter: 'theme-brand-footer',
};

export const themeConfig = {
  '*.header': Theme.ButtonsVariant2,
  '$index.root': Theme.ButtonsVariant2,
  '*.wallet-buttons': Theme.WalletButtons,
  '*.wallet-balance': Theme.WalletBalance,
  // '$index.root': Theme.Dark,
  // '$marketplace.root': Theme.Light,
  // '$marketplace.*.footer': Theme.BrandFooter,
  // '$marketplace.root.footer': Theme.Light,
  '*.wallet-list': Theme.Light,
  // '$u.$wallet.root': Theme.Dark,
  '*.error': Theme.Dark,
  // '$u.$wallet.$deposit.root': Theme.Light,
  // '$help.*.root': Theme.Light,
  // '*.sku-offsreen': Theme.Light,
  // '*.modal': Theme.Light,
  // '*.error': Theme.Light,
};
