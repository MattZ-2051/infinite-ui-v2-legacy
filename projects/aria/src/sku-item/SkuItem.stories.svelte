<script>
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import dayjs from 'dayjs';
  import SkuItem from './SkuItem.svelte';
  import { item } from '../../../../mocks/resolvers/sku/data';
</script>

<Meta
  title="Aria / sku-item / SkuItem"
  component={SkuItem}
  argTypes={{
    type: {
      options: ['sku', 'product'],
      control: { type: 'select' },
    },
  }}
/>

<Template let:args>
  <div class="max-w-sm m-4">
    <SkuItem sku={item} {...args} />
  </div></Template
>

<Story name="Active" args={{ item }} />
<Story
  name="Upcoming"
  args={{ item: { ...item, minStartDate: dayjs(new Date()).add(3, 'days').add(1, 'hour').toDate() } }}
/>
<Story
  name="Upcoming Soon"
  args={{
    type: 'sku',
    item: { ...item, minStartDate: dayjs(new Date()).add(2, 'days').add(6, 'hour').add(5, 'minute').toDate() },
  }}
/>
<Story name="No Sale" args={{ item: { ...item, minStartDate: new Date(), totalSupplyLeft: 0 } }} />
<Story name="Unique" args={{ item: { ...item, maxSupply: 1 } }} />
<Story name="Limited" args={{ item: { ...item, totalSupply: 1 } }} />
<Story name="Released" args={{ item: { ...item, supplyType: 'variable', circulatingSupply: 1 } }} />
<Story name="Multiple" args={{ item: { ...item, totalSupply: 2 } }} />
<Story
  name="Long Description"
  args={{
    item: {
      ...item,
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    },
  }}
/>
