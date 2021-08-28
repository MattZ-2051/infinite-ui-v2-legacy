<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import AccountVerification from './AccountVerification.svelte';
  import { getDailyDepositLimitDisclaimer } from './kyc.service';
</script>

<Meta
  title="Lib / features / wallet / AccountVerification"
  component={AccountVerification}
  argTypes={{
    pending: {
      options: [true, false],
    },
    level: {
      options: [0, 1, 2],
    },
  }}
/>

<Template let:args>
  <div class="max-w-xs">
    <AccountVerification {...args} />
  </div>
  <div class="text-xs font-medium text-white-opacity-50 mt-4">
    {getDailyDepositLimitDisclaimer(args.level, 2000)}
  </div>
</Template>

<Story name="Unverified" args={{ pending: false, level: 0 }} />
<Story name="Level 1" args={{ pending: false, level: 1 }} />
<Story name="Level 2" args={{ pending: false, level: 2 }} />
<Story name="Pending verification to level 1" args={{ pending: true, level: 0 }} />
<Story name="Pending verification to level 2" args={{ pending: true, level: 1 }} />
