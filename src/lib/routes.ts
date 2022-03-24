export default {
  index: '/',
  marketplace: '/marketplace',
  sku: (skuId) => `/marketplace/${skuId}`,
  createSku: '/marketplace/create',
  skuAuction: (skuId) => `/auction/${skuId}`,
  product: (productId) => `/product/${productId}`,
  collection: (username) => `/collection/${username}`,
  skuCollections: '/collections',
  skuCollection: (skuCollectionId) => `/collections/${skuCollectionId}`,
  collectors: (skuId, queryParameters = '') => `/collectors/${skuId}${queryParameters}`,
  checkoutProduct: (id, stateParamaters = '') => `/checkout/product/${id}${stateParamaters}`,
  checkoutSku: (id, queryParameters = '') => `/checkout/sku/${id}${queryParameters}`,
  wallet: '/u/wallet',
  deposit: '/u/wallet/deposit',
  depositMoonPay: '/u/wallet/deposit-moonpay',
  account: '/u/account',
  help: '/help',
  privacy: '/privacy',
  cookies: '/cookies',
  terms: '/terms',
  about: '/about',
  careers: '/careers',
  partner: '/partner',
};
