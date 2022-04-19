<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import { tenantSettings } from '$lib/tenant/settings.store';
  import CollectionIndex from '$project/collection/CollectionIndex.svelte';
  import CollectionUser from '$project/collection/CollectionUser.svelte';
  import CollectionIssuerDefault from './CollectionIssuer.svelte';
  import CollectionTabs from './CollectionTabs.svelte';

  export let profile: Profile;
  export let own: boolean;

  $: isIssuer = profile.role === 'issuer';
  $: skuCreationEnabled = $tenantSettings.skuCreationEnabled;
</script>

<ThemeContext id="collection">
  <div class="flex flex-col flex-grow">
    {#if isIssuer && 'templateId' in profile}
      <CollectionIndex {profile} />
    {:else}
      <div class="container mt-4 md:mt-8">
        {#if isIssuer}
          <CollectionIssuerDefault {profile} />
        {:else}
          <CollectionUser {profile} {own} />
        {/if}
        <CollectionTabs isIssuer={isIssuer || skuCreationEnabled} {own} />
      </div>
    {/if}
  </div>
</ThemeContext>
