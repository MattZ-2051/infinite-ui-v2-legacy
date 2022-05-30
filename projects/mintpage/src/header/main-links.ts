import type { Link } from '$lib/layout/header/types';
import { mdiLogout } from '@mdi/js';
import mdiCogOutline from '$lib/layout/header/assets/gear';
import mdiCreditCardOutline from '$lib/layout/header/assets/wallet';

export const links: Link[] = [
  { type: 'route', location: 'header', id: 'index', label: 'Home' },
  { type: 'route', location: 'header', id: 'marketplace', label: 'Exchange' },
  { type: 'route', location: 'header', id: 'externalAbout', label: 'About Us' },
  { type: 'user-collection', location: 'header', label: 'My Collection' },
  { type: 'route', location: 'user-menu', id: 'account', label: 'Account Settings', icon: mdiCogOutline },
  { type: 'route', location: 'user-menu', id: 'wallet', label: 'My Wallet', icon: mdiCreditCardOutline },
  { type: 'sign-in', location: 'header', label: 'Sign in' },
  { type: 'sign-up', location: 'header', label: 'Sign up' },
  { type: 'sign-out', location: 'user-menu', label: 'Sign Out', icon: mdiLogout },
];
