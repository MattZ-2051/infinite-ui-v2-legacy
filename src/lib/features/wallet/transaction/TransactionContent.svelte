<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';

  export let transaction: Transaction;
</script>

<div class="py-2">Transaction ID: {transaction._id}</div>
