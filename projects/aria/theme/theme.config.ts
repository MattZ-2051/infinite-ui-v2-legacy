const Theme = {
  BrandTabs: 'theme-brand-tabs',
  BrandForms: 'theme-brand-forms',
  Light: 'theme-light',
};

export const themeConfig = {
  '*.issuer': Theme.BrandTabs,
  '$marketplace.*.root': Theme.BrandTabs,
  '*.sku-price-box': Theme.Light,
  '$u.$wallet.*': Theme.BrandTabs,
  '$u.$account.*': Theme.BrandForms,
  '$partner.*.root': Theme.BrandForms,
  '$product.*': Theme.BrandTabs,
  '*.modal': Theme.Light,
};
