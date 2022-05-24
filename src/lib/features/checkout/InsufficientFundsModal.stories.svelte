<script lang="ts">
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import InsufficientFundsModal from './InsufficientFundsModal.svelte';
</script>

<Meta title="Lib / features / Insufficient Funds Modal" component={InsufficientFundsModal} />

<Template let:args>
  <InsufficientFundsModal
    totalCost={`${100}`}
    insufficientFunds={`${10}`}
    handleDeposit={() => {
      alert('handleDeposit');
    }}
    handleOtherPaymentMethod={() => {
      alert('handleOtherPaymentMethod');
    }}
    closeModal={() => {
      alert('handleClosed');
    }}
  />
</Template>

<Story name="NotFundsModal" />
