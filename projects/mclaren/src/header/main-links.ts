import type { Link } from '$lib/layout/header/types';

export const links = (connectedWallet: boolean): Link[] => [
  { type: 'route', location: 'header', id: 'index', label: 'Home' },
  {
    type: 'route',
    location: 'header',
    id: 'skuCollections',
    label: 'COLLECTIONS',
  },
  { type: 'route-open-new', location: 'header', id: 'faq', label: 'F.A.Q.', classes: 'block md:hidden lg:block' },
  { type: 'route-open-new', location: 'header', id: 'discord', label: 'DISCORD' },
  { type: 'route-open-new', location: 'header', id: 'opensea', label: 'OPENSEA' },
  { type: 'user-collection', location: 'user-menu', label: 'MY COLLECTION' },
  { type: 'route', location: 'user-menu', id: 'wallet', label: 'MY WALLET' },
  {
    type: 'wallet-extensions',
    location: 'user-menu',
    label: connectedWallet ? 'DISCONNECT EXTERNAL WALLET' : 'CONNECT EXTERNAL WALLET',
  },
  { type: 'route', location: 'user-menu', id: 'account', label: 'ACCOUNT SETTINGS' },
  { type: 'sign-in', location: 'header', label: 'SIGN IN' },
  { type: 'sign-up', location: 'header', label: 'SIGN UP' },
  { type: 'sign-out', location: 'user-menu', label: 'SIGN OUT' },
];
