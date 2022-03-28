<script lang="ts">
  import SkuForm from '$lib/features/sku/SkuForm.svelte';
  import { Seo } from '$lib/seo';
  import { user } from '$lib/user';
</script>

<Seo title="Create new item" />

{#if $user}
  <SkuForm />
{/if}
