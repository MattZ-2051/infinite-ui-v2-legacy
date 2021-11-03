<script lang="ts">
  import { mdiLinkVariant } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';

  export let explorerLink: string;
</script>

<a class="flex gap-1 items-center text-sm self-end text-gray-500" href={explorerLink} target="_blank" rel="noreferrer">
  View wallet in explorer
  <Icon path={mdiLinkVariant} />
</a>
