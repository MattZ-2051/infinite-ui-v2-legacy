<script lang="ts">
  import Icon from '$ui/icon/Icon.svelte';
  import { mdiMagnify } from '@mdi/js';
</script>

<div class="relative w-40">
  <input placeholder="Search" class="px-10 bg-gray-100 py-2 rounded-2xl outline-none w-full" />
  <Icon path={mdiMagnify} size="1.2" color="gray" class="absolute top-2 left-2" />
</div>

<style>
  input::placeholder {
    @apply text-gray-400;
    @apply font-black;
    @apply italic;
  }
</style>
