type Icon = string | string[] | { [key: string]: string } | { [key: string]: string }[]; // https://materialdesignicons.com

export type Link = {
  type: 'route' | 'route-open-new' | 'user-collection' | 'wallet-extensions' | 'sign-up' | 'sign-in' | 'sign-out';
  location: 'user-menu' | 'header';
  label: string;
  id?: string;
  icon?: Icon;
  excludeFor?: string[];
};
