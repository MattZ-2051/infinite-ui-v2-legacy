<script lang="ts">
  import { CLIENT_DOC_DESCRIPTION } from './variables';
  import { gtag } from './gtag';
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
  <link rel="stylesheet" href="/fonts/stylesheet.css" />
  <script type="text/javascript" src={import.meta.env.VITE_SALESFORCE_BEACON} async></script>
  {@html gtag}
</svelte:head>
