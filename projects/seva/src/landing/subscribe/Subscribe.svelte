<script>
  import { user } from '$lib/user';
  import Subscribe from '../../commonComponents/Subscribe.svelte';
</script>

{#if !$user}
  <div class="container flex justify-center px-6">
    <Subscribe />
  </div>
{/if}
