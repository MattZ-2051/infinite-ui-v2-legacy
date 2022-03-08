<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ url }) => {
    return {
      props: {
        page: url.searchParams.get(`page`) || 1,
        tab: url.searchParams.get(`tab`) || 'transactions',
        sortBy: url.searchParams.get('sortBy') || 'createdAt:desc',
        type: url.searchParams.get('type') || '',
      },
    };
  };
</script>

<script lang="ts">
  import type { TransactionType } from '$lib/sku-item/types';
  import { loadMyBidsFx, loadMyTransactionsFx } from '$lib/features/wallet/wallet.store';
  import Wallet from '$lib/features/wallet/Wallet.svelte';
  import { userId } from '$lib/user';

  export let page: number;
  export let tab: 'transactions' | 'bids';
  export let sortBy: 'createdAt:asc' | 'createdAt:desc';
  export let type: TransactionType;

  async function _load(t: 'transactions' | 'bids', p: number, _sortBy, _type: TransactionType) {
    if (t === 'transactions') {
      await loadMyTransactionsFx({ page: p, sortBy: _sortBy, type: _type });
    } else if (t === 'bids') {
      await loadMyBidsFx({ page: p, sortBy: _sortBy });
    }
  }

  $: $userId && _load(tab, page, sortBy, type);
</script>

<Wallet {tab} />
