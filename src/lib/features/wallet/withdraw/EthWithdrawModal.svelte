<script lang="ts">
  import CryptoWithdrawModal from './CryptoWithdrawModal.svelte';
  import { withdrawableBalanceEth } from '../wallet.store';

  export let isOpen: boolean;
</script>

<CryptoWithdrawModal currency="ETH" withdrawableBalance={$withdrawableBalanceEth} {isOpen} />
