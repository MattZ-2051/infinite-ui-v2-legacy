<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import TransactionDetails from './TransactionDetails.svelte';

  const transaction = {
    createdAt: '2010-09-30T02:09:29.187Z',
    owner: '6048e601782c593a7c6dffc0',
    status: 'success',
    transactionData: {},
    type: 'sale',
    _id: '612560091dd2a4112ffecf89',
  };
</script>

<Meta title="Lib / features / wallet / TransactionDetails" component={TransactionDetails} />

<Template let:args>
  <div class="max-w-md">
    <TransactionDetails {...args} />
  </div>
</Template>

<Story name="Default" args={{ transaction }} />
