import type { Link } from '$lib/layout/header/types';
import { mdiLogout } from '@mdi/js';

import mdiCogOutline from '$lib/layout/header/assets/gear';
import mdiCreditCardOutline from '$lib/layout/header/assets/wallet';
import myCollection from '$lib/layout/header/assets/my-collection';
import connectWallet from '$lib/layout/header/assets/connect-wallet';

export const links = (phase: string): Link[] => {
  const excludeByPhase = phase === '1' || phase === '2';
  const excludeFor = excludeByPhase && ['/'];

  return [
    { type: 'route', location: 'header', id: 'index', label: 'Home' },
    { type: 'route', location: 'header', id: 'skuCollections', label: 'Collections', excludeFor },
    { type: 'route-open-new', location: 'header', id: 'faq', label: 'F.A.Q.' },
    { type: 'user-collection', location: 'user-menu', label: 'My Collection', icon: myCollection },
    { type: 'route', location: 'user-menu', id: 'wallet', label: 'My Wallet', icon: mdiCreditCardOutline },
    { type: 'wallet-extensions', location: 'user-menu', label: 'Connect external wallet', icon: connectWallet },
    { type: 'route', location: 'user-menu', id: 'account', label: 'Account Settings', icon: mdiCogOutline },
    { type: 'sign-in', location: 'header', label: 'Sign in', excludeFor },
    { type: 'sign-up', location: 'header', label: 'Sign up', excludeFor },
    { type: 'sign-out', location: 'user-menu', label: 'Sign Out', icon: mdiLogout },
  ];
};
