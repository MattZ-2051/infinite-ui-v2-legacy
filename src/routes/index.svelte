<script context="module" lang="ts">
  import type { Awaited } from 'ts-essentials';
  import { loadData } from '$project/landing/landing.api';

  export async function load({ fetch }) {
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
