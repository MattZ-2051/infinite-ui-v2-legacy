<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import CollectionTabs from '$lib/features/collection/CollectionTabs.svelte';
  import Issuer1 from './Issuer1.svelte';

  export let profile: Profile;

  $: owner = profile.username;

  $: items = [
    {
      id: 'Releases',
      title: 'Collectibles for Sale',
      tooltip: `These Collectibles were created by @${owner} and are available for sale`,
    },
    {
      id: 'NFTs',
      title: `@${owner}'s Collectibles`,
      tooltip: `These Collectibles are owned by @${owner}`,
    },
  ];
</script>

<div class="container mt-4 md:mt-8">
  <Issuer1 {profile}>
    <CollectionTabs isIssuer {items} />
  </Issuer1>
</div>
