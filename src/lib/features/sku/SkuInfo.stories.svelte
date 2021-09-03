<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import dayjs from 'dayjs';
  import SkuInfo from './SkuInfo.svelte';

  const futureMinStartDate = dayjs(new Date()).add(3, 'days').add(1, 'hour').toDate();

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
      verified: true,
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

<!-- Scenario where the SKU is a "unique" SKU because max supply is 1 -->
<Story name="Unique 1 of 1" args={{ sku: { ...sku, maxSupply: 1 } }} />

<!-- Scenario where the sku listing fixed and totalUpcomingSupply > 0 and it has SkuListings, totalUpcomingSupply + totalSupply is shown in number-->
<Story
  name="Fixed - totalUpcomingSupply > 0, has SkuListings"
  args={{ sku: { ...sku, supplyType: 'fixed', skuListings: [{ _id: '1' }], totalUpcomingSupply: 2, totalSupply: 3 } }}
/>

<!-- Scenario where the sku is fixed and the totalUpcomingSupply > 0 and no SkuListings, only totalUpcomingSupply is shown in number -->
<Story
  name="Fixed - totalUpcomingSupply > 0, has no SkuListings"
  args={{ sku: { ...sku, supplyType: 'fixed', totalUpcomingSupply: 2 } }}
/>

<!-- Scenario where the sku is fixed and the totalUpcomingSupply is 0 and totalSupply > 0, whether it has SkuListings or not only totalSupply is shown in number, it will show unique state if totalSupply === 1  -->
<Story
  name="Fixed - totalUpcomingSupply === 0 && totalSupply > 0"
  args={{ sku: { ...sku, supplyType: 'fixed', skuListings: [{ _id: '1' }], totalUpcomingSupply: 0, totalSupply: 8 } }}
/>

<!-- Scenario where the sku is fixed and totalSupply and totalUpcomingSupply === 0, and there are expiredSkuListings and circulatingSupply > 0 -->
<Story
  name="Fixed - totalUpcomingSupply === 0 && totalSupply === 0 && circulatingSupply > 0, has expired SkuListings"
  args={{
    sku: {
      ...sku,
      supplyType: 'fixed',
      skuListings: [{ _id: '1' }],
      expiredSkuListings: [{ _id: '1' }],
      totalUpcomingSupply: 0,
      totalSupply: 0,
      circulatingSupply: 27,
    },
  }}
/>

<!-- Scenario where the sku is variable and circulatingSupply > 0 and end date is not in the future -->
<Story
  name="Variable - End Date is not in the future"
  args={{
    sku: {
      ...sku,
      supplyType: 'variable',
      skuListings: [{ _id: '1' }],
      expiredSkuListings: [{ _id: '1' }],
      totalUpcomingSupply: 4,
      totalSupply: 10,
      circulatingSupply: 27,
    },
  }}
/>

<!-- Scenario where the sku is variable and circulatingSupply === 0 and the end date is in the future -->
<Story
  name="Variable - End Date in the future"
  args={{
    sku: {
      ...sku,
      supplyType: 'variable',
      skuListings: [{ _id: '1' }],
      expiredSkuListings: [{ _id: '1' }],
      totalUpcomingSupply: 4,
      totalSupply: 10,
      circulatingSupply: 0,
      minStartDate: futureMinStartDate,
    },
  }}
/>

<!-- Scenario where there is an Active Auction and the end date is shown -->
<Story
  name="Variable - Active Auction"
  args={{
    sku: {
      ...sku,
      supplyType: 'variable',
      skuListings: [{ _id: '1' }],
      expiredSkuListings: [{ _id: '1' }],
      totalUpcomingSupply: 4,
      totalSupply: 10,
      circulatingSupply: 20,
      activeProductListings: [{ saleType: 'auction', endDate: futureMinStartDate }],
    },
  }}
/>

<!-- Scenario where there is an Active Product Sale and the start date is shown -->
<Story
  name="Variable - Active Product Sale"
  args={{
    sku: {
      ...sku,
      supplyType: 'variable',
      skuListings: [{ _id: '1' }],
      circulatingSupply: 20,
      activeProductListings: [{ saleType: 'fixed', startDate: new Date() }],
    },
  }}
/>

<!-- Scenario where there is an Active Sku Sale and the start date is shown -->
<Story
  name="Variable - Active Sku Sale"
  args={{
    sku: {
      ...sku,
      supplyType: 'variable',
      skuListings: [{ _id: '1' }],
      circulatingSupply: 13,
      activeSkuListings: [{ _id: '1', saleType: 'fixed', startDate: new Date() }],
    },
  }}
/>
