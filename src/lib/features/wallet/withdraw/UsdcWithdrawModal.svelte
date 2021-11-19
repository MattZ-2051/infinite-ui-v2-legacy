<script lang="ts">
  import CryptoWithdrawModal from './CryptoWithdrawModal.svelte';
  import { withdrawableBalanceUsd } from '../wallet.store';

  export let isOpen: boolean;
</script>

<CryptoWithdrawModal currency="USDC" withdrawableBalance={$withdrawableBalanceUsd} {isOpen} />
