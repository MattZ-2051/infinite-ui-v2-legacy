<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import AccountVerification from './AccountVerification.svelte';
</script>

<Meta
  title="Lib / features / wallet / AccountVerification"
  component={AccountVerification}
  argTypes={{
    kycPending: {
      options: [true, false],
    },
    kycMaxLevel: {
      options: [0, 1, 2],
    },
  }}
/>

<Template let:args>
  <AccountVerification {...args} />
</Template>

<Story name="Unverified" args={{ kycPending: false, kycMaxLevel: 0, dailyDepositLimit: 2000 }} />
<Story name="Level 1" args={{ kycPending: false, kycMaxLevel: 1, dailyDepositLimit: 2000 }} />
<Story name="Level 2" args={{ kycPending: false, kycMaxLevel: 2, dailyDepositLimit: 2000 }} />
<Story name="Pending verification to level 1" args={{ kycPending: true, kycMaxLevel: 0, dailyDepositLimit: 2000 }} />
<Story name="Pending verification to level 2" args={{ kycPending: true, kycMaxLevel: 1, dailyDepositLimit: 2000 }} />
