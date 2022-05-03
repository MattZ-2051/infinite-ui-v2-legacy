<script lang="ts">
  import { walletConnected } from '$lib/metamask';
  import { user } from '$lib/user';
  import { links } from '$project/header/main-links';
  import PureHeader from './PureHeader.svelte';

  const CURRENT_PHASE = import.meta.env.VITE_CURRENT_PHASE as string;
  $: phase = CURRENT_PHASE ?? '1';
</script>

<PureHeader user={$user} links={links(phase, $walletConnected)} />
