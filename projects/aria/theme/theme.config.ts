const Theme = {
  Tabs: 'theme-tabs',
  Form: 'theme-form',
  Light: 'theme-light',
};

export const themeConfig = {
  '*.issuer': Theme.Tabs,
  '*.sku': Theme.Tabs,
  '*.sku-pricebox': Theme.Light,
  '$u.$wallet.*': Theme.Tabs,
  '$u.$account.*': Theme.Form,
  '$partner.*.root': Theme.Form,
  '$product.*': Theme.Tabs,
  '*.modal': Theme.Light,
};
