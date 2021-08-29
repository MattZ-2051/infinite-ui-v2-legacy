<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { user } from '$lib/user';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import CollectionIssuer from './CollectionIssuer.svelte';
  import CollectionUser from './CollectionUser.svelte';
  import Clemente from './clemente/Clemente.svelte';
  import CollectionTabs from './CollectionTabs.svelte';

  export let profile: Profile;

  $: isIssuer = profile.role === 'issuer';
  $: own = $user?._id === profile._id;
</script>

<ThemeContext id="collection">
  <div class="flex flex-col flex-grow">
    <div class="container">
      {#if profile.username === 'Roberto_Clemente'}
        <Clemente>
          <CollectionTabs {isIssuer} />
        </Clemente>
      {:else if isIssuer}
        <CollectionIssuer {profile} />
        <CollectionTabs {isIssuer} />
      {:else}
        <div class="mt-4 mb-12">
          <CollectionUser {profile} {own} />
        </div>
        <CollectionTabs {isIssuer} />
      {/if}
    </div>
  </div>
</ThemeContext>
