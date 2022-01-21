<script lang="ts" context="module">
  import type { LoadInput } from '@sveltejs/kit';

  export async function load({ url }: LoadInput) {
    let urlString: string = undefined;

    if (url.searchParams.has('code') && url.searchParams.has('state')) {
      urlString = `://${url.hostname}${url.pathname}?${url.searchParams}`;
    } else if (url.searchParams.has('error')) {
      return {
        status: 401,
        error: url.searchParams.get('error_description') || 'Unknown authorization error',
      };
    }
    return {
      status: 200,
      props: {
        url: urlString,
        returnUrl: url.searchParams.get('returnUrl'),
      },
    };
  }
</script>

<script lang="ts">
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { initUserAuth, handleRedirectCallback } from '$lib/user';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';

  export let url: string;
  export let returnUrl: string;

  if (browser) {
    (async () => {
      if (url) {
        await handleRedirectCallback(url);
      }
      await initUserAuth();
      await goto(returnUrl || '/', { replaceState: true });
    })();
  }
</script>

<FullScreenLoader class="fixed top-0 bottom-0 right-0 left-0 bg-black text-white z-∞" --lds-size="3.75rem"
  ><span class="text-2xl">Authorizing...</span>
</FullScreenLoader>
