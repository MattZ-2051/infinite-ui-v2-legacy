<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Breadcrumb from './Breadcrumb.svelte';
  import BreadcrumbItem from './BreadcrumbItem.svelte';
</script>

<Meta
  title="UI / Breadcrumb"
  component={Breadcrumb}
  subcomponents={{
    BreadcrumbItem,
  }}
/>

<Template let:args>
  <Breadcrumb {...args}>
    <BreadcrumbItem>Home</BreadcrumbItem>
    <BreadcrumbItem>Library</BreadcrumbItem>
    <BreadcrumbItem>Data</BreadcrumbItem>
  </Breadcrumb>
</Template>

<Story name="Default" />
