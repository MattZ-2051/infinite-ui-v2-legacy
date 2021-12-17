<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiShieldOutline, mdiShieldCheckOutline, mdiShieldOffOutline } from '@mdi/js';
  import shieldPlus from '$lib/features/wallet/assets/shield-plus';
  import arrowRight from '$lib/features/wallet/assets/arrow-right';
  import Icon from '$ui/icon/Icon.svelte';
  import Button from '$lib/components/Button.svelte';

  export let pending: boolean;
  export let level: number;

  const dispatch = createEventDispatcher();

  const LEVEL_ICONS = [mdiShieldOffOutline, mdiShieldCheckOutline, shieldPlus];

  function getStatus(lvl: number, isPending: boolean) {
    let label: string;
    if (lvl === 0) {
      label = isPending ? 'Pending...' : 'Unverified';
    } else {
      label = `Level ${lvl}`;
    }

    return {
      icon: lvl === 0 && isPending ? mdiShieldOutline : LEVEL_ICONS[lvl],
      label,
    };
  }
  $: status = getStatus(level, pending);

  const statusColor = level > 0 ? 'var(--default-color)' : 'var(--gray-500)';
</script>

<div class="flex items-center justify-between" {...$$restProps}>
  <div class="flex items-center gap-2">
    <Icon path={status.icon} color={statusColor} />
    <span style="color: {statusColor}">
      {status.label}
    </span>
    {#if pending && level > 0}
      <span class="tracking-widest">•••</span>
      <span class="text-gray-400">Level {level + 1}</span>
    {/if}
  </div>
  {#if !pending && level < 2}
    <Button variant="brand" style="--button-padding:0.3em" on:click={() => dispatch('upgrade')}>
      <Icon path={arrowRight} size="20px" />
      <span class="sr-only">Verify account</span>
    </Button>
  {/if}
</div>
