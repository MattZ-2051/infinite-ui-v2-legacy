<script lang="ts">
  import { Tabs, Tab } from '$ui/tabs';
  import { gotoQueryParameters } from '$util/queryParameter';
  import Sort from '$lib/components/Sort.svelte';
  import TransactionList from './transaction/TransactionList.svelte';
  import BidList from './BidList.svelte';

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

  function redirect({ detail }: CustomEvent<'transactions' | 'bids'>) {
    gotoQueryParameters(
      {
        params: { tab: detail, page: false },
      },
      { keepfocus: true }
    );
  }

  const sort = (event: CustomEvent) => {
    gotoQueryParameters({
      params: { sortBy: `${event.detail.value}:${event.detail.order}` },
    });
  };
</script>

<Tabs
  items={[
    { id: 'transactions', title: 'Transaction History' },
    { id: 'bids', title: 'Active Bids' },
  ]}
  menuBreakpoint="sm"
  defaultSelectedId={tab}
  on:select={redirect}
>
  <Tab id="transactions"><TransactionList /></Tab>
  <Tab id="bids"><BidList /></Tab>
  <div slot="extra" class="justify-self-end self-center text-lg">
    <Sort on:select={sort} {sortOptions} />
  </div>
</Tabs>
