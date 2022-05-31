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
  <link rel="stylesheet" href="/fonts/fonts.css" />
  <meta name="description" content={CLIENT_DOC_DESCRIPTION} />
</svelte:head>
