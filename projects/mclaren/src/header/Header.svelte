<script lang="ts">
  import { web3User } from '$lib/web3/web3.stores';
  import { user } from '$lib/user';
  import { links } from '$project/header/main-links';
  import PureHeader from './PureHeader.svelte';
</script>

<PureHeader user={$user} links={links($web3User.walletConnected)} />
