<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { isCookiesAccepted } from '$lib/components/gdpr/gdpr.store';
  import { init } from '$lib/gtag';
  import injectScript from '$util/injectScript';
  import bucketAssets from '$project/assets/aws-bucket-assets';
  import { CLIENT_DOC_DESCRIPTION } from './variables';

  const adobeAnalyticsUrl = import.meta.env?.VITE_ADOBE_ANALYTICS_URL as string;

  $: $isCookiesAccepted && init();

  onMount(async () => {
    await injectScript({
      url: adobeAnalyticsUrl,
      id: 'adobe-analytics',
    });
  });
</script>

<svelte:head>
  <link rel="preconnect" href={bucketAssets.baseBucketUrl} />
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
  {#if $page.url.pathname === '/'}
    <link
      rel="preload"
      href={$page.url.searchParams.get('phase') === '1' || $page.url.searchParams.get('phase') === '2'
        ? bucketAssets.landing.hero
        : bucketAssets.landing.hero3}
      as="video"
    />
  {/if}
  <link rel="stylesheet" href="/fonts/stylesheet.css" />
</svelte:head>
