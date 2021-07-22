<script lang="ts">
  import { mdiMagnify } from '@mdi/js';
  import { page } from '$app/stores';
  import Icon from '$ui/icon/Icon.svelte';
  import { setFilters } from './marketplace.service';

  const handleInput = (event) => setFilters({ params: { search: event.target.value } });
  let widthClass = 'max-w-xs';
</script>

<div style="min-width: 10rem;" class="relative transition-width duration-200 w-full {widthClass}">
  <input
    type="text"
    on:input={handleInput}
    on:focus={() => (widthClass = 'max-w-3xl')}
    on:blur={() => (widthClass = 'max-w-xs')}
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
