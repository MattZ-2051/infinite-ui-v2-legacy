<script>
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import dayjs from 'dayjs';
  import SkuItem from './SkuItem.svelte';
  import { item } from '../../../../mocks/resolvers/sku/data';
</script>

<Meta title="Aria / sku-item / SkuItem" component={SkuItem} />

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
<Story name="No Sale" args={{ sku: { ...item, minStartDate: new Date(), totalSupplyLeft: 0 } }} />
<Story name="Unique" args={{ sku: { ...item, maxSupply: 1 } }} />
<Story name="Limited" args={{ sku: { ...item, totalSupply: 1 } }} />
<Story name="Released" args={{ sku: { ...item, supplyType: 'variable', circulatingSupply: 1 } }} />
<Story name="Multiple" args={{ sku: { ...item, totalSupply: 2 } }} />
