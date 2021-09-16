<script lang="ts">
  import { CLIENT_DOC_TITLE, CLIENT_DOC_DESCRIPTION } from './variables';
</script>

<svelte:head>
  <title>{CLIENT_DOC_TITLE}</title>
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
