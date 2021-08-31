<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import SkuPriceBox from './SkuPriceBox.svelte';

  const dummyDate = Date.now() + 12 ** 5;

  const activeSkuListings = [
    {
      price: 20,
    },
  ];

  const upcomingSkuListings = [
    {
      price: 20,
    },
  ];

  const nftGiveAway = [
    {
      saleType: 'giveaway',
      startDate: dummyDate,
      status,
    },
  ];

  const soldSkuListings = [
    {
      price: 21,
    },
  ];

  const activeCollectorSales = [
    {
      listing: {
        price: 20,
        startDate: dummyDate,
      },
    },
    {
      listing: {
        price: 10,
        startDate: dummyDate,
        saleType: 'fixed',
        status: 'active',
      },
    },
    {
      listing: {
        price: 210,
        startDate: dummyDate,
      },
    },
  ];

  const activeCollectorAuction = [
    {
      listing: {
        saleType: 'auction',
        status: 'active',
        minBid: 200,
        startDate: dummyDate,
        endDate: dummyDate,
      },
    },
    {
      listing: {
        saleType: 'auction',
        status: 'active',
        minBid: 100,
        startDate: dummyDate,
        endDate: dummyDate,
      },
    },
  ];

  const upcomingCollectorAuction = [
    {
      listing: {
        saleType: 'auction',
        status: 'active',
        minBid: 200,
        startDate: dummyDate,
      },
    },
    {
      listing: {
        saleType: 'auction',
        status: 'upcoming',
        minBid: 100,
        startDate: dummyDate,
      },
    },
  ];

  const limitedCollector = [
    {
      highestBid: 10,
      listing: {
        saleType: 'auction',
        status: 'sold',
        minBid: 10,
        endDate: dummyDate,
      },
      serialNumber: '4',
      owner: {
        username: 'matt',
      },
    },
  ];
  const activeSku = {
    activeSkuListings: activeSkuListings,
    upcomingSkuListings: [],
    totalSkuListingSupplyLeft: 3,
    activeProductListings: [],
    upcomingProductListings: [],
    soldSkuListings: [],
  };

  const upcomingSku = {
    upcomingSkuListings: upcomingSkuListings,
    activeSkuListings: [],
    minStartDate: dummyDate,
    supplyType: 'fixed',
    totalSupplyUpcoming: 10,
  };

  const noSaleSku = {
    totalSkuListingSupplyLeft: 0,
    activeSkuListings: [],
    upcomingSkuListings: [],
    skuListings: [],
    soldSkuListings: soldSkuListings,
    minPrice: 10,
    countProductListings: 2,
  };

  const upcomingNftGiveAwaySku = {
    activeSkuListings: [],
    upcomingSkuListings: nftGiveAway,
    maxSupply: 3,
    supplyType: 'variable',
  };

  const activeNftGiveAwaySku = {
    activeSkuListings: nftGiveAway,
    upcomingSkuListings: [],
    maxSupply: 3,
    supplyType: 'variable',
  };

  const limitedSku = {
    activeSkuListings: [],
    upcomingSkuListings: [],
    totalSupply: 1,
  };
</script>

<Meta title="Lib / features / sku / SkuPriceBox" component={SkuPriceBox} />

<Template let:args>
  <div class="max-w-md">
    <SkuPriceBox {...args} />
  </div>
</Template>

<!-- Active Sku Listings with Active Sale from Collector -->
<Story
  name="From Creator - Active, From Collectors - Active sale"
  args={{ sku: activeSku, totalCollectors: 4, collectors: activeCollectorSales }}
/>
<!-- Upcoming Sku Listings with no collectors -->
<Story
  name="From Creator - Upcoming Listing, No Collectors"
  args={{ sku: upcomingSku, totalCollectors: 0, collectors: [] }}
/>
<!-- No Sku Listings with Upcoming Auction from collector  -->
<Story
  name="From Creator - None for sale, From Collectors - Upcoming Auction"
  args={{ sku: noSaleSku, totalCollectors: 2, collectors: upcomingCollectorAuction }}
/>

<!-- Upcoming NFT giveaway, to see open vs close edition change supply type from variable to fixed -->
<Story
  name="From Creator - Upcoming NFT Giveaway, No Collectors"
  args={{ sku: upcomingNftGiveAwaySku, totalCollectors: 0, collectors: [] }}
/>

<!-- Active Giveaway with active auction from collector -->
<Story
  name="From Creator - Active NFT Giveaway, From Collectors - Active Auction"
  args={{ sku: activeNftGiveAwaySku, totalCollectors: 2, collectors: activeCollectorAuction }}
/>

<!-- Special Case where maxSupply is set to 1 -->
<Story name="Limited Sku One Collector" args={{ sku: limitedSku, totalCollectors: 1, collectors: limitedCollector }} />

<!-- Default Case where there are no active listings or upcoming listings -->
<Story
  name="From Creator - None for sale, From Collectors - Default"
  args={{ sku: activeSku, totalCollectors: 3, collectors: limitedCollector }}
/>
