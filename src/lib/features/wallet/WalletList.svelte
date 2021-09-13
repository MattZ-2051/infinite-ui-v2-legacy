<script lang="ts">
  import { Tabs, Tab } from '$ui/tabs';
  import { gotoQueryParameters } from '$util/queryParameter';
  import Sort from '$lib/components/Sort.svelte';
  import TransactionList from './transaction/TransactionList.svelte';
  import BidList from './bid/BidList.svelte';

  export let tab: 'transactions' | 'bids';

  const sortOptions = [
    {
      id: 1,
      name: 'Newest',
      order: 'desc',
      value: 'createdAt',
    },
    {
      id: 2,
      name: 'Oldest',
      order: 'asc',
      value: 'createdAt',
    },
  ];

  const transactionTypes = [
    {
      id: 1,
      name: 'All types',
      order: '',
      value: '',
    },
    {
      id: 2,
      name: 'Deposit',
      order: '',
      value: 'deposit',
    },
    {
      id: 3,
      name: 'Withdrawal',
      order: '',
      value: 'withdrawal',
    },

    {
      id: 4,
      name: 'Purchase',
      order: '',
      value: 'purchase',
    },
    {
      id: 5,
      name: 'Sale',
      order: '',
      value: 'sale',
    },
    {
      id: 6,
      name: 'Royalty fee',
      order: '',
      value: 'royalty_fee',
    },
    {
      id: 7,
      name: 'Claim',
      order: '',
      value: 'claim',
    },
    {
      id: 8,
      name: 'NFT redeem',
      order: '',
      value: 'nft_redeem',
    },
  ];

  function redirect(parameters) {
    gotoQueryParameters(
      {
        params: parameters,
      },
      { keepfocus: true }
    );
  }

  function changeTab({ detail }: CustomEvent<'transactions' | 'bids'>) {
    redirect({ tab: detail, page: false });
  }

  const sort = (event: CustomEvent) => {
    redirect({ sortBy: `${event.detail.value}:${event.detail.order}` });
  };

  const type = (event: CustomEvent) => {
    redirect({ type: `${event.detail.value}`, page: false });
  };
</script>

<Tabs
  class="items-end"
  items={[
    { id: 'transactions', title: 'Transaction History' },
    { id: 'bids', title: 'Active Bids' },
  ]}
  menuBreakpoint="lg"
  defaultSelectedId={tab}
  itemClass="text-xl lg:text-2xl items-center"
  on:select={changeTab}
  --tab-border-color="transparent"
  --tab-border-color-active="transparent"
>
  <Tab id="transactions"><TransactionList /></Tab>
  <Tab id="bids"><BidList /></Tab>
  <div slot="extra" class="mb-5">
    <div class="flex gap-6 ">
      {#if tab === 'transactions'}
        <Sort
          on:select={type}
          sortOptions={transactionTypes}
          label="Transaction type:"
          selected={transactionTypes[0]}
        />
      {/if}
      <Sort on:select={sort} {sortOptions} selected={sortOptions[0]} />
    </div>
  </div>
</Tabs>
