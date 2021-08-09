import type { Writable } from 'svelte/store';
import watchMedia from 'svelte-media';

export type Screens<T = string> = {
  sm: T;
  md: T;
  lg: T;
  xl: T;
  '2xl': T;
};

declare const process: {
  env: {
    tw: { screens: Screens };
  };
};

export const mediaQueries: Screens = ['sm', 'md', 'lg', 'xl', '2xl']
  // eslint-disable-next-line unicorn/prefer-object-from-entries
  .reduce((screens, breakpoint) => {
    screens[breakpoint] = `(min-width: ${process.env.tw.screens[breakpoint]})`;
    return screens;
  }, {}) as Screens;

export const media = watchMedia(mediaQueries) as Writable<Screens<boolean>>;
