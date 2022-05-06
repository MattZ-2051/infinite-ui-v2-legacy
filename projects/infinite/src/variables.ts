import type { ModeFilterStatus } from '$lib/features/marketplace/types';
import type { TabType } from '$lib/features/product/types';
import routes from '$project/routes';

export * from './variablesUI';
export * from './variablesText';

export const CLIENT_DOC_TITLE = 'INFINITE by SUKU';
export const CLIENT_DOC_DESCRIPTION = 'Start your INFINITE NFT collection today!';
export const CLIENT_COMPANY_NAME = ' Infinite';
export const CLIENT_COMPANY_NAME_LEGAL = 'Infinite Assets, Inc.';
export const CLIENT_SOCIAL_IMAGE = {
  url: 'https://infinite-digital-dev.s3.amazonaws.com/infinite-meta-social.png',
  width: 1200,
  height: 630,
  alt: 'INFINITE by SUKU | NFT Marketplace',
};
export const HUBSPOT_FORM_URL = '//js.hsforms.net/forms/v2.js';
export const CLIENT_SUPPORT_EMAIL = 'support@goinfinite.io';
export const CLIENT_SUPPORT_URL = 'https://support.suku.world/infinite-powered-by-suku';
export const CLIENT_BIDDING_URL = 'https://support.suku.world/infinite-powered-by-suku';
export const CLIENT_HEDERA_URL = 'https://support.suku.world/infinite/hedera-hashgraph-hts';
export const CLIENT_REDEEM_URL = 'https://support.suku.world/infinite/can-i-redeem-an-item';
export const CLIENT_AFTER_REDEEMED_URL = routes.help;
export const CLIENT_API_HEADER = 'infinite';
export const ENABLE_ETH_CURRENCY = false;
export const ENABLE_SINGLE_CURRENCY_WALLET = true;
export const AUTH_PROVIDER_IS_AUTH0 = true;
export const KYC_INFO = 'https://support.suku.world/infinite/id-verification-troubleshooting';
export const MARKETPLACE_INITIAL_MODE_FILTER: ModeFilterStatus = 'available';
export const SENTRY_DNS = 'https://b93ec290c306467f812048e6bc22db15@o734225.ingest.sentry.io/6132955';
export const AVAILABLE_DEPOSIT_TYPES = 'eth,usdc,btc,hbar,suku';
export const INFINITE_EXTENSION_ENABLED = true;
export const PRODUCT_PAGE_TABS: TabType[] = ['auction', 'history', 'owner'];
export const COOKIE_URL = 'www.goinfinite.io';
export const ENABLE_RELATED_SKUS = true;
export const ENABLE_GDPR_BANNER = true;
export const PRODUCT_GALLERY_LIMIT = false;
export const ENABLE_ASSET_FILE_SIZE = true;
