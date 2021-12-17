<script lang="ts" context="module">
  import type { LoadInput } from '@sveltejs/kit';

  export async function load({ page: { host, path, query } }: LoadInput) {
    let url: string = undefined;

    if (query.has('code') && query.has('state')) {
      url = `://${host}${path}?${query}`;
    } else if (query.has('error')) {
      return {
        status: 401,
        error: query.get('error_description') || 'Unknown authorization error',
      };
    }

    return {
      status: 200,
      props: {
        url,
        returnUrl: query.get('returnUrl'),
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
