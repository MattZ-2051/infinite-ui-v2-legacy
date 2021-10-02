export type NewListing = {
  _id: string;
  auctionBidIncrement: number;
  auctionProcess: string;
  canceled: boolean;
  type: 'product';
  issuer: string;
  product: string;
  saleType: 'auction';
  startDate: string;
  endDate: string;
  minBid: number;
  sku: string;
  supply: number;
  createdAt: string;
  updatedAt: string;
};

export type NewAuction = {
  startDate: Date;
  endDate: Date;
  price: number;
  startImmediately: boolean;
};
