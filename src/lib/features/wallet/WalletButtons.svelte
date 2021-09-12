<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiArrowRight } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { toast } from '$ui/toast';

  const dispatch = createEventDispatcher();

  export let canWithdraw: boolean;

  function handleWithdraw() {
    if (canWithdraw) {
      dispatch('withdraw');
    } else {
      toast.danger('Whoops! You cannot withdraw funds at this time!');
    }
  }
</script>

<div class="flex flex-col divide-y divide-black">
  <button
    type="button"
    class="flex items-center justify-between py-4 px-10 w-full font-medium text-2xl text-black hover:bg-primary hover:text-white"
    on:click={() => dispatch('deposit')}
  >
    <span>Deposit</span>
    <Icon path={mdiArrowRight} size="2" rotate={-45} />
  </button>
  <button
    type="button"
    class="flex items-center justify-between py-4 px-10 w-full font-medium text-2xl text-black hover:bg-primary hover:text-white"
    on:click={() => handleWithdraw()}
  >
    <span>Withdraw</span>
    <Icon path={mdiArrowRight} size="2" rotate={45} />
  </button>
</div>

<style>
  button {
    background-color: var(--sku-cta-bg, #ffffff);
  }
</style>
