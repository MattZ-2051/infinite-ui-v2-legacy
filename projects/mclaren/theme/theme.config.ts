const Theme = {
  Dark: 'theme-dark',
  Light: 'theme-light',
  ButtonsVariantHeader: 'theme-buttons-variant-header',
  ButtonsVariantPresentationPages: 'theme-buttons-variant-presentation-pages',
  WalletButtons: 'theme-brand-wallet-buttons',
  WalletBalance: 'theme-wallet-balance',
  SearchRoundedBar: 'theme-search-bar',
  Footer: 'theme-footer',
  PaymentButtons: 'theme-payment-button',
  DarkGradientBackground: 'theme-dark-gradient-bg',
};

export const themeConfig = {
  '*.header': Theme.ButtonsVariantHeader,
  '$index.root': [Theme.ButtonsVariantPresentationPages, Theme.Dark],
  '$marketplace.$create.root': Theme.Light,
  '*.wallet-buttons': Theme.WalletButtons,
  '*.wallet-balance': Theme.WalletBalance,
  '$collections.root': Theme.ButtonsVariantPresentationPages,
  '$collections.*': [Theme.ButtonsVariantPresentationPages, Theme.Dark],
  '$product.*': [Theme.Light, Theme.ButtonsVariantPresentationPages],
  '*.wallet-list': Theme.Light,
  '*.search-bar': Theme.SearchRoundedBar,
  '*.error': [Theme.Dark, Theme.DarkGradientBackground],
  '*.modal': Theme.Light,
  '*.footer': Theme.Footer,
  '*.payment-buttons': Theme.PaymentButtons,
  '$privacy.root': Theme.Dark,
  '$terms.root': Theme.Dark,
  '$cookies.root': Theme.Dark,
  '*.sidebar-menu': [Theme.Dark, Theme.ButtonsVariantHeader],
};
