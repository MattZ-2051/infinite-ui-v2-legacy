<script lang="ts">
  import Search from '$lib/components/Search.svelte';
  import { page } from '$app/stores';
  import { setFilters } from './marketplace.service';

  let widthClass = 'max-w-xs';

  function onInput(value: string) {
    setFilters({ params: { search: value } });
  }
</script>

<div style="min-width: 10rem;" class="transition-width duration-200 w-full {widthClass}">
  <Search
    {onInput}
    value={$page.query.get('search') || ''}
    on:focus={() => (widthClass = 'max-w-3xl')}
    on:blur={() => (widthClass = 'max-w-xs')}
  />
</div>
