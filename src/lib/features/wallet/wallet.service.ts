import type { ApiError } from '$lib/api';
import { formatCurrency } from '$util/format';

export function handleWalletDepositError(error: ApiError) {
  switch (error?.data?.appCode) {
    case 'ABOVE_OPERATION_DEPOSIT_LIMIT':
      return `You can only deposit up to ${formatCurrency(
        error.data.args['ccDepositCentsLimit'] / 100
      )} per credit card transaction.`;

    default:
      return 'We couldn’t process your payment and the transaction was cancelled.';
  }
}
