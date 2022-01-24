<script lang="ts">
  import { CLIENT_DOC_DESCRIPTION } from './variables';
  import { hubspot } from './hubspot.script';
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
  {@html hubspot}
</svelte:head>
