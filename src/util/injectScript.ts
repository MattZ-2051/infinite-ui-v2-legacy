/**
 * Standard interface for loading third-party dependencies (scripts).
 * Usually required when integrating third-party SDKs.
 */
export default function injectScript({
  url,
  id,
  async = true,
  defer = true,
}: {
  url: string;
  id: string;
  async?: boolean;
  defer?: boolean;
}): Promise<unknown> {
  return new Promise(function injectScriptCallback(resolve, reject) {
    const scriptId = `injected-script-${id}`;
    const existingScript = document.querySelector(`#${scriptId}`) as HTMLScriptElement | undefined;
    if (existingScript) {
      // Same script id/url: keep same script
      if (existingScript.src === url) {
        if (existingScript.dataset.state === 'ready') {
          return resolve(id);
        } else {
          existingScript.addEventListener('load', function () {
            resolve(id);
          });
          existingScript.addEventListener('error', function (error) {
            reject(error);
          });
          return;
        }
      } else {
        // Same script id but url changed: recreate the script
        existingScript.remove();
      }
    }

    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = url;
    script.id = scriptId;
    script.async = async;
    script.defer = defer;
    script.addEventListener('load', onload);
    script.addEventListener('error', reject);

    function onload() {
      script.dataset.state = 'ready';
      resolve(id);
    }

    document.head.append(script);
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error('injectScript error:', error);
    throw error;
  });
}
