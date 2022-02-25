<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Sort from './Sort.svelte';

  const sortOptions = [
    {
      name: 'Serial A to Z',
      value: 'serialNumber:asc',
    },
    {
      name: 'Serial Z to A',
      value: 'serialNumber:desc',
    },
    {
      name: 'Price high to low',
      value: 'price:desc',
    },
    {
      name: 'Price low to high',
      value: 'price:asc',
    },
  ];

  const sortOptionsTwo = [
    {
      name: 'All for sale',
      value: '',
    },
    {
      name: 'All',
      value: 'all',
    },
    {
      name: 'Auction Only',
      value: 'auction',
    },
    {
      name: 'Buy Now Only',
      value: 'fixed',
    },
  ];
</script>

<Meta
  title="Lib / components / Sort"
  component={Sort}
  argTypes={{
    sortOptions: { options: [sortOptions, sortOptionsTwo] },
  }}
/>

<Template let:args>
  <div class="max-w-5xl" style="height: min(500px, 100%);">
    <Sort {...args} />
  </div>
</Template>

<Story name="Sort options" args={{ sortOptions }} />
<Story name="Sort Status" args={{ sortOptions: sortOptionsTwo }} />
