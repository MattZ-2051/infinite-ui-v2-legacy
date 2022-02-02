<script lang="ts">
  import { mdiPencil } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';

  export let size = '18px';
</script>

<Icon path={mdiPencil} {size} />
