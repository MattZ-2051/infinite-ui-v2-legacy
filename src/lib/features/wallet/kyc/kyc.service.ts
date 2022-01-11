import { formatCurrencyWithOptionalFractionDigits } from '$util/format';

const LOW_KYC_LEVEL = import.meta.env.VITE_LOW_KYC_LVL_DEPOSIT_LIMIT_USD;

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

  switch (level) {
    case 0:
      return `You may deposit funds using credit card through our partner MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://support.moonpay.com/hc/en-gb/articles/4407710995217-What-are-your-account-limits-" class="font-bold">here</a>.<br/>
        Level 1 verification is required for cryptocurrency deposits under ${formattedLowKYC} and Level 2 verification is required for cryptocurrency deposits equal to or over ${formattedLowKYC}.`;
    case 1:
      return `You may deposit funds using credit card through our partner MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://support.moonpay.com/hc/en-gb/articles/4407710995217-What-are-your-account-limits-" class="font-bold">here</a>.<br/>
        Level 2 verification is required for cryptocurrency deposits equal to or over ${formattedLowKYC}.`;
    case 2:
      return `You may deposit funds using credit card through our partner MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://support.moonpay.com/hc/en-gb/articles/4407710995217-What-are-your-account-limits-" class="font-bold">here</a>. <br/>
        Also, you may deposit any amount of cryptocurrency.`;
  }
};
