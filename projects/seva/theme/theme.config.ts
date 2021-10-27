const Theme = {
  Dark: 'theme-dark',
  Light: 'theme-light',
};

export const themeConfig = {
  '$index.root': Theme.Light,
  '*.landing-head-left-card': Theme.Dark,
  '*.landing-head-right-card': Theme.Dark,
  '$about.root': Theme.Light,
  '*.header': Theme.Dark,
  '$about.*.footer': Theme.Dark,
  '$marketplace.root': Theme.Light,
  '$help.*.root': Theme.Light,
  '*.sku-offsreen': Theme.Light,
  '*.wallet-list': Theme.Light,
  '$u.$wallet.$deposit.root': Theme.Light,
  '*.modal': Theme.Light,
  '$collection.*.root': Theme.Light,
  '*.error': Theme.Light,
};
