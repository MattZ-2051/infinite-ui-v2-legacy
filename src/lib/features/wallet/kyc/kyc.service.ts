import { formatCurrencyWithOptionalFractionDigits } from '$util/format';
import { KYC_LEVEL_DISCLAIMERS } from '$project/variables';

const LOW_KYC_LEVEL = import.meta?.env?.VITE_LOW_KYC_LVL_DEPOSIT_LIMIT_USD;

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

export const getKYCLevelDepositDisclaimer = (level: number) => {
  const formattedLowKYC = `${formatCurrencyWithOptionalFractionDigits(LOW_KYC_LEVEL)} USD`;

  return KYC_LEVEL_DISCLAIMERS(formattedLowKYC)[level];
};
