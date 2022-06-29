<script context="module" lang="ts">
  declare global {
    interface Window {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Cookiebot: any;
    }
  }
</script>

<script lang="ts">
  import { CLIENT_DOC_DESCRIPTION } from './variables';
</script>

<svelte:head>
  <link rel="icon" href="/favicon.png" />
  <meta name="description" content={CLIENT_DOC_DESCRIPTION} />
  <link rel="preload" as="font" href="/fonts/Inter/Inter-Light.ttf" type="font/ttf" crossorigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/Inter/Inter-Medium.ttf" type="font/ttf" crossorigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/Inter/Inter-Regular.ttf" type="font/ttf" crossorigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/Inter/Inter-SemiBold.ttf" type="font/ttf" crossorigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/Inter/Inter-Bold.ttf" type="font/ttf" crossorigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/Lora/Lora-Medium.ttf" type="font/ttf" crossorigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/Lora/Lora-Regular.ttf" type="font/ttf" crossorigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/Lora/Lora-SemiBold.ttf" type="font/ttf" crossorigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/Lora/Lora-Bold.ttf" type="font/ttf" crossorigin="anonymous" />
  <link rel="stylesheet" href="/fonts/stylesheet.css" />
</svelte:head>
