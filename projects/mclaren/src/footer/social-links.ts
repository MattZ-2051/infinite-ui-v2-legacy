import routes from '$project/routes';
import facebook from './assets/facebook';
import youtube from './assets/youtube';
import instagram from './assets/instagram';
import twitter from './assets/twitter';
import discord from './assets/discord';

export const links = [
  { id: 'Facebook', href: routes.facebook, path: facebook },
  { id: 'Twitter', href: routes.twitter, path: twitter },
  { id: 'Instagram', href: routes.instagram, path: instagram },
  { id: 'Youtube', href: routes.youtube, path: youtube },
  { id: 'Discord', href: routes.discord, path: discord },
];
