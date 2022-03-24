import injectScript from '$util/injectScript';

const CLIENT_GA_ID = import.meta.env.VITE_CLIENT_GA_ID;
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: any;
  }
}

export const init = async function () {
  window.dataLayer = window.dataLayer || [];

  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', `${CLIENT_GA_ID}`);

  await injectScript({ id: 'gtag', url: `https://www.googletagmanager.com/gtag/js?id=${CLIENT_GA_ID}` });
};
