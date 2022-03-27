<script lang="ts">
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import { isAuthenticated, isIssuer, onSignIn, user } from '$lib/user';
  import SkuForm from '$lib/features/sku/SkuForm.svelte';
  import { Seo } from '$lib/seo';
  import { tenantSettings } from '$lib/tenant/settings.store';

  $: skuCreationEnabled = $tenantSettings?.skuCreationEnabled;
  $: show = $user && (skuCreationEnabled || isIssuer($user));
  $: redirect = $user && skuCreationEnabled === false && !isIssuer($user);

  $: {
    if (browser) {
      if ($isAuthenticated === false) {
        onSignIn();
      } else if (redirect) {
        goto(routes.marketplace);
      }
    }
  }
</script>

<Seo title="Create new item" />

{#if show}
  <SkuForm />
{/if}
