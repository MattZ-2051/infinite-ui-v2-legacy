import type { ApiError } from '$lib/api';
import { formatCurrency } from '$util/format';

export function handleWalletDepositError(error: ApiError) {
  switch (error?.data?.appCode) {
    case 'ABOVE_OPERATION_DEPOSIT_LIMIT':
      return `Whoops! You can only deposit up to ${formatCurrency(
        error.data.args['ccDepositCentsLimit'] / 100
      )} USD per Credit Card transaction.`;

    case 'ABOVE_DAILY_DEPOSIT_LIMIT':
      return `Whoops! You've deposited ${formatCurrency(
        error.data.args['dailySelectedCardDepositCents'] / 100
      )}  USD in the past 24 hours. The current allowable daily limit is ${formatCurrency(
        error.data.args['dailyDepositCentsLimit'] / 100
      )}  USD. Please try again when 24 hours have passed or deposit cryptocurrency.`;

    case 'ABOVE_TOTAL_DEPOSIT_LIMIT':
      return `Whoops! You've deposited ${formatCurrency(
        error.data.args['totalSelectedCardDepositCents'] / 100
      )}  USD. The current allowable lifetime limit is ${formatCurrency(
        error.data.args['totalDepositCentsLimit'] / 100
      )}  USD. If you would like to deposit more funds, you may do so using cryptocurrency.`;
    default:
      return 'We couldn’t process your payment and the transaction was cancelled.';
  }
}

export const transactionTypes = {
  all: { value: '', name: 'All types' },
  deposit: { value: 'deposit', name: 'Deposit' },
  withdrawal: { value: 'withdrawal', name: 'Withdrawal' },
  purchase: { value: 'purchase', name: 'Purchase' },
  sale: { value: 'sale', name: 'Sale' },
  claim: { value: 'claim', name: 'Claim' },
  nft_redeem: { value: 'nft_redeen', name: 'NFT redeem' },
  royalty_fee: { value: 'royalty_fee', name: 'Royalty fee' },
  nft_claim_giveaway: { value: 'nft_claim_giveaway', name: 'Giveaway' },
};
