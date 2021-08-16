<script lang="ts">
  import Search from '$lib/components/Search.svelte';
  import { page } from '$app/stores';
  import { setFilters } from './marketplace.service';

  let isFocused = false;

  function onInput(value: string) {
    setFilters({ params: { search: value } });
  }
</script>

<div style="min-width: 10rem;" class="w-full {isFocused ? 'transition-width duration-500 max-w-3xl' : 'max-w-xs'}">
  <Search
    {onInput}
    value={$page.query.get('search') || ''}
    on:focus={() => (isFocused = true)}
    on:blur={() => (isFocused = false)}
  />
</div>
