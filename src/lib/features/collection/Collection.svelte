<script lang="ts">
  import { user } from '$lib/user';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import { tenantSettings } from '$lib/tenant/settings.store';
  import CollectionIndex from '$project/collection/CollectionIndex.svelte';
  import CollectionUser from '$project/collection/CollectionUser.svelte';
  import CollectionIssuerDefault from './CollectionIssuer.svelte';
  import CollectionTabs from './CollectionTabs.svelte';
  import { profile } from './collection.store';

  $: isIssuer = $profile.role === 'issuer';
  $: skuCreationEnabled = $tenantSettings.skuCreationEnabled;
  $: own = $user?._id === $profile._id;
</script>

<ThemeContext id="collection">
  <div class="flex flex-col flex-grow">
    {#if isIssuer && 'templateId' in $profile}
      <CollectionIndex profile={$profile} />
    {:else}
      <div class="container mt-4 md:mt-8">
        {#if isIssuer}
          <CollectionIssuerDefault profile={$profile} />
        {:else}
          <CollectionUser profile={$profile} {own} />
        {/if}
        <CollectionTabs isIssuer={isIssuer || skuCreationEnabled} {own} />
      </div>
    {/if}
  </div>
</ThemeContext>
