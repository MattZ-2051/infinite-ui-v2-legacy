<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import CollectionTabs from '$lib/features/collection/CollectionTabs.svelte';
  import { skus } from '$lib/features/collection/collection.store';
  import Emilia from './emilia/Emilia.svelte';

  export const profile: Profile = undefined;

  $: items = [
    {
      id: 'Releases',
      title: 'The Collection',
    },
    // {
    //   id: 'NFTs',
    //   title: 'Owned Collection',
    // },
  ];

  console.log($skus);
</script>

<Emilia skus={$skus}>
  <CollectionTabs isIssuer {items} />
</Emilia>
