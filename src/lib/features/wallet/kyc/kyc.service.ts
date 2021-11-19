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

export const getKYCLevelDepositDisclaimer = (level: number) => {
  switch (level) {
    case 0:
      return `You may deposit up to $1,000 per transaction, up to $2,000 per day, up to $3,000 lifetime from a
      major credit card. Level 1 verification is required for cryptocurrency deposits under $10,000 USD and Level 2 verification is required
      for cryptocurrency deposits equal to or over $10,000 USD.`;
    case 1:
      return `You may deposit up to $1,000 per transaction, up to $2,000 per day, up to $3,000
      lifetime from a major credit card. Also, you may deposit cryptocurrency up to $10,000 USD.
      Level 2 verification is required for cryptocurrency deposits equal to or over $10,000 USD.`;
    case 2:
      return `You may deposit up to $1,000 per transaction, up to $2,000 per day, up to $3,000 lifetime from a major credit card.
      Also, you may deposit any amount of cryptocurrency.`;
  }
};
