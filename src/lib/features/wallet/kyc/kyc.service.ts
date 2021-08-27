import { formatCurrencyWithOptionalFractionDigits } from '$util/format';

export function getDailyDepositLimitDisclaimer(level: number, dailyDepositLimit: number) {
  const formattedDailyDepositLimit = formatCurrencyWithOptionalFractionDigits(dailyDepositLimit);
  if (level === 0) {
    return `Account verification is required for users to deposit cryptocurrency or > ${formattedDailyDepositLimit} from a credit card.`;
  } else if (level === 1) {
    return `You are eligible to deposit cryptocurrency and a cumulative balance up to ${formattedDailyDepositLimit}.`;
  } else if (level > 1) {
    return `You are eligible to deposit cryptocurrency and a cumulative balance > ${formattedDailyDepositLimit}.`;
  }
}
