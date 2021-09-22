<script lang="ts">
  import { CLIENT_DOC_TITLE, CLIENT_DOC_DESCRIPTION } from './variables';
</script>

<svelte:head>
  <title>{CLIENT_DOC_TITLE}</title>
  <link rel="icon" href="/favicon.ico" />
  <meta name="description" content={CLIENT_DOC_DESCRIPTION} />
  <link rel="preload" as="font" href="/fonts/Ubuntu/Ubuntu-Light.ttf" type="font/ttf" crossorigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/Ubuntu/Ubuntu-Medium.ttf" type="font/ttf" crossorigin="anonymous" />
  <link rel="stylesheet" href="/fonts/stylesheet.css" />
</svelte:head>
