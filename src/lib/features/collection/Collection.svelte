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
    <div class="container mt-4 md:mt-8">
      {#if isIssuer && profile.username === 'Roberto_Clemente'}
        <Clemente {profile}>
          <CollectionTabs {isIssuer} />
        </Clemente>
      {:else if isIssuer}
        <CollectionIssuer {profile} />
        <CollectionTabs {isIssuer} />
      {:else}
        <CollectionUser {profile} {own} />
        <CollectionTabs {isIssuer} {own} />
      {/if}
    </div>
  </div>
</ThemeContext>
