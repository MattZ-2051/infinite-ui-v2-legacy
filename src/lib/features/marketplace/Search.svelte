<script lang="ts">
  import debounce from 'just-debounce';
  import { mdiMagnify } from '@mdi/js';
  import { page } from '$app/stores';
  import Icon from '$ui/icon/Icon.svelte';
  import { setFilters } from './marketplace.service';

  const handleInput = debounce((event) => setFilters({ params: { search: event.target.value } }), 300);
</script>

<div class="relative w-48">
  <input
    type="text"
    on:input={handleInput}
    value={$page.query.get('search') || ''}
    placeholder="Search"
    class="px-10 bg-gray-100 py-2 rounded-2xl outline-none w-full"
  />
  <Icon path={mdiMagnify} size="1.2" color="gray" class="absolute top-2 left-2" />
</div>

<style>
  input::placeholder {
    @apply text-gray-400;
    @apply font-black;
    @apply italic;
  }
</style>
