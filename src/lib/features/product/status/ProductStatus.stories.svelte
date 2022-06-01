<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import dayjs from 'dayjs';
  import ProductStatus from './ProductStatus.svelte';

  const dummyDate = dayjs(new Date()).add(7, 'days').add(7, 'hour').toDate();

  const activeProductSale = {
    activeProductListing: {
      saleType: 'fixed',
      startDate: dummyDate,
      price: 20,
    },
    owner: {
      _id: '1',
    },
  };

  const upcomingProductSale = {
    upcomingProductListing: {
      saleType: 'fixed',
      startDate: dummyDate,
      price: 20,
    },
    owner: {
      _id: '1',
    },
  };

  const activeProductAuction = {
    sku: {
      currency: 'USD',
    },
    activeProductListing: {
      saleType: 'auction',
      startDate: dummyDate,
      endDate: dummyDate,
      minBid: 20,
    },
    owner: {
      _id: '1',
    },
  };

  const upcomingProductAuction = {
    upcomingProductListing: {
      saleType: 'auction',
      startDate: dummyDate,
      endDate: dummyDate,
      minBid: 20,
    },
    owner: {
      _id: '1',
    },
  };
</script>

<Meta
  title="Lib / features / status / ProductStatus"
  component={ProductStatus}
  args={{ userId: '1' }}
  parameters={{
    chromatic: { viewports: [640, 1024] },
  }}
/>

<Template let:args>
  <div class="p-10">
    <ProductStatus {...args} />
  </div>
</Template>

<!-- product has activeProductListings with saleType !== auction  -->
<Story name="Not Owner - Active Sale" args={{ product: activeProductSale, userId: '2' }} />

<!-- product has upcomingProuctListing with saleType !== auction  -->
<Story name="Not Owner - Upcoming Sale" args={{ product: upcomingProductSale, userId: '2' }} />

<!-- product has activeProductListing that is saleType === auction -->
<Story name="Not Owner - Active Auction" args={{ product: activeProductAuction, userId: '2' }} />

<!-- product has upcomingProductListing with saleType === auction  -->
<Story name="Not Owner - Upcoming Auction" args={{ product: upcomingProductAuction, userId: '2' }} />

<Story name="Owner - Active Sale" args={{ product: activeProductSale, userId: '1' }} />

<Story name="Owner - Upcoming Sale" args={{ product: upcomingProductSale, userId: '1' }} />

<Story name="Owner - Active Auction" args={{ product: activeProductAuction, userId: '1' }} />

<Story name="Owner - Upcoming Auction" args={{ product: upcomingProductAuction, userId: '1' }} />
