<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import SkuInfo from './SkuInfo.svelte';

  const sku = {
    _id: '610c7d592102cb1f36318d26',
    name: 'SKU INA 893 C',
    description: 'TC 893',
    issuer: {
      _id: '60c12baa28051939033aca02',
      showNotifyMe: true,
      role: 'issuer',
      username: 'auctioneer1',
      profilePhotoUrl: 'https://image.flaticon.com/icons/png/512/147/147144.png',
      externalId: 'auth0|ed491214-bf76-4903-b79a-b9cb09e1b030',
      hederaAccount: '0.0.1894157',
      createdAt: '2021-06-09T20:59:22.410Z',
      updatedAt: '2021-06-09T21:01:19.569Z',
      __v: 0,
    },
    issuerName: 'Nike',
    maxSupply: 5,
    supplyType: 'fixed',
    series: {
      _id: '60c12d6028051939033aca05',
      name: 'Auction test 1',
      description: 'not visible',
      issuerId: '60c12baa28051939033aca02',
      createdAt: '2021-06-09T21:06:40.542Z',
      updatedAt: '2021-06-09T21:06:40.542Z',
      __v: 0,
    },
    category: {
      _id: '60c12ced28051939033aca04',
      name: 'Auction Test Category 6/9 v1',
      createdAt: '2021-06-09T21:04:45.462Z',
      updatedAt: '2021-06-09T21:04:45.462Z',
      __v: 0,
    },
    featured: true,
    display: true,
    redeemable: true,
    royaltyFeePercentage: 0,
    sellerTransactionFeePercentage: 0,
    sellerTransactionFeePercentageSecondary: 0,
    published: false,
    tags: [],
    createdAt: '2021-08-06T00:07:53.637Z',
    updatedAt: '2021-08-06T00:07:53.637Z',
    circulatingSupply: 1,
    upcomingSkuListings: [],
    activeSkuListings: [],
    expiredSkuListings: [],
    soldSkuListings: [],
    upcomingProductListings: [],
    activeProductListings: [],
    expiredProductListings: [],
    soldProductListings: [],
    totalSkuListingSupply: 0,
    countActiveSkuListings: 0,
    minSkuPrice: 0,
    totalUpcomingSupply: 0,
    countProductListings: 0,
    totalSkuListingSupplyLeft: 0,
    totalSupply: 1,
    totalSupplyLeft: 0,
    maxBid: 0,
    minHighestBid: 0,
    minPrice: 0,
  };
</script>

<Meta title="Lib / SKU / Info" component={SkuInfo} />

<Template let:args>
  <div class="max-w-3xl p-20">
    <SkuInfo {...args} />
  </div>
</Template>

<Story name="Default" args={{ sku }} />
