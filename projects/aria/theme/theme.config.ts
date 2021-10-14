const Theme = {
  BrandTabs: 'theme-brand-tabs',
  Light: 'theme-light',
};

export const themeConfig = {
  '*.issuer': Theme.BrandTabs,
  '$marketplace.*.root': Theme.BrandTabs,
  '$u.$wallet.*': Theme.BrandTabs,
  '$product.*': Theme.BrandTabs,
  '*.modal': Theme.Light,
};
