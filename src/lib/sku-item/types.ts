export type Sku = {
  _id: string;
  rarity: 'uncommon' | 'common' | 'rare' | 'epic' | 'legendary';
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
  issuer: Owner;
  minStartDate: Date;
  maxEndDate?: Date;
  minSkuPrice: number;
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
  countProductListings: number;
  series: {
    _id: string;
    name: string;
    description: string;
    issuerId: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
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
  type: string;
  productListings: Listing[];
  skuListings: Listing[];
  activeSkuListings: Listing[];
  upcomingProductListings: Listing[];
  upcomingSkuListings: Listing[];
  expiredSkuListings?: Listing[];
  activeProductListings: Listing[];
};

export type Owner = {
  _id: string;
  username: string;
};

export type Listing = {
  canceled?: boolean;
  price: number;
  product: string;
  saleType: string;
  startDate: Date;
  status: string;
  supply: number;
  supplyLeft: number;
  type: string;
  _id: string;
  endDate?: Date;
  minBid?: number;
};

export type Product = {
  serialNumber?: string;
  activeProductListings?: Listing[];
  upcomingProductListings?: Listing[];
  sku: Sku;
};

export type Collector = {
  _id: string;
  serialNumber: string;
  createdAt: Date;
  owner: Owner;
  activeProductListing?: Listing;
  listings?: Listing[];
  upcomingProductListing?: Listing;
};

export type Status = 'upcoming' | 'upcoming-soon' | 'no-sale' | 'active' | undefined;

export type Media = 'video' | 'image' | 'audio' | 'vector' | undefined;
