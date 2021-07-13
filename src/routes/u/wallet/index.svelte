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
  import type { Transaction, Bid } from '$lib/sku-item/types';
  import { loadBids, loadTransactions } from '$lib/features/wallet/wallet.api';
  import Wallet from '$lib/features/wallet/Wallet.svelte';
  import { userId } from '$lib/user';

  export let page: number;
  export let tab: 'transactions' | 'bids';
  export let sortBy: 'createdAt:asc' | 'createdAt:desc';
  let transactions: Transaction[];
  let bids: Bid[];
  let total: number;
  let totalTransactions: number;
  let totalBids: number;

  async function _load(t: 'transactions' | 'bids', p: number, _sortBy) {
    if (t === 'transactions') {
      totalBids = -1; //to avoid flickering when switching tabs
      ({ transactions, total } = await loadTransactions(p, _sortBy));
      totalTransactions = total;
    } else if (t === 'bids') {
      totalTransactions = -1; //to avoid flickering when switching tabs
      ({ bids, total } = await loadBids(p, _sortBy));
      totalBids = total;
    }
  }

  $: $userId && _load(tab, page, sortBy);
</script>

<Wallet {transactions} {totalTransactions} {bids} {totalBids} {tab} />
