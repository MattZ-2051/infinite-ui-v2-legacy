<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';

  export async function load({ page }: LoadInput) {
    return {
      props: {
        page: page.query.get(`page`) || 1,
        tab: page.query.get(`tab`) || 'transactions',
        sortBy: page.query.get('sortBy') || 'createdAt:desc',
      },
    };
  }
</script>

<script lang="ts">
  import { loadMyBidsFx, loadMyTransactionsFx } from '$lib/features/wallet/wallet.store';
  import Wallet from '$lib/features/wallet/Wallet.svelte';
  import { userId } from '$lib/user';

  export let page: number;
  export let tab: 'transactions' | 'bids';
  export let sortBy: 'createdAt:asc' | 'createdAt:desc';

  async function _load(t: 'transactions' | 'bids', p: number, _sortBy) {
    if (t === 'transactions') {
      await loadMyTransactionsFx({ page: p, sortBy: _sortBy });
    } else if (t === 'bids') {
      await loadMyBidsFx({ page: p, sortBy: _sortBy });
    }
  }

  $: $userId && _load(tab, page, sortBy);
</script>

<Wallet {tab} />
