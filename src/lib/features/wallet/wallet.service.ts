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
