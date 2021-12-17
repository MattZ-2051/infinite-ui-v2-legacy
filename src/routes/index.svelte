<script context="module" lang="ts">
  import type { Awaited } from 'ts-essentials';
  import routes from '$project/routes';
  import { loadData } from '$project/landing/landing.api';

  const redirect = import.meta.env.VITE_REDIRECT_INDEX;

  export async function load({ fetch }) {
    if (redirect) {
      return {
        status: 302,
        redirect: routes.marketplace,
      };
    }

    return {
      props: { data: await loadData({ fetch }) },
    };
  }
</script>

<script lang="ts">
  import { Seo } from '$lib/seo';
  import Landing from '$project/landing/Landing.svelte';

  export let data: Awaited<ReturnType<typeof loadData>>;
</script>

<Seo />

<Landing {...data} />
