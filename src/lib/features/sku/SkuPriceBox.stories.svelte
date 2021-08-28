<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import SkuPriceBox from './SkuPriceBox.svelte';

  const activeSkuListings = [
    {
      auctionBidIncrement: 1,
      auctionProcess: 'unset',
      canceled: false,
      product: '1',
      endDate: new Date(),
      issuer: '6048e601782c593a7c6dffc0',
      minBid: 45,
      price: 20,
      saleType: 'fixed',
      sku: '611d85e7e053d40fdc5da1fe',
      startDate: new Date(),
      status: 'active',
      supply: 8,
      supplyLeft: 7,
      type: 'sku',
      _id: '611e4825e053d40fdc5da61d',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  const activeSku = {
    activeSkuListings: activeSkuListings,
    upcomingSkuListings: [],
    totalSkuListingSupplyLeft: 3,
  };
</script>

<Meta title="Lib / features / sku / SkuPriceBox" component={SkuPriceBox} />

<Template let:args>
  <div class="max-w-md">
    <SkuPriceBox {...args} />
  </div>
</Template>

<Story name="From Creator - Active" args={{ sku: activeSku, totalCollectors: 0, collectors: [] }} />
