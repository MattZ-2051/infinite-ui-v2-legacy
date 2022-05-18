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
  <link
    rel="preload"
    as="font"
    href="/fonts/Space-Mono/SpaceMono-Regular.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Space-Mono/SpaceMono-Bold.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Space-Mono/SpaceMono-BoldItalic.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Space-Mono/SpaceMono-Italic.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Almarena/AlmarenaDisplayBold.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Almarena/AlmarenaDisplayRegular.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link rel="stylesheet" href="/fonts/stylesheet.css" />

  <!--Google Consent Mode-->
  <script data-cookieconsent="ignore">
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
      wait_for_update: 500,
    });
    gtag('set', 'ads_data_redaction', true);
  </script>
  <!-- End Google Consent Mode-->
  <!-- Google Tag Manager -->
  <script data-cookieconsent="ignore">
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-MKKZHWC');
  </script>
  <!-- End Google Tag Manager -->
  <!--Cookiebot-->
  <script
    data-cookieconsent="ignore"
    id="Cookiebot"
    type="text/javascript"
    src="https://consent.cookiebot.com/uc.js"
    data-cbid={import.meta.env.VITE_COOKIEBOT_DOMAIN_ID}>
  </script>
  <!-- End Cookiebot-->
</svelte:head>
