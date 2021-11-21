export default {
  index: '/',
  marketplace: '/marketplace',
  sku: (skuId) => `/marketplace/${skuId}`,
  skuAuction: (skuId) => `/auction/${skuId}`,
  product: (productId) => `/product/${productId}`,
  collection: (username) => `/collection/${username}`,
  collectors: (skuId) => `/collectors/${skuId}`,
  wallet: '/u/wallet',
  deposit: '/u/wallet/deposit',
  account: '/u/account',
  help: '/help',
  privacy: '/privacy',
  terms: '/terms',
  about: '/about',
  careers: '/careers',
  signin() {
    document.location.href = `/auth/signin?returnUrl=${window.location.href}`;
  },
  signout() {
    document.location.href = '/auth/signout';
  },
  signup() {
    document.location.href = '/auth/signup';
  },
  partner: '/partner',
};
