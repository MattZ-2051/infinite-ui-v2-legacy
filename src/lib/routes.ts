const routes = {
  index: '/',
  marketplace: '/marketplace',
  sku: (skuId) => `/marketplace/${skuId}`,
  product: (productId) => `/product/${productId}`,
  collection: (username) => `/collection/${username}`,
  collectors: (skuId) => `/collectors/${skuId}`,
  wallet: '/u/wallet',
  deposit: '/u/wallet/deposit',
  account: '/u/account',
  help: '/help',
  privacy: '/privacy',
  terms: '/terms',
  faq: '/faq',
};

export default routes;
