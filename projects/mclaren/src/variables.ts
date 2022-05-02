import type { ModeFilterStatus } from '$lib/features/marketplace/types';
import type { TabType } from '$lib/features/product/types';
import routes from '$project/routes';

export * from './variablesUI';
export * from './variablesText';

export const CLIENT_DOC_TITLE = {
  '1': 'McLaren MSO LAB - Exclusive NFT Drops & Metaverse Roadmap',
  '2': 'McLaren NFT Drop - MSO LAB Genesis Collection Launched',
  '3': 'McLaren NFT Collection - Buy Rare & Exclusive Supercar NFTs',
};
export const CLIENT_DOC_DESCRIPTION = {
  '1': 'McLaren Automotive enters the metaverse with the first in a series of exclusive NFT drops on 11/05/22. Owners will get access to the MSO LAB community.',
  '2': 'McLaren Genesis NFT collection. Unlock MSO LAB member benefits through an exclusive, invitation-only NFT mint centred around McLaren P1™.',
  '3': 'McLaren Genesis NFT collection. Unlock MSO LAB member benefits through an exclusive, invitation-only NFT mint centred around McLaren P1™.',
};
export const CLIENT_COMPANY_NAME = 'McLaren';
export const CLIENT_COMPANY_NAME_LEGAL = 'McLaren Assets, Inc.';
export const CLIENT_SOCIAL_IMAGE = {
  url: 'https://mclaren-assets.s3.amazonaws.com/assets-web/MCL014_MSO_header_1400x400.png',
  width: 1400,
  height: 400,
  alt: 'McLaren MSO LAB - Exclusive NFT Drops & Metaverse Roadmap',
};
export const HUBSPOT_FORM_URL = '//js.hsforms.net/forms/v2.js';
export const CLIENT_SUPPORT_EMAIL = 'support-mclaren@goinfinite.io';
export const CLIENT_SUPPORT_URL = 'https://cars.mclaren.com/gb-en/nft-faqs';
export const CLIENT_BIDDING_URL = 'https://support.suku.world/infinite-powered-by-suku';
export const CLIENT_HEDERA_URL = 'https://support.suku.world/infinite/hedera-hashgraph-hts';
export const CLIENT_REDEEM_URL = 'https://support.suku.world/infinite/can-i-redeem-an-item';
export const CLIENT_AFTER_REDEEMED_URL = routes.help;
export const CLIENT_API_HEADER = 'mclaren';
export const ENABLE_ETH_CURRENCY = true;
export const ENABLE_SINGLE_CURRENCY_WALLET = true;
export const AUTH_PROVIDER_IS_AUTH0 = true;
export const KYC_INFO = 'https://support.suku.world/infinite/id-verification-troubleshooting';
export const MARKETPLACE_INITIAL_MODE_FILTER: ModeFilterStatus = 'available';
export const SENTRY_DNS = 'https://b93ec290c306467f812048e6bc22db15@o734225.ingest.sentry.io/6132955';
export const AVAILABLE_DEPOSIT_TYPES = 'eth,usdc,btc,hbar,suku';
export const INFINITE_EXTENSION_ENABLED = false;
export const PRODUCT_PAGE_TABS: TabType[] = ['description', 'history', 'owner'];
export const COOKIE_URL = 'www.nft.mclaren.com';
export const ENABLE_RELATED_SKUS = false;
export const ENABLE_GDPR_BANNER = true;
export const PRODUCT_GALLERY_LIMIT = 2;
export const G_SITE_VERIFICATION = 'L28RuqCJ5xG7gRgUcvPDQ-o7MsAb93oeOzkkdW1j1ok';
