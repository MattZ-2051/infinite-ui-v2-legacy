<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import CollectionTabs from '$lib/features/collection/CollectionTabs.svelte';
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
</script>

<Emilia>
  <CollectionTabs isIssuer {items} />
</Emilia>
