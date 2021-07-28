import type { User } from '$lib/user/types';
import type { FileAsset } from '$ui/file/types';

export type Rarity = 'uncommon' | 'common' | 'rare' | 'epic' | 'legendary';

export type Sku = {
  _id: string;
  rarity: Rarity;
  name: string;
  description: string;
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
  totalSupply: number;
  totalSupplyLeft: number;
  totalSkuSupplyLeft: number;
  totalSupplyUpcoming: number;
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
  nftPublicAssets: FileAsset[];
  minSkuPrice?: number;
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
  bannerPhotoUrl: string;
  midPhotoUrl: string;
  descriptionIcon: string;
  descriptionHeader: string;
  descriptionBody: string;
  footerPhotoUrl: string;
  tagline: string;
  showNotifyMe?: boolean;
};

export type Listing = {
  canceled?: boolean;
  price: number;
  product: Product;
  saleType: 'auction' | 'fixed';
  startDate: Date;
  status: 'active' | 'upcoming' | 'expired' | 'sold' | 'canceled';
  supply: number;
  supplyLeft: number;
  type: string;
  _id: string;
  endDate: Date;
  minBid?: number;
  issuer: Partial<Profile>;
  createdAt: Date;
  updatedAt: Date;
  auctionBidIncrement?: number;
  highestBid?: Bid;
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
  upcomingProductListings?: Listing[];
  expiredProductListings?: Listing[];
  soldProductListings?: Listing[];
  redeemedStatus?: 'NA' | 'pending' | 'redeemed';
  sku: Sku;
  totalSupply?: number;
  circulatingSupply?: number;
  _id: string;
  owner: Partial<User>;
  resale?: boolean;
  resaleSellersFeePercentage?: number;
  initialSellersFeePercentage?: number;
  royaltyFeePercentage?: number;
  listing: Listing;
  minSkuPrice: number;
  tokenId: string;
  explorerLink?: string;
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
};

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

type TransactionData = {
  product: Product[];
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
    amount: string;
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
  };
  saleType: 'fixed' | 'auction';
};

export type TransactionType =
  | 'deposit'
  | 'transfer'
  | 'mint'
  | 'topup'
  | 'purchase'
  | 'payment'
  | 'redeem'
  | 'sale'
  | 'nft_transfer'
  | 'withdrawal'
  | 'nft_transfer_manual'
  | 'royalty_fee'
  | 'nft_mint'
  | 'bid'
  | 'claim'
  | 'nft_redeem';

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

export type Bid = {
  _id: string;
  status: 'active' | 'winner';
  bidAmt: number;
  createdAt: Date;
  updatedAt: Date;
  listing: Listing;
  owner: Profile;
  sku: Sku;
};

export type Status = 'upcoming' | 'upcoming-soon' | 'no-sale' | 'active' | undefined;

export type Media = 'video' | 'image' | 'audio' | 'vector' | undefined;
