<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import arrowRight from '$lib/features/wallet/assets/arrow-right';
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

<div class="flex flex-col divide-y divide-black border-t md-border-t-0 md:border-r border-black">
  <button
    type="button"
    class="sticky-cta group flex items-center justify-between py-4 px-10 w-full font-medium text-2xl"
    on:click={() => dispatch('deposit')}
  >
    <span>Deposit</span>
    <Icon
      class="transform transition-transform duration-150 -rotate-45 group-hover:-rotate-90"
      path={arrowRight}
      size="2"
    />
  </button>
  <button
    type="button"
    class="sticky-cta group flex items-center justify-between py-4 px-10 w-full font-medium text-2xl"
    on:click={() => handleWithdraw()}
  >
    <span>Withdraw</span>
    <Icon
      class="transform transition-transform duration-150 rotate-45 group-hover:rotate-90"
      path={arrowRight}
      size="2"
    />
  </button>
</div>
