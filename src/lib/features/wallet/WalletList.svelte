<script lang="ts">
  import { Tabs, Tab } from '$ui/tabs';
  import { gotoQueryParameters } from '$util/queryParameter';
  import { user } from '$lib/user';
  import Sort from '$lib/components/Sort.svelte';
  import TransactionList from './transaction/TransactionList.svelte';
  import BidList from './bid/BidList.svelte';

  export let tab: 'transactions' | 'bids';

  const sortOptions = [
    { name: 'Newest', value: 'createdAt:desc' },
    { name: 'Oldest', value: 'createdAt:asc' },
  ];

  let transactionTypes = [
    { name: 'All types', value: '' },
    { name: 'Deposit', value: 'deposit' },
    { name: 'Withdrawal', value: 'withdrawal' },
    { name: 'Purchase', value: 'purchase' },
    { name: 'Sale', value: 'sale' },
    { name: 'Claim', value: 'claim' },
    { name: 'NFT redeem', value: 'nft_redeem' },
  ];

  if ($user.role !== 'user') transactionTypes.push({ name: 'Royalty fee', value: 'royalty_fee' });

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

  const onFilter = (event: CustomEvent) => {
    redirect({ [event.detail.key]: `${event.detail.value}`, page: false });
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
        <Sort on:select={onFilter} sortOptions={transactionTypes} key="type" label="Transaction type:" />
      {/if}
      <Sort on:select={onFilter} {sortOptions} />
    </div>
  </div>
</Tabs>
