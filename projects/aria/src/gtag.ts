const CLIENT_GA_ID = import.meta.env.VITE_CLIENT_GA_ID;

export const gtag = `<script type="text/javascript" async src="https://www.googletagmanager.com/gtag/js?id=${CLIENT_GA_ID}"></script>
<script>window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', '${CLIENT_GA_ID}');
</script>`;
