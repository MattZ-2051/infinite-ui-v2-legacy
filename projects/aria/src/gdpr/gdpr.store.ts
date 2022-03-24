import { derived, writable } from 'svelte/store';

import Cookies from 'js-cookie';

const cookieName = 'cookies_accepted';

export const isBannerVisible = writable(false);

export const isCookiesAccepted = derived(
  isBannerVisible,
  ($isBannerVisible) => !$isBannerVisible && Cookies.get(cookieName) === 'true'
);

export function initializeBanner() {
  isBannerVisible.set(!Cookies.get(cookieName));
}

export function hideBanner(accept: boolean) {
  Cookies.set(cookieName, `${accept}`);
  isBannerVisible.set(false);
}
