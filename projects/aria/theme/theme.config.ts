const Theme = {
  Brand: 'theme-brand',
};

export const themeConfig = {
  '*.header': Theme.Brand,
  '*.sku': Theme.Brand,
  '*.issuer': Theme.Brand,
  '$u.$wallet.*': Theme.Brand,
  '$u.$account.*': Theme.Brand,
  '$partner.*.root': Theme.Brand,
};
