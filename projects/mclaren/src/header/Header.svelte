<script lang="ts">
  import { page } from '$app/stores';
  import { user } from '$lib/user';
  import { links } from '$project/header/main-links';
  import PureHeader from './PureHeader.svelte';

  $: phase = $page.url.searchParams.get('phase') ?? '1';
</script>

<PureHeader user={$user} links={links(phase)} />
