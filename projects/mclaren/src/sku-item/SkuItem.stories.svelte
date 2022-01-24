<script>
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import dayjs from 'dayjs';
  import { item } from '$mocks/resolvers/sku/data';
  import SkuItem from './SkuItem.svelte';
</script>

<Meta title="Infinite / sku-item / SkuItem" component={SkuItem} parameters={{ themes: ['light', 'dark'] }} />

<Template let:args>
  <div class="max-w-sm m-4">
    <SkuItem {...args} />
  </div></Template
>

<Story name="Active" args={{ sku: item }} />
<Story
  name="Upcoming"
  args={{ sku: { ...item, minStartDate: dayjs(new Date()).add(3, 'days').add(1, 'hour').toDate() } }}
/>
<Story
  name="Upcoming Soon"
  args={{
    sku: { ...item, minStartDate: dayjs(new Date()).add(2, 'days').add(6, 'hour').add(5, 'minute').toDate() },
  }}
/>
<Story
  name="Active"
  args={{
    sku: {
      ...item,
      minSkuPrice: 3,
      activeProductListings: [{ price: 10 }],
      activeSkuListings: [],
    },
  }}
/>
<Story
  name="Upcoming"
  args={{
    sku: {
      ...item,
      minStartDate: dayjs(new Date()).add(3, 'days').add(1, 'hour').toDate(),
      activeProductListings: [],
      activeSkuListings: [],
      upcomingProductListings: [],
    },
  }}
/>
<Story
  name="Upcoming Soon"
  args={{
    sku: {
      ...item,
      minStartDate: dayjs(new Date()).add(2, 'days').add(6, 'hour').add(5, 'minute').toDate(),
      activeProductListings: [],
      activeSkuListings: [],
      upcomingProductListings: [],
    },
  }}
/>
<Story
  name="No Sale"
  args={{
    sku: {
      ...item,
      minStartDate: new Date(),
      totalSupplyLeft: 0,
      activeProductListings: [],
      activeSkuListings: [],
      upcomingProductListings: [],
    },
  }}
/>
<Story name="Unique" args={{ sku: { ...item, maxSupply: 1, activeProductListings: [{ price: 20 }] } }} />
<Story
  name="Limited"
  args={{
    sku: { ...item, totalSupply: 1, activeSkuListings: [{ minPrice: 20 }], minSkuPrice: 20, activeProductListings: [] },
  }}
/>
<Story
  name="Released"
  args={{
    sku: {
      ...item,
      supplyType: 'variable',
      circulatingSupply: 1,
      activeSkuListings: [{ minPrice: 20 }],
      minSkuPrice: 20,
      maxBid: 5,
      minHighestBid: 5,
      activeProductListings: [{ minBid: 5, saleType: 'auction' }],
    },
  }}
/>
<Story
  name="Multiple"
  args={{
    sku: {
      ...item,
      totalSupply: 2,
      upcomingSkuListings: [],
      upcomingProductListings: [
        { startDate: dayjs(new Date()).add(2, 'days').add(6, 'hour').add(5, 'minute').toDate() },
      ],
      activeSkuListings: [],
      activeProductListings: [],
    },
  }}
/>
