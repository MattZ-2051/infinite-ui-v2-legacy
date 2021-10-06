<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Pagination from './Pagination.svelte';
</script>

<Meta title="UI / Pagination" component={Pagination} parameters={{ themes: ['light', 'dark'] }} />

<Template let:args>
  <Pagination {...args} />
</Template>

<Story name="Default" args={{ perPage: 10, total: 105, page: 1 }} />
