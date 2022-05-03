import type { Link } from '$lib/layout/header/types';

export const links = (phase: string, connectedWallet: boolean): Link[] => {
  const initialPhase = phase === '1' || phase === '2';
  const excludeFor = initialPhase && [
    '/',
    '/collections',
    '/privacy',
    '/help',
    '/cookies',
    '/terms',
    `/collections/${import.meta.env.VITE_DEFAULT_COLLECTION_ID}`,
  ];

  return [
    { type: 'route', location: 'header', id: 'index', label: 'Home' },
    {
      type: 'route',
      location: 'header',
      id: 'skuCollections',
      label: 'COLLECTIONS',
      excludeFor: phase === '1' && ['/', '/privacy', '/help', '/cookies', '/terms'],
    },
    { type: 'route-open-new', location: 'header', id: 'faq', label: 'F.A.Q.' },
    { type: 'route-open-new', location: 'header', id: 'discord', label: 'DISCORD' },
    { type: 'route-open-new', location: 'header', id: 'opensea', label: 'OPENSEA', excludeFor },
    { type: 'user-collection', location: 'user-menu', label: 'MY COLLECTION' },
    { type: 'route', location: 'user-menu', id: 'wallet', label: 'MY WALLET' },
    {
      type: 'wallet-extensions',
      location: 'user-menu',
      label: connectedWallet ? 'DISCONNECT EXTERNAL WALLET' : 'CONNECT EXTERNAL WALLET',
    },
    { type: 'route', location: 'user-menu', id: 'account', label: 'ACCOUNT SETTINGS' },
    { type: 'sign-in', location: 'header', label: 'SIGN IN', excludeFor },
    { type: 'sign-up', location: 'header', label: 'SIGN UP', excludeFor },
    { type: 'sign-out', location: 'user-menu', label: 'SIGN OUT' },
  ];
};
