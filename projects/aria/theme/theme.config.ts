const Theme = {
  BrandTabs: 'theme-brand-tabs',
  Light: 'theme-light',
  WalletButtons: 'theme-brand-wallet-buttons',
};

export const themeConfig = {
  '*.issuer': Theme.BrandTabs,
  '$marketplace.*.root': Theme.BrandTabs,
  '$u.$wallet.*': Theme.BrandTabs,
  '$product.*': Theme.BrandTabs,
  '*.modal': Theme.Light,
  '*.wallet-buttons': Theme.WalletButtons,
  '$cookies.root': Theme.Light,
};
