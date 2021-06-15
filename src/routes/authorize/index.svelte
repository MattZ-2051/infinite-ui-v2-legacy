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
      },
    };
  }
</script>

<script lang="ts">
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { handleRedirectCallback } from '$lib/auth';

  export let url: string;

  if (browser) {
    (async () => {
      if (url) {
        await handleRedirectCallback(url);
      }
      await goto('/');
    })();
  }
</script>

<div class="flex items-center justify-center h-screen w-full bg-black text-white text-6xl">
  <div class="lds-dual-ring" />
</div>

<style>
  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
