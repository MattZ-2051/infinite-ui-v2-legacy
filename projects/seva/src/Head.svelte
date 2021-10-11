<script lang="ts">
  import { CLIENT_DOC_DESCRIPTION } from './variables';
</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" />
  <meta name="description" content={CLIENT_DOC_DESCRIPTION} />
  <link rel="preload" as="font" href="/fonts/Ubuntu/Ubuntu-Light.ttf" type="font/ttf" crossorigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/Ubuntu/Ubuntu-Medium.ttf" type="font/ttf" crossorigin="anonymous" />
  <link rel="stylesheet" href="/fonts/stylesheet.css" />
  {#if import.meta.env.VITE_HUBSPOT_PORTAL_ID}
    <script
      type="text/javascript"
      async
      defer
      src="//js.hs-scripts.com/{import.meta.env.VITE_HUBSPOT_PORTAL_ID}.js"></script>
  {/if}
</svelte:head>
