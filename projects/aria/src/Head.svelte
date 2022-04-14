<script context="module" lang="ts">
  declare global {
    interface Window {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Cookiebot: any;
    }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { init } from '$lib/gtag';
  import injectScript from '$util/injectScript';
  import { CLIENT_DOC_DESCRIPTION } from './variables';

  onMount(async () => {
    await injectScript({
      id: 'Cookiebot',
      url: `https://consent.cookiebot.com/uc.js?cbid=${import.meta.env.VITE_COOKIEBOT_DOMAIN_ID}`,
    });

    window.addEventListener('CookiebotOnAccept', () => {
      if (window.Cookiebot.consented) init();
    });
  });
</script>

<svelte:head>
  <link rel="icon" href="/favicon.png" />
  <meta name="description" content={CLIENT_DOC_DESCRIPTION} />
  <link
    rel="preload"
    as="font"
    href="/fonts/Space-Grotesk/SpaceGrotesk-Light.woff2"
    type="font/ttf"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Space-Grotesk/SpaceGrotesk-Medium.woff2"
    type="font/ttf"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Space-Grotesk/SpaceGrotesk-Bold.woff2"
    type="font/ttf"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Space-Grotesk/SpaceGrotesk-SemiBold.woff2"
    type="font/ttf"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Space-Grotesk/SpaceGrotesk-Regular.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Space-Mono/SpaceMono-Regular.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Space-Mono/SpaceMono-Bold.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Space-Mono/SpaceMono-BoldItalic.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Space-Mono/SpaceMono-Italic.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Almarena/AlmarenaDisplayBold.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Almarena/AlmarenaDisplayRegular.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link rel="stylesheet" href="/fonts/stylesheet.css" />
</svelte:head>
