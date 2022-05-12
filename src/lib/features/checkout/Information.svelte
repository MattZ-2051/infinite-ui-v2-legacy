<script lang="ts">
  import { formatCurrency } from '$util/format';

  export let conversionRate: number = undefined;
</script>

<p class="text-xs text-gray-500 font-normal pb-4">
  All resales of this product are subject to a 5% royalty fee set by and to be paid to the original creator.
</p>
{#if conversionRate}
  <p title="conversion-tag" class="text-xs text-gray-500 font-normal pb-4">
    Conversion rate: {formatCurrency(conversionRate)} = ETH 1
  </p>
{/if}
