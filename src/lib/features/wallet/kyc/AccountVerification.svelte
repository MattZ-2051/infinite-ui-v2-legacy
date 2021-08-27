<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiShieldSync, mdiShieldHalfFull, mdiArrowRight, mdiShieldCheck, mdiShieldAlert } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import Button from '$lib/components/Button.svelte';

  export let pending: boolean;
  export let level: number;

  const dispatch = createEventDispatcher();

  let hasCta: boolean;
  $: hasCta = !pending && level < 2;
</script>

<div class="flex items-center justify-between font-semibold" {...$$restProps}>
  <div class="flex items-center gap-2">
    {#if pending}
      {#if level === 0}
        <Icon path={mdiShieldSync} />
        <span>Pending...</span>
      {:else if level === 1}
        <Icon path={mdiShieldHalfFull} />
        <span>Level {level}</span>
        <Icon path={mdiArrowRight} />
        <div class="flex gap-1 text-gray-400">
          <Icon path={mdiShieldSync} />
          <span>Pending...</span>
        </div>
      {/if}
    {:else if level >= 1}
      {#if level === 1}
        <Icon path={mdiShieldHalfFull} />
      {:else}
        <Icon path={mdiShieldCheck} />
      {/if}
      <span>Level {level}</span>
    {:else}
      <Icon path={mdiShieldAlert} />
      <span>Unverified</span>
    {/if}
  </div>
  {#if hasCta}
    <div class="w-28 button-container ml-2">
      <Button on:click={() => dispatch('upgrade')}>{level === 0 ? 'Verify' : 'Upgrade'}</Button>
    </div>
  {/if}
</div>

<style lang="postcss">
  .button-container {
    --button-padding: 0.5rem;
    --button-text-size: 1rem;
    --button-line-height: 1.5rem;
  }
</style>
