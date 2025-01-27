export const KYC_LEVEL_DISCLAIMERS = (formattedLowKYC: string) => ({
  0: `You may deposit funds using credit card through our partner, MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://help.ariaexchange.com/s/article/How-much-money-can-I-deposit-through-MoonPay" class="font-bold">here</a>.</br></br>
      Level 1 verification is required for withdrawals and cryptocurrency deposits under ${formattedLowKYC}. Level 2 verification is required for cryptocurrency deposits equal to or over ${formattedLowKYC}.`,
  1: `You may now perform withdrawals and deposit cryptocurrency under ${formattedLowKYC}. You may continue to deposit funds using credit card through our partner, MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://help.ariaexchange.com/s/article/How-much-money-can-I-deposit-through-MoonPay" class="font-bold">here</a>.</br></br>
      Level 2 verification is required for cryptocurrency deposits equal to or over ${formattedLowKYC}.`,
  2: `You may now deposit any amount of cryptocurrency, perform withdrawals, and continue to deposit funds using credit card through our partner, MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://help.ariaexchange.com/s/article/How-much-money-can-I-deposit-through-MoonPay" class="font-bold">here</a>.`,
});

export const SUCCESS_PURCHASE_LAZY_MINT = (skuName: string) =>
  `Congratulations on buying your <span class="font-bold">${skuName}</span> NFT. You can view your new NFT and mint it.`;

export const SUCCESS_PURCHASE_INSTANT_MINT = (skuName: string) =>
  `Your purchase was successful and <span class="font-bold">${skuName}</span> has been added to your collection.`;

export const VOUCHER_CODE_MODAL_TITLE = 'Exclusive Access Code';

export const MY_WALLET_BUTTONS_DISABLED_MESSAGE =
  'The ability to deposit or withdraw funds on ariaexchange.com is currently disabled until secondary sales become available on this platform.';
