<script lang="ts">
  import type { TooltipInput } from '$ui/tooltip';
  import { mdiInformationOutline } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';

  export let tooltip: TooltipInput;
</script>

<Icon path={mdiInformationOutline} {tooltip} size="0.8" class="inline-block cursor-pointer" />
