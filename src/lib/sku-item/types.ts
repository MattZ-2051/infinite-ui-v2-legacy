import type { CurrencyType } from '$lib/features/wallet/types';
import type { User } from '$lib/user/types';
import type { FileAsset } from '$ui/file/types';

export type Rarity = 'uncommon' | 'common' | 'rare' | 'epic' | 'legendary';
export type Edition = 'single' | 'limited' | 'open';

export type SocialFileAsset = FileAsset & {
  platform: 'all' | 'facebook' | 'instagram' | 'twitter' | 'discord' | 'reddit' | 'telegram' | 'tiktok';
};

export type Sku = {
  _id: string;
  rarity: Rarity;
  name: string;
  description: string;
  descriptionShort?: string;
  details?: string;
  display: boolean;
  supplyType: 'variable' | 'fixed'; // TODO: add more supply types
  featured: boolean;
  redeemable: boolean;
  maxSupply?: number;
  imageUrls: string[];
  graphicUrl: string; // Default image
  startDate?: Date;
  endDate?: Date;
  issuerName: string;
  issuer: Profile;
  minStartDate: Date;
  maxEndDate?: Date;
  maxBid: number; // The cheapest price a sku can be sold
  minPrice: number;
  minCurrentBid: number;
  circulatingSupply: number;
  products: CollectorProduct[];
  totalSupply: number;
  totalSupplyLeft: number;
  totalSkuSupplyLeft: number;
  totalUpcomingSupply: number;
  totalSkuListingSupplyLeft: number;
  totalSkuListingSupply?: number;
  countSkuListings: number;
  countAllSkuListings: number;
  countProductListings?: number;
  series: Series;
  category: {
    _id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  createdAt?: Date;
  updatedAt?: Date;
  royaltyFeePercentage: number;
  resaleSellersFeePercentage: number;
  sellerTransactionFeePercentage: number;
  sellerTransactionFeePercentageSecondary: number;
  type: string;
  productListings: Listing[];
  skuListings: Listing[];
  activeSkuListings: Listing[];
  upcomingProductListings: Listing[];
  upcomingSkuListings: Listing[];
  expiredSkuListings?: Listing[];
  activeProductListings: Listing[];
  soldProductListings?: Listing[];
  soldSkuListings?: Listing[];
  nftPublicAssets: FileAsset[];
  nftSocialAssets?: SocialFileAsset[];
  minSkuPrice?: number;
  customNftTerms?: string;
  initialBuyersFeePercentage: number;
  tenant?: string;
  currency?: 'USD' | 'ETH';
  activeGiveawayListingsCounter?: number;
  lowestSkuListingPrice?: number;
  lowestProductListingPrice?: number;
  minHighestBidSkuListing?: number;
  minBidAuctionsNoBidsSkuListings?: number;
  minPriceBuyNowSkuListings?: number;
  minHighestBidProductListing?: number;
  minBidAuctionsNoBidsProductListings?: number;
  minPriceBuyNowProductListings?: number;
  forSaleListingsCounter?: number;
  activeAuctionProductListingsCounter?: number;
  activeBuyNowProductListingsCounter?: number;
  activeAuctionSkuListingsCounter?: number;
  activeBuyNowSkuListingsCounter?: number;
};

export type Profile = {
  _id: string;
  createdAt: Date;
  externalId: string;
  hederaAccount: string;
  role: string;
  updatedAt: Date;
  username: string;
  profilePhotoUrl: string;
  bannerPhotoUrl?: string;
  midPhotoUrl?: string;
  descriptionIcon?: string;
  descriptionHeader?: string;
  descriptionBody?: string;
  footerPhotoUrl?: string;
  tagline: string;
  firstName?: string;
  lastName?: string;
  showNotifyMe?: boolean;
  descriptionShort?: string;
  profilePhotoUrls?: { url: string; position: string }[];
  profileTextFields?: { text: string; position: string }[];
  featuredSku?: string;
  nftSocialAssets?: SocialFileAsset[];
  templateId?: string;
};
export type SaleType = 'giveaway' | 'fixed' | 'auction';
export type Listing = {
  canceled?: boolean;
  price: number;
  product: string;
  saleType: SaleType;
  startDate: Date;
  status: 'active' | 'upcoming' | 'expired' | 'sold' | 'canceled';
  supply: number;
  supplyLeft: number;
  type: string;
  _id: string;
  endDate: Date;
  minBid?: number;
  minHighestBid?: Bid;
  issuer: Partial<Profile>;
  createdAt: Date;
  updatedAt: Date;
  auctionBidIncrement?: number;
  highestBid?: Bid;
  auctionProcess?: 'unset' | 'processing' | 'closed';
  currency: 'ETH' | 'USD'; //todo create a type currency to be used everywhere.
};

export type ListingSalePayload = {
  price: number;
  product: string;
  startDate: Date;
  type: string;
  saleType: 'fixed';
  supply: number;
  sku: Sku;
  issuer: string;
};

export type Product = {
  serialNumber?: string;
  activeProductListings?: Listing[];
  activeProductListing?: Listing;
  upcomingProductListings?: Listing[];
  upcomingProductListing?: Listing;
  expiredProductListings?: Listing[];
  soldProductListings?: Listing[];
  redeemedStatus?: 'NA' | 'pending' | 'redeemed';
  sku: Sku;
  totalSupply?: number;
  circulatingSupply?: number;
  _id: string;
  owner: Partial<User>;
  resale?: boolean;
  resaleBuyersFeePercentage?: number;
  royaltyFeePercentage?: number;
  listing: Listing;
  minSkuPrice: number;
  tokenId: string;
  explorerLink?: string;
  initialBuyersFeePercentage: number;
  minStartDate: Date;
  skuListings: Listing[];
  expiredSkuListings: Listing[];
  totalUpcomingSupply: number;
  productListings: Listing[];
  upcomingSkuListings: Listing[];
  totalSupplyLeft: number;
  activeSkuListings: Listing[];
  minPrice: number;
};

export type Cost = {
  finalPayout: number;
  initialBuyersFee: number;
  initialBuyersFeePercentage: number;
  initialSellersFee: number;
  initialSellersFeePercentage: number;
  resale: boolean;
  resaleBuyersFeePercentage: number;
  resaleSellersFeePercentage: number;
  serviceEarnings: number;
  totalCost: number;
  royaltyFee?: number;
  currency?: CurrencyType;
};

export type SupplyType = 'unique' | 'limited' | 'released';

type HederaTransaction = {
  transactionHash: string;
  transactionId: string;
  explorerLink: string;
  from: string;
  to: string;
  tokenId: string;
  status: string;
  ownerAvailableBalance: number;
};

type CircleReceipt = {
  id: string;
  type: string;
  merchantId: string;
  merchantWalletId: string;
  source: {
    id: string;
    type: string;
  };
  destination: {
    id: string;
    type: string;
  };
  description: string;
  amount: {
    amount: number;
    currency: string;
  };
  status: string;
  refunds: unknown[];
  createDate: Date;
  updateDate: Date;
  metadata: {
    phoneNumber: string;
    email: string;
  };
};

export type CircleType = 'usdc' | 'btc' | 'eth';

export type TransactionData = {
  product?: Product;
  sku: Sku;
  listing?: string;
  amount?: number;
  bid?: string;
  hederaTransaction?: HederaTransaction;
  circleReceipt?: CircleReceipt;
  buyer: {
    _id: string;
    username: string;
  };
  seller?: {
    _id: string;
    username: string;
  };
  ownerAvailableBalance?: number;
  cost: Cost;
  explorerLink?: string;
  status?: string;
  service?: string;
  deposit?: {
    id: string;
    type: string;
    circleType?: CircleType;
    amount: string;
    amountUnrated?: string;
    balanceCurrency?: CurrencyType;
    detectedTransactionHash: string | undefined;
    card?: {
      createdAt: Date;
      expMonth: number;
      expYear: number;
      fingerprint: string;
      id: string;
      last4: string;
      network: string;
      updatedAt: Date;
      _id: string;
    };
  };
  transactionHash?: string | undefined;
  withdraw?: {
    ach_number: number;
    amount: number;
    institution_id: string;
    institution_name: string;
    payout: string;
    type: string;
    usdcAddress?: string;
    institution_logo?: string;
  };
  saleType: 'fixed' | 'auction';
  mintToAddress?: string;
};

export type TransactionType =
  | 'purchase'
  | 'deposit'
  | 'sale'
  | 'royalty_fee'
  | 'withdrawal'
  | 'nft_redeem'
  | 'claim'
  | 'transfer_out'
  | 'transfer_in'
  | 'nft_mint'
  | 'nft_transfer'
  | 'nft_transfer_manual'
  | 'nft_claim_giveaway'
  | 'auction';

export type TransactionStatus = 'success' | 'error' | 'pending';

export type Transaction = {
  _id: string;
  owner: Profile;
  type: TransactionType;
  transactionData: TransactionData;
  createdAt: Date;
  updatedAt?: Date;
  status: TransactionStatus;
};

export type CollectorProduct = {
  _id: string;
  serialNumber: string;
  redeemedStatus?: 'NA' | 'pending' | 'redeemed';
  createdAt: Date;
  sku: string;
  owner: Partial<Profile>;
  activeProductListing?: Listing;
  upcomingProductListing?: Listing;
  listing?: Listing;
  tokenId?: string;
  explorerLink?: string;
  highestBid?: Bid;
};

export type Series = {
  _id: string;
  name: string;
  description: string;
  issuerId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type BidListing = {
  _id: string;
  product: Product;
  highestBid?: Bid;
  issuer: User;
  endDate: Date;
  type: 'product' | 'sku';
  sku: string;
};
export type Bid = {
  _id: string;
  status: 'active' | 'winner';
  bidAmt: number;
  createdAt: Date;
  updatedAt: Date;
  listing: BidListing;
  owner: Profile;
  sku: Sku;
};

export type StatusType = 'upcoming' | 'upcoming-soon' | 'no-sale' | 'active' | undefined;

export type Media = 'video' | 'image' | 'audio' | 'vector' | undefined;

export interface Status {
  status: StatusType;
  minStartDate?: Date;
  minPrice?: number;
  saleTypeTitle?: string;
}
