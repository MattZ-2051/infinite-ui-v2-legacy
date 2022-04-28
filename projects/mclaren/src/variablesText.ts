export const KYC_LEVEL_DISCLAIMERS = (formattedLowKYC: string) => ({
  0: `You may deposit funds using credit card through our partner MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://support.moonpay.com/hc/en-gb/articles/4407710995217-What-are-your-account-limits-" class="font-bold">here</a>.<br/><br/>
        Level 1 verification is required for cryptocurrency deposits under ${formattedLowKYC} and Level 2 verification is required for cryptocurrency deposits equal to or over ${formattedLowKYC}.`,
  1: `You may deposit funds using credit card through our partner MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://support.moonpay.com/hc/en-gb/articles/4407710995217-What-are-your-account-limits-" class="font-bold">here</a>.<br/><br/>
        Level 2 verification is required for cryptocurrency deposits equal to or over ${formattedLowKYC}.`,
  2: `You may deposit funds using credit card through our partner MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://support.moonpay.com/hc/en-gb/articles/4407710995217-What-are-your-account-limits-" class="font-bold">here</a>. <br/>
        Also, you may deposit any amount of cryptocurrency.`,
});

export const SUCCESS_PURCHASE_LAZY_MINT = (skuName: string) =>
  `Congratulations on buying your <span class="font-bold">${skuName}</span> NFT. You can view your new NFT and mint it.`;

export const SUCCESS_PURCHASE_INSTANT_MINT = (skuName: string) =>
  `Your order was successful and <span class="font-bold">${skuName}</span> will be sent to the following wallet within the next 30 minutes: `;

export const VOUCHER_CODE_MODAL_TITLE = 'Exclusive Access Code';

export const MY_WALLET_BUTTONS_DISABLED_MESSAGE =
  'The ability to deposit or withdraw funds on nft.mclaren.com is currently disabled until secondary sales become available on this platform.';
