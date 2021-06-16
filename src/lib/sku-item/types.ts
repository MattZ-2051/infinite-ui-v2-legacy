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
  totalSupply?: number;
  circulatingSupply?: number;
};

type Cost = {
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
  sku: Sku[];
  listing: string;
  amount: number;
  bid: string;
  hederaTransaction?: HederaTransaction;
  circleReceipt?: CircleReceipt;
  buyer: {
    _id: string;
    username: string;
  };
  seller: {
    _id: string;
    username: string;
  };
  ownerAvailableBalance: number;
  cost: Cost;
  explorerLink: string;
  status: string;
  service: string;
  deposit?: {
    id: string;
    type: string;
    amount: string;
  };
  transactionHash: string | undefined;
};

export type Transaction = {
  _id: string;
  owner: Owner;
  type:
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
    | 'bid';
  transactionData: TransactionData;
  createdAt: Date;
  updatedAt: Date;
  status: 'success' | 'error' | 'pending';
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
