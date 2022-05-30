<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import CollectionTabs from '$lib/features/collection/CollectionTabs.svelte';
  import { featuredSku } from '$lib/features/collection/collection.store';
  import Emilia from './emilia/Emilia.svelte';

  export let profile: Profile;

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
</script>

<Emilia {profile} featuredSku={$featuredSku}>
  <CollectionTabs isIssuer {items} />
</Emilia>
