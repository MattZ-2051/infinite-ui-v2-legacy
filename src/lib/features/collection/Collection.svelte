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
    <div class="container mt-4 md:mt-8">
      {#if isIssuer && $profile.templateId}
        <CollectionIndex profile={$profile} />
      {:else if isIssuer}
        <CollectionIssuerDefault profile={$profile} />
        <CollectionTabs isIssuer />
      {:else}
        <CollectionUser profile={$profile} {own} />
        <CollectionTabs />
      {/if}
    </div>
  </div>
</ThemeContext>
