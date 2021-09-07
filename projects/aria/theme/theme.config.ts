const Theme = {
  Brand: 'theme-brand',
  Form: 'theme-form',
  Modal: 'theme-modal',
};

export const themeConfig = {
  '*.header': Theme.Brand,
  '*.sku': Theme.Brand,
  '*.issuer': Theme.Brand,
  '$u.$wallet.*': Theme.Brand,
  '$u.$account.*': Theme.Form,
  '$partner.*.root': Theme.Form,
  '$product.*': Theme.Brand,
  '*.modal': Theme.Modal,
};
