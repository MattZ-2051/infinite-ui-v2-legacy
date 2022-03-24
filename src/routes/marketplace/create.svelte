<script lang="ts">
  import CreateSkuForm from '$lib/features/marketplace/CreateSkuForm.svelte';
  import { user } from '$lib/user';
</script>

{#if $user}
  <CreateSkuForm />
{/if}
