export const KYC_LEVEL_DISCLAIMERS = (formattedLowKYC: string) => ({
  0: `You may deposit funds using credit card through our partner, MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://aria-network.force.com/support/s/article/How-much-money-can-I-deposit-through-MoonPay" class="font-bold">here</a>.</br></br>
      Level 1 verification is required for withdrawals and cryptocurrency deposits under ${formattedLowKYC}. Level 2 verification is required for cryptocurrency deposits equal to or over ${formattedLowKYC}.`,
  1: `You may now perform withdrawals and deposit cryptocurrency under ${formattedLowKYC}. You may continue to deposit funds using credit card through our partner, MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://aria-network.force.com/support/s/article/How-much-money-can-I-deposit-through-MoonPay" class="font-bold">here</a>.</br></br>
      Level 2 verification is required for cryptocurrency deposits equal to or over ${formattedLowKYC}.`,
  2: `You may now deposit any amount of cryptocurrency, perform withdrawals, and continue to deposit funds using credit card through our partner, MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://aria-network.force.com/support/s/article/How-much-money-can-I-deposit-through-MoonPay" class="font-bold">here</a>.`,
});

export const SUCCESS_PURCHASE_LAZY_MINT = (skuName: string) =>
  `Congratulations on buying your <span class="font-bold">${skuName}</span> NFT. You can view your new NFT and mint it.`;

export const SUCCESS_PURCHASE_INSTANT_MINT = (skuName: string) =>
  `Your order was successful and <span class="font-bold">${skuName}</span> will be sent to the following wallet within the next 30 minutes: `;
