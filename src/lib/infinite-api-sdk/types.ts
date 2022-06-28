import type { FileAsset } from '$ui/file/types';
import type {
  SkuStatus,
  SocialFileAsset,
  SupplyType,
  Currency,
  SkuCollection,
  Series,
  SaleType,
  PurchasePolicyMetaData,
  Bid,
  ProductStatus,
} from '$lib/sku-item/types';

type SkuBaseFilterParameters = {
  category?: string;
  typeEdition?: string;
  series?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
  search?: string;
  saleType?: string;
  currency?: Currency;
  featured?: boolean;
  condition?: MarketplaceCondition;
};

export type SkuIssuedFilterParameters = SkuBaseFilterParameters & { skuStatus?: SkuStatus };

export type SkuIssuedRequestParameters = {
  sortBy?: string; // ToDO: possible values are startDate:1 startDate:-1 startDate:-1
  startId?: string;
  isReverse?: boolean;
  per_page?: number;
} & SkuIssuedFilterParameters;

export type SkuTileFilterParameters = SkuBaseFilterParameters & { issuerId?: string };

export type SkuTileRequestParameters = {
  sortBy?: string; // ToDO: possible values are startDate:1 startDate:-1 startDate:-1
  startId?: string;
  isReverse?: boolean;
  per_page?: number;
} & SkuTileFilterParameters;

export type MarketplaceCondition = 'available' | 'all' | 'sold' | 'upcoming';

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
  verfied: boolean; // added v2
};

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
  currency: Currency;
  purchasePolicy?: PurchasePolicyMetaData;
  enabledNftPurchase: boolean;
  minPriceOrBid?: number;
};

export type TileMeta = {
  countSkuListings?: number;
  countActiveAuctionListings: number;
  countActiveProductListings?: number;
  countAuctionListings?: number;
  countActiveSkuListings?: number;
  totalExpiredSkuListingsSupply?: number;
  totalSupply?: number;
  totalUpcomingSkuListingsSupply?: number;
};

// Partial Type, nowadays have the attributes needed for /v2/skus/tiles/{condition}
export type SkuV2 = {
  _id: string;
  activeAuctionProductListing?: Listing;
  activeBuyNowProductListing?: Listing;
  activeSkuListing?: Listing;
  category?: {
    _id: string;
    name: string;
    updatedAt?: Date;
    createdAt?: Date;
  };
  circulatingSupply?: number;
  currency: Currency;
  description: string;
  descriptionShort?: string;
  issuer: Profile;
  maxEndDate?: Date;
  maxSupply?: number;
  minPriceListing?: Listing;
  minStartDate?: Date;
  name: string;
  nftPublicAsset?: FileAsset;
  redeemable?: boolean;
  series?: Series;
  skuCollection?: SkuCollection;
  status?: SkuStatus;
  supplyType: SupplyType;
  tileMeta?: TileMeta;
  rejectReason?: string;
  upcomingSkuListing?: Listing;
  version: '2';
};

export type SkuV2Page = {
  count: number;
  resource: SkuV2[];
};

export type CollectorProductV2 = {
  _id: string;
  activeProductListing?: Listing;
  createdAt: Date;
  listing?: Listing;
  nftPublicAssets?: FileAsset[];
  ownedByExternalWallet?: boolean;
  owner: Partial<Profile>;
  redeemedStatus?: 'NA' | 'pending' | 'redeemed';
  serialNumber: string;
  sku: SkuV2;
  status?: ProductStatus;
  tenant?: string;
  tokenId?: string;
  upcomingProductListing?: Listing;
  updatedAt: Date;
};

export type CollectorProductV2Page = {
  count: number;
  resource: CollectorProductV2[];
};

export type CollectorProductBaseFilterParameters = {
  search?: string;
  saleType?: string;
  mintStatus?: string;
  owner?: string;
};

export type CollectorProductRequestParameters = {
  sortBy?: string;
  startId?: string;
  isReverse?: boolean;
  per_page?: number;
} & CollectorProductBaseFilterParameters;
