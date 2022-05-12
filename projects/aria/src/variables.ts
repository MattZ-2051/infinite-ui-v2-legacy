import type { ModeFilterStatus } from '$lib/features/marketplace/types';
import type { TabType } from '$lib/features/product/types';

export * from './variablesUI';
export * from './variablesText';

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
export const CLIENT_SUPPORT_URL = 'https://help.ariaexchange.com/s/';
export const CLIENT_BIDDING_URL = '';
export const CLIENT_HEDERA_URL =
  'https://help.ariaexchange.com/s/article/What-blockchain-technology-is-used-to-mint-digital-collectibles';
export const CLIENT_REDEEM_URL = 'https://help.ariaexchange.com/s/article/Can-I-redeem-an-NFT';
export const CLIENT_AFTER_REDEEMED_URL = '';
export const CLIENT_API_HEADER = 'aria';
export const ENABLE_ETH_CURRENCY = true;
export const ENABLE_SINGLE_CURRENCY_WALLET = true;
export const AUTH_PROVIDER_IS_AUTH0 = true;
export const KYC_INFO = 'https://help.ariaexchange.com/s/article/How-do-I-verify-my-account';
export const MARKETPLACE_INITIAL_MODE_FILTER: ModeFilterStatus = 'all';
export const SENTRY_DNS = 'https://b93ec290c306467f812048e6bc22db15@o734225.ingest.sentry.io/6132955';
export const AVAILABLE_DEPOSIT_TYPES = 'usdc,btc,hbar,suku';
export const INFINITE_EXTENSION_ENABLED = false;
export const PRODUCT_PAGE_TABS: TabType[] = ['auction', 'history', 'owner'];
export const COOKIE_URL = 'www.ariaexchange.com';
export const ENABLE_RELATED_SKUS = true;
export const ENABLE_GDPR_BANNER = false;
export const PRODUCT_GALLERY_LIMIT = false;
export const ENABLE_ASSET_FILE_SIZE = true;
