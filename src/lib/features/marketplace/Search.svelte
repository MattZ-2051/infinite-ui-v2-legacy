<script lang="ts">
  import Search from '$lib/components/Search.svelte';
  import { page } from '$app/stores';
  import { setFilters } from './marketplace.service';

  function onInput(value: string) {
    setFilters({ params: { search: value } });
  }
</script>

<div class="w-full">
  <Search {onInput} value={$page.query.get('search') || ''} />
</div>
