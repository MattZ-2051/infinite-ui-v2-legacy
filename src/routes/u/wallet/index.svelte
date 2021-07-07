<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';

  export async function load({ page }: LoadInput) {
    return {
      props: {
        page: page.query.get(`page`) || 1,
        tab: page.query.get(`tab`) || 'transactions',
      },
    };
  }
</script>

<script lang="ts">
  import type { Transaction, Bid } from '$lib/sku-item/types';
  import { loadBids, loadTransactions } from '$lib/features/wallet/wallet.api';
  import Wallet from '$lib/features/wallet/Wallet.svelte';
  import { user } from '$lib/user';

  export let page: number;
  export let tab: 'transactions' | 'bids';
  let transactions: Transaction[];
  let bids: Bid[];
  let total: number;
  let totalTransactions: number;
  let totalBids: number;

  async function _load(t: 'transactions' | 'bids', p: number) {
    if (t === 'transactions') {
      totalBids = -1; //to avoid flickering when switching tabs
      ({ transactions, total } = await loadTransactions(p));
      totalTransactions = total;
    } else if (t === 'bids') {
      totalTransactions = -1; //to avoid flickering when switching tabs
      ({ bids, total } = await loadBids(p));
      totalBids = total;
    }
  }

  $: $user && _load(tab, page);
</script>

<Wallet {transactions} {totalTransactions} {bids} {totalBids} {tab} />
