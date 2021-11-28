<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import arrowRight from '$lib/features/wallet/assets/arrow-right';
  import Icon from '$ui/icon/Icon.svelte';

  const dispatch = createEventDispatcher();
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
    on:click={() => dispatch('withdraw')}
  >
    <span>Withdraw</span>
    <Icon
      class="transform transition-transform duration-150 rotate-45 group-hover:rotate-90"
      path={arrowRight}
      size="2"
    />
  </button>
</div>
