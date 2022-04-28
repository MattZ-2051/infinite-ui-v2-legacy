<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { isCookiesAccepted } from '$lib/components/gdpr/gdpr.store';
  import { init } from '$lib/gtag';
  import injectScript from '$util/injectScript';
  import bucketAssets from '$project/assets/aws-bucket-assets';
  import { CLIENT_DOC_DESCRIPTION, G_SITE_VERIFICATION } from './variables';

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
  <meta name="google-site-verification" content={G_SITE_VERIFICATION} />
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
    <link rel="preload" href={bucketAssets.landing.hero} as="video" />
  {/if}
  <link rel="stylesheet" href="/fonts/stylesheet.css" />
</svelte:head>
