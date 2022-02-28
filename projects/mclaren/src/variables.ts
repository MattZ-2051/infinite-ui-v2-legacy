import type { ModeFilterStatus } from '$lib/features/marketplace/types';

export const CLIENT_DOC_TITLE = 'McLaren';
export const CLIENT_DOC_DESCRIPTION = 'Start your McLaren NFT collection today!';
export const CLIENT_COMPANY_NAME = 'McLaren';
export const CLIENT_COMPANY_NAME_LEGAL = 'McLaren Assets, Inc.';
export const CLIENT_SOCIAL_IMAGE = {
  url: 'https://infinite-digital-dev.s3.amazonaws.com/infinite-meta-social.png',
  width: 1200,
  height: 630,
  alt: 'McLaren by INFINTEWORLD | NFT Marketplace',
};
export const HUBSPOT_FORM_URL = '//js.hsforms.net/forms/v2.js';
export const CLIENT_SUPPORT_EMAIL = 'help@infinite.com';
export const CLIENT_SUPPORT_URL = 'https://support.suku.world/infinite-powered-by-suku';
export const CLIENT_BIDDING_URL = 'https://support.suku.world/infinite-powered-by-suku';
export const CLIENT_HEDERA_URL = 'https://support.suku.world/infinite/hedera-hashgraph-hts';
export const CLIENT_REDEEM_URL = 'https://support.suku.world/infinite/can-i-redeem-an-item';
export const CLIENT_API_HEADER = 'infinite';
export const ENABLE_ETH_CURRENCY = false;
export const AUTH_PROVIDER_IS_AUTH0 = true;
export const KYC_INFO = 'https://support.suku.world/infinite/id-verification-troubleshooting';
export const MARKETPLACE_INITIAL_MODE_FILTER: ModeFilterStatus = 'available';
export const SENTRY_DNS = 'https://b93ec290c306467f812048e6bc22db15@o734225.ingest.sentry.io/6132955';
export const AVAILABLE_DEPOSIT_TYPES = 'eth,usdc,btc,hbar,suku';
export const INFINITE_EXTENSION_ENABLED = false;
export const KYC_LEVEL_DISCLAIMERS = (formattedLowKYC: string) => ({
  0: `You may deposit funds using credit card through our partner MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://support.moonpay.com/hc/en-gb/articles/4407710995217-What-are-your-account-limits-" class="font-bold">here</a>.<br/>
        Level 1 verification is required for cryptocurrency deposits under ${formattedLowKYC} and Level 2 verification is required for cryptocurrency deposits equal to or over ${formattedLowKYC}.`,
  1: `You may deposit funds using credit card through our partner MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://support.moonpay.com/hc/en-gb/articles/4407710995217-What-are-your-account-limits-" class="font-bold">here</a>.<br/>
        Level 2 verification is required for cryptocurrency deposits equal to or over ${formattedLowKYC}.`,
  2: `You may deposit funds using credit card through our partner MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://support.moonpay.com/hc/en-gb/articles/4407710995217-What-are-your-account-limits-" class="font-bold">here</a>. <br/>
        Also, you may deposit any amount of cryptocurrency.`,
});
