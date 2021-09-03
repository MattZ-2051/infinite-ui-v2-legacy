import routes from '$project/routes';

export default Object.freeze({
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
  about: '/about',
  careers: '/careers',
  signin: '/auth/signin',
  signout: '/auth/signout',
  signup: '/auth/signup',
  partner: '/partner',
  ...routes,
});
