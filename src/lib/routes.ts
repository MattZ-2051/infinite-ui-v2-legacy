export default {
  index: '/',
  marketplace: '/marketplace',
  sku: (skuId) => `/marketplace/${skuId}`,
  skuAuction: (skuId) => `/auction/${skuId}`,
  product: (productId) => `/product/${productId}`,
  collection: (username) => `/collection/${username}`,
  collectors: (skuId, queryParameters = '') => `/collectors/${skuId}${queryParameters}`,
  wallet: '/u/wallet',
  deposit: '/u/wallet/deposit',
  depositMoonPay: '/u/wallet/deposit-moonpay',
  account: '/u/account',
  help: '/help',
  privacy: '/privacy',
  terms: '/terms',
  about: '/about',
  careers: '/careers',
  partner: '/partner',
};
