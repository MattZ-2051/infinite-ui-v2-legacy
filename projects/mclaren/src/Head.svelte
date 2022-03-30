<script lang="ts">
  import { onMount } from 'svelte';
  import injectScript from '$util/injectScript';
  import { CLIENT_DOC_DESCRIPTION } from './variables';

  const adobeAnalyticsUrl = import.meta.env?.VITE_ADOBE_ANALYTICS_URL as string;

  onMount(async () => {
    await injectScript({
      url: adobeAnalyticsUrl,
      id: 'adobe-analytics',
    });
  });
</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" />
  <meta name="description" content={CLIENT_DOC_DESCRIPTION} />
  <link
    rel="preload"
    as="font"
    href="/fonts/PlusJakarta_Sans/webfonts/PlusJakartaSans-Light.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/PlusJakarta_Sans/webfonts/PlusJakartaSans-Medium.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link rel="stylesheet" href="/fonts/stylesheet.css" />
</svelte:head>
