<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import TransactionItem from './TransactionItem.svelte';
  import { transactionCreator as tc } from './TransactionCreator';
</script>

<Meta
  title="Lib / features/ wallet / TransactionItem"
  component={TransactionItem}
  argTypes={{
    type: {
      options: ['royalty_fee', 'purchase', 'withdrawal', 'deposit', 'nft_redeem', 'nft_claim_giveaway'],
      control: { type: 'select' },
    },
    withdrawType: {
      options: ['usdc', 'other'],
      control: { type: 'select' },
    },
    balanceCurrency: {
      options: ['ETH', 'USD'],
      control: { type: 'select' },
    },
    depositType: {
      options: ['usdc', 'cc', 'circle', 'coinbase', 'hbar', 'moonpay'],
      control: { type: 'select' },
    },
    status: {
      options: ['error', 'pending', 'success'],
      control: { type: 'select' },
    },
    cardNetwork: {
      options: ['visa', 'MasterCard'],
      control: { type: 'select' },
    },
  }}
/>

<Template let:args>
  <div class="max-w-xl">
    <TransactionItem slot="title" transaction={tc(args)} />
  </div>
</Template>

<Story name="RoyaltyFee | Sale" args={{ type: 'royalty_fee' }} />
<Story name="Purchase" args={{ type: 'purchase' }} />
<Story name="Withdrawal" args={{ type: 'withdrawal' }} />
<Story name="Withdrawal usdc" args={{ type: 'withdrawal', withdrawType: 'usdc' }} />
<Story name="Deposit cc" args={{ type: 'deposit', depositType: 'cc' }} />
<Story name="Deposit cc Visa" args={{ type: 'deposit', depositType: 'cc', cardNetwork: 'visa' }} />
<Story name="Deposit cc Mastercard" args={{ type: 'deposit', depositType: 'cc', cardNetwork: 'masterCard' }} />
<Story
  name="Deposit circle ETH"
  args={{ type: 'deposit', depositType: 'circle', amountUnrated: '10', circleType: 'eth' }}
/>
<Story
  name="Deposit circle USDC"
  args={{ type: 'deposit', depositType: 'circle', amountUnrated: '100', circleType: 'usdc' }}
/>
<Story
  name="Deposit moonPay USDC"
  args={{ type: 'deposit', depositType: 'moonpay', amountUnrated: '100', circleType: 'usdc' }}
/>
<Story
  name="Deposit circle BTC"
  args={{ type: 'deposit', depositType: 'circle', amountUnrated: '10', circleType: 'btc' }}
/>
<Story name="Deposit coinbase" args={{ type: 'deposit', depositType: 'coinbase' }} />
<Story name="Deposit hbar" args={{ type: 'deposit', depositType: 'hbar', amountUnrated: '10' }} />
<Story name="NFT reedem" args={{ type: 'nft_redeem' }} />
<Story name="Giveaway" args={{ type: 'nft_claim_giveaway' }} />
<Story name="RoyaltyFee with error" args={{ type: 'royalty_fee', status: 'error' }} />
<Story name="Purchase with error" args={{ type: 'purchase', status: 'error' }} />
<Story name="Sale with error" args={{ type: 'sale', status: 'error' }} />
<Story name="Withrawal with error " args={{ type: 'withdrawal', status: 'error' }} />
<Story name="Withrawal with error usdc" args={{ type: 'withdrawal', status: 'error', withdrawType: 'usdc' }} />
<Story name="Deposit cc with error" args={{ type: 'deposit', depositType: 'cc', status: 'error' }} />
<Story
  name="Deposit circle ETH with error"
  args={{ type: 'deposit', depositType: 'circle', amountUnrated: '10', circleType: 'eth', status: 'error' }}
/>
<Story
  name="Deposit circle USDC with error"
  args={{ type: 'deposit', depositType: 'circle', amountUnrated: '100', circleType: 'usdc', status: 'error' }}
/>
<Story
  name="Deposit circle BTC with error"
  args={{ type: 'deposit', depositType: 'circle', amountUnrated: '10', circleType: 'btc', status: 'error' }}
/>

<Story name="Deposit coinbase with error" args={{ type: 'deposit', depositType: 'coinbase', status: 'error' }} />
<Story name="Deposit hbar with error" args={{ type: 'deposit', depositType: 'hbar', status: 'error' }} />
<Story name="NFT reedem with error" args={{ type: 'nft_redeem', status: 'error' }} />
<Story name="Giveaway with error" args={{ type: 'nft_claim_giveaway', status: 'error' }} />

<Story name="Deposit coinbase ETH" args={{ type: 'deposit', depositType: 'coinbase' }} />
