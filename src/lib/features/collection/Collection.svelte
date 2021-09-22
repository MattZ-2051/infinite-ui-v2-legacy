<script lang="ts">
  import { user } from '$lib/user';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import CollectionIssuer from './CollectionIssuer.svelte';
  import CollectionUser from './CollectionUser.svelte';
  import Issuer1 from './issuer/Issuer1.svelte';
  import CollectionTabs from './CollectionTabs.svelte';
  import { profile } from './collection.store';

  $: isIssuer = $profile.role === 'issuer';
  $: own = $user?._id === $profile._id;
  $: owner = $profile.username;
</script>

<ThemeContext id="collection">
  <div class="flex flex-col flex-grow">
    <div class="container mt-4 md:mt-8">
      {#if isIssuer && $profile.templateId === 'issuer1'}
        <Issuer1 profile={$profile}>
          <CollectionTabs {isIssuer} {owner} />
        </Issuer1>
      {:else if isIssuer}
        <CollectionIssuer profile={$profile} />
        <CollectionTabs {isIssuer} {owner} />
      {:else}
        <CollectionUser profile={$profile} {own} />
        <CollectionTabs {isIssuer} {own} {owner} />
      {/if}
    </div>
  </div>
</ThemeContext>
