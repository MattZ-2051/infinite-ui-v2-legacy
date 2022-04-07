<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import SkuPriceBox from './SkuPriceBox.svelte';

  const dummyDate = Date.now() + 12 ** 5;

  const uniqueCollector = [
    {
      listing: {
        saleType: 'auction',
        status: 'sold',
        product: '1',
      },
      owner: {
        username: 'matt',
      },
      serialNumber: 2,
    },
  ];

  const activeFixedSkuListings = [{ saleType: 'fixed', canceled: false, totalSupplyLeft: 11, price: 22 }];

  const upcomingFixedSkuListings = [{ saleType: 'fixed', canceled: false, totalUpcomingSupply: 11, price: 22 }];

  const upcomingAuctionSkuListings = [
    { saleType: 'auction', minBid: 24, status: 'active', startDate: dummyDate, sku: { currency: 'USD' } },
  ];

  const upcomingNftGiveaway = [{ saleType: 'giveaway', canceled: false, startDate: dummyDate }];

  const activeNftGiveaway = [{ saleType: 'giveaway', canceled: false, startDate: dummyDate }];

  const activeFixedProductListings = [
    { saleType: 'fixed', price: 20, status: 'active', startDate: dummyDate, sku: { currency: 'USD' } },
    { saleType: 'fixed', price: 11, status: 'active', startDate: dummyDate, sku: { currency: 'USD' } },
    { saleType: 'auction', minBid: 24, status: 'active', startDate: dummyDate, sku: { currency: 'USD' } },
  ];

  const activeAuctionProductListings = [
    { saleType: 'fixed', price: 30, status: 'active', startDate: dummyDate, sku: { currency: 'USD' } },
    { saleType: 'auction', minBid: 30, status: 'active', startDate: dummyDate, sku: { currency: 'USD' } },
    {
      saleType: 'auction',
      minHighestBid: 40,
      minBid: 20,
      status: 'active',
      startDate: dummyDate,
      sku: { currency: 'USD' },
    },
  ];

  const upcomingProductListings = [
    { saleType: 'auction', minBid: 30, status: 'upcoming', startDate: dummyDate },
    { saleType: 'auction', minHighestBid: 40, minBid: 20, status: 'upcoming', startDate: dummyDate },
  ];

  const activeFixedSku = {
    currency: 'USD',
    upcomingProductListings: [],
    activeProductListings: activeFixedProductListings,
    upcomingSkuListings: [],
    activeSkuListings: activeFixedSkuListings,
    totalSupplyLeft: 11,
  };

  const upcomingFixedSku = {
    currency: 'USD',
    upcomingProductListings: [],
    activeProductListings: activeAuctionProductListings,
    upcomingSkuListings: upcomingFixedSkuListings,
    activeSkuListings: [],
    totalUpcomingSupply: 20,
    minStartDate: dummyDate,
  };

  const upcomingAuctionSku = {
    currency: 'USD',
    upcomingProductListings: [],
    activeProductListings: activeAuctionProductListings,
    upcomingSkuListings: upcomingAuctionSkuListings,
    activeSkuListings: [],
    totalUpcomingSupply: 20,
    minStartDate: dummyDate,
  };

  const upcomingGiveaway = {
    currency: 'USD',
    upcomingProductListings: upcomingProductListings,
    activeProductListings: [],
    upcomingSkuListings: upcomingNftGiveaway,
    activeSkuListings: [],
    minStartDate: dummyDate,
    maxSupply: 21,
    supplyType: 'variable',
  };

  const activeGiveAway = {
    upcomingProductListings: [],
    activeProductListings: [],
    upcomingSkuListings: [],
    activeSkuListings: activeNftGiveaway,
    minStartDate: dummyDate,
    maxSupply: 21,
    totalSkuListingSupplyLeft: 18,
  };

  const noSaleSku = {
    upcomingProductListings: [],
    activeProductListings: [],
    upcomingSkuListings: [],
    activeSkuListings: [],
    minStartDate: dummyDate,
    totalSupplyLeft: 0,
  };

  const uniqueSku = {
    activeSkuListings: [],
    upcomingSkuListings: [],
    upcomingProductListings: [],
    activeProductListings: [],
    totalSupply: 1,
  };

  const pendingSku = {
    activeSkuListings: [],
    upcomingSkuListings: [],
    upcomingProductListings: [],
    activeProductListings: [],
    status: 'pending',
  };

  const rejectedSku = {
    activeSkuListings: [],
    upcomingSkuListings: [],
    upcomingProductListings: [],
    activeProductListings: [],
    status: 'rejected',
    rejectReason: 'Your NFT has been rejected.',
  };
</script>

<Meta title="Lib / features / sku / SkuPriceBox" component={SkuPriceBox} />

<Template let:args>
  <div class="max-w-md">
    <SkuPriceBox userId="" {...args} />
  </div>
</Template>

<!-- Active Sku Listings with Active Sale from Collector -->
<Story name="From Creator - Active, From Collectors - Active sale" args={{ sku: activeFixedSku, totalCollectors: 4 }} />

<!-- Upcoming Auction Sku Listings with Active Auction from Collector -->
<Story
  name="From Creator - Upcoming Auction, From Collectors - Auction"
  args={{ sku: upcomingAuctionSku, totalCollectors: 3 }}
/>

<!-- Upcoming Fixed Sku Listings with Active Auction from Collector -->
<Story
  name="From Creator - Upcoming Fixed, From Collectors - Auction"
  args={{ sku: upcomingFixedSku, totalCollectors: 3 }}
/>

<!-- Upcoming NFT Giveaway with Upcoming Auction from Collector -->
<Story
  name="From Creator - Upcoming giveaway, From Collectors - Upcoming"
  args={{ sku: upcomingGiveaway, totalCollectors: 2 }}
/>

<!-- Active NFT Giveaway with No Sale From collector -->
<Story
  name="From Creator - Active Giveaway, From Collectors - No Sale"
  args={{ sku: activeGiveAway, totalCollectors: 2 }}
/>

<!--  No Sku listing and no collectors -->
<Story name="From Creator - No Sale" args={{ sku: noSaleSku, totalCollectors: 0 }} />
<Story
  name="To Creator - No Sale"
  args={{ sku: { ...noSaleSku, issuer: { _id: '123' } }, totalCollectors: 0, userId: '123' }}
/>
<Story
  name="To Creator - Active/Upcoming Sale"
  args={{ sku: { ...activeFixedSku, issuer: { _id: '123' } }, totalCollectors: 0, userId: '123' }}
/>
<Story
  name="To Creator - Active/Upcoming Auction"
  args={{ sku: { ...upcomingAuctionSku, issuer: { _id: '123' } }, totalCollectors: 0, userId: '123' }}
/>

<!--  Unique Collector -->
<Story name="From Creator - 1 of 1" args={{ sku: uniqueSku, totalCollectors: 0, collectors: uniqueCollector }} />

<Story name="From Creator - Pending" args={{ sku: pendingSku }} />

<Story name="From Creator - Rejected" args={{ sku: rejectedSku }} />
