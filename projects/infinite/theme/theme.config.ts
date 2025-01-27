const Theme = {
  Dark: 'theme-dark',
  Light: 'theme-light',
  BrandFooter: 'theme-brand-footer',
  CheckoutVariants: 'theme-checkout-variants',
};

export const themeConfig = {
  '*.header': Theme.Dark,
  '$marketplace.root': Theme.Light,
  '$marketplace.$create.root': Theme.Light,
  '$marketplace.*.footer': Theme.BrandFooter,
  '$marketplace.root.footer': Theme.Light,
  '$u.$wallet.$deposit.root': Theme.Light,
  '$checkout.*': Theme.Light,
  '$help.*.root': Theme.Light,
  '$checkout.*.root': [Theme.Light, Theme.CheckoutVariants],
  '*.sku-offsreen': Theme.Light,
  '*.wallet-list': Theme.Light,
  '*.modal': Theme.Light,
  '*.error': Theme.Light,
  '$cookies.root': Theme.Light,
};
