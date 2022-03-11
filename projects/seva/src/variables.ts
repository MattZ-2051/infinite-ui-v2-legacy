import type { ModeFilterStatus } from '$lib/features/marketplace/types';
import type { TabType } from '$lib/features/product/types';

export * from './variablesUI';
export * from './variablesText';

export const CLIENT_DOC_TITLE = 'SEVA.LOVE';
export const CLIENT_DOC_DESCRIPTION = 'The world’s first NFT goodness exchange.';
export const CLIENT_COMPANY_NAME = 'SEVA.LOVE';
export const CLIENT_COMPANY_NAME_LEGAL = 'Seva For Good Inc.';
export const CLIENT_SOCIAL_IMAGE = {
  url: 'https://www.seva.love/wp-content/uploads/2021/08/og.jpg',
  width: 1594,
  height: 831,
  alt: 'SEVA.LOVE',
};
export const HUBSPOT_FORM_URL = '//js.hsforms.net/forms/shell.js';
export const CLIENT_SUPPORT_EMAIL = 'info@seva.love';
export const CLIENT_SUPPORT_URL = 'https://info.seva.love';
export const CLIENT_BIDDING_URL = 'https://info.seva.love';
export const CLIENT_HEDERA_URL = 'https://info.seva.love/infinite/hedera-hashgraph-hts';
export const CLIENT_REDEEM_URL = 'https://info.seva.love/infinite/can-i-redeem-an-item';
export const CLIENT_API_HEADER = 'seva';
export const ENABLE_ETH_CURRENCY = true;
export const AUTH_PROVIDER_IS_AUTH0 = true;
export const KYC_INFO = 'https://info.seva.love/infinite/how-does-kyc-work';
export const MARKETPLACE_INITIAL_MODE_FILTER: ModeFilterStatus = 'all';
export const SENTRY_DNS = 'https://b93ec290c306467f812048e6bc22db15@o734225.ingest.sentry.io/6132955';
export const AVAILABLE_DEPOSIT_TYPES = 'eth,usdc,btc,hbar,suku';
export const INFINITE_EXTENSION_ENABLED = false;
export const PRODUCT_PAGE_TABS: TabType[] = ['auction', 'history', 'owner'];
