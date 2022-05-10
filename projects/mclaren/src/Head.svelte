<script lang="ts">
  import { onMount } from 'svelte';
  import { isCookiesAccepted } from '$lib/components/gdpr/gdpr.store';
  import { init } from '$lib/gtag';
  import injectScript from '$util/injectScript';
  import bucketAssets from '$project/assets/aws-bucket-assets';
  import { G_SITE_VERIFICATION } from './variables';

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
  <meta name="google-site-verification" content={G_SITE_VERIFICATION} />
  <link rel="stylesheet" href="/fonts/stylesheet.css" />
</svelte:head>
