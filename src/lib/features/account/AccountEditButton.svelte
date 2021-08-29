<script lang="ts">
  import { mdiPencil } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
</script>

<button type="button" class="rounded-full w-6 h-6  text-black bg-white flex items-center justify-center" on:click>
  <Icon path={mdiPencil} size="18px" />
</button>
