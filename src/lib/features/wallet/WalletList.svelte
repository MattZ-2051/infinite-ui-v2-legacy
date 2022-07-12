<script lang="ts">
  import { Tabs, Tab } from '$ui/tabs';
  import { gotoQueryParameters } from '$util/queryParameter';
  import { user } from '$lib/user';
  import Sort from '$lib/components/Sort.svelte';
  import { transactionTypes } from './wallet.service';
  import TransactionList from './transaction/TransactionList.svelte';
  import BidList from './bid/BidList.svelte';

  export let tab: 'transactions' | 'bids';

  const sortOptions = [
    { name: 'Newest', value: 'createdAt:desc' },
    { name: 'Oldest', value: 'createdAt:asc' },
  ];

  function getTransactionTypes() {
    let types = Object.values(transactionTypes);
    return $user && $user.role !== 'user' ? types : types.filter((type) => type.value !== 'royalty_fee');
  }

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

  const items = [
    { id: 'transactions', title: 'Transaction History' },
    { id: 'bids', title: 'Active Bids' },
  ];
</script>

<Tabs
  class="items-end "
  {items}
  menuBreakpoint="lg"
  defaultSelectedId={tab}
  itemClass="text-xl lg:text-2xl items-center"
  on:select={changeTab}
>
  <Tab id="transactions"><TransactionList /></Tab>
  <Tab id="bids"><BidList /></Tab>
  <div slot="extra" class="mb-5">
    <div class="flex lg:gap-3 gap-2">
      {#if tab === 'transactions'}
        <Sort
          on:select={onFilter}
          sortOptions={getTransactionTypes()}
          key="type"
          label="Transaction type:"
          iconType="filter"
        />
      {/if}
      <Sort on:select={onFilter} {sortOptions} />
    </div>
  </div>
</Tabs>
