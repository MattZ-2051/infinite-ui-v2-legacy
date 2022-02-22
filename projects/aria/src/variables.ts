import type { ModeFilterStatus } from '$lib/features/marketplace/types';

export const CLIENT_DOC_TITLE = 'ARIA Exchange';
export const CLIENT_DOC_DESCRIPTION = 'The most dynamic, original, transparent, secure and sustainable NFT Exchange';
export const CLIENT_COMPANY_NAME = 'ARIA Exchange';
export const CLIENT_COMPANY_NAME_LEGAL = 'Virtual Rights Management, LLC';
export const CLIENT_SOCIAL_IMAGE = {
  url: 'https://thearianetwork.com/wp-content/uploads/2021/06/aria_exchange_share_image-01.jpg',
  width: 1216,
  height: 740,
  alt: 'ARIA Exchange',
};
export const CLIENT_SUPPORT_EMAIL = 'support@ARIAExchange.com';
export const CLIENT_SUPPORT_URL = 'https://aria-network.force.com/support/s/';
export const CLIENT_HEDERA_URL = 'https://aria-network.force.com/support/s/article/What-is-Hedera-Hashgraph';
export const CLIENT_REDEEM_URL = 'https://aria-network.force.com/support/s/article/Can-I-redeem-an-NFT';
export const CLIENT_API_HEADER = 'aria';
export const ENABLE_ETH_CURRENCY = false;
export const AUTH_PROVIDER_IS_AUTH0 = true;
export const KYC_INFO = 'https://aria-network.force.com/support/s/article/How-do-I-verify-my-account';
export const MARKETPLACE_INITIAL_MODE_FILTER: ModeFilterStatus = 'available';
export const SENTRY_DNS = 'https://b93ec290c306467f812048e6bc22db15@o734225.ingest.sentry.io/6132955';
export const AVAILABLE_DEPOSIT_TYPES = 'usdc,btc,hbar,suku';
export const INFINITE_EXTENSION_ENABLED = false;
export const KYC_LEVEL_DISCLAIMERS = (formattedLowKYC: string) => ({
  0: `You may deposit funds using credit card through our partner, MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://aria-network.force.com/support/s/article/How-much-money-can-I-deposit-through-MoonPay" class="font-bold">here</a>.</br>
    Level 1 verification is required for withdrawals and cryptocurrency deposits under ${formattedLowKYC}. Level 2 verification is required for cryptocurrency deposits equal to or over ${formattedLowKYC}.`,
  1: `You may now perform withdrawals and deposit cryptocurrency under ${formattedLowKYC}. You may continue to deposit funds using credit card through our partner, MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://aria-network.force.com/support/s/article/How-much-money-can-I-deposit-through-MoonPay" class="font-bold">here</a>.</br>
    Level 2 verification is required for cryptocurrency deposits equal to or over ${formattedLowKYC}.`,
  2: `You may now deposit any amount of cryptocurrency, perform withdrawals, and continue to deposit funds using credit card through our partner, MoonPay. You may check MoonPay limits <a target="_blank" rel="noopener noreferrer" class="underline" href="https://aria-network.force.com/support/s/article/How-much-money-can-I-deposit-through-MoonPay" class="font-bold">here</a>.`,
});
