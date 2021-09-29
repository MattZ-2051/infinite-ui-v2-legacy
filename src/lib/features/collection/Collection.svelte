<script lang="ts">
  import { user } from '$lib/user';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import CollectionIndex from '$project/collection/CollectionIndex.svelte';
  import CollectionIssuerDefault from './CollectionIssuer.svelte';
  import CollectionUser from './CollectionUser.svelte';
  import CollectionTabs from './CollectionTabs.svelte';
  import { profile } from './collection.store';

  $: isIssuer = $profile.role === 'issuer';
  $: own = $user?._id === $profile._id;
</script>

<ThemeContext id="collection">
  <div class="flex flex-col flex-grow">
    {#if isIssuer}
      <CollectionIndex profile={$profile} />
    {:else if isIssuer}
      <div class="container mt-4 md:mt-8">
        <CollectionIssuerDefault profile={$profile} />
        <CollectionTabs isIssuer />
      </div>
    {:else}
      <div class="container mt-4 md:mt-8">
        <CollectionUser profile={$profile} {own} />
        <CollectionTabs />
      </div>
    {/if}
  </div>
</ThemeContext>
