<script lang="ts">
  import { CLIENT_DOC_DESCRIPTION } from './variables';
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
  {#if import.meta.env.VITE_HUBSPOT_PORTAL_ID}
    <script
      type="text/javascript"
      async
      defer
      src="//js.hs-scripts.com/{import.meta.env.VITE_HUBSPOT_PORTAL_ID}.js"></script>
  {/if}
</svelte:head>
