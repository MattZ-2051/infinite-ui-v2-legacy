import type { Writable } from 'svelte/store';
import watchMedia from 'svelte-media';

declare const process: {
  env: {
    tw: { screens: { [key: string]: string } };
  };
};

const mediaQueries = {
  // sm: `(min-width: ${process.env.tw.screens.sm})`,
  md: `(min-width: ${process.env.tw.screens.md})`,
  // lg: `(min-width: ${process.env.tw.screens.sm})`,
};

export const media = watchMedia(mediaQueries) as Writable<{ md: boolean }>;
