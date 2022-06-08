<script lang="ts">
  import { walletConnected } from '$lib/web3';
  import { user } from '$lib/user';
  import { links } from '$project/header/main-links';
  import PureHeader from './PureHeader.svelte';
</script>

<PureHeader user={$user} links={links($walletConnected)} />
