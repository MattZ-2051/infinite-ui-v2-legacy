import type { Transaction } from '$lib/sku-item/types';

export type User = {
  _id: string;
  username: string;
  email: string;
  roles: string[];
  permissions: string[];
  balance: number;
  availableBalance: number;
  createdAt: Date;
  externalId: string;
  hederaAccount: string;
  role: string;
  updatedAt: Date;
  profilePhotoUrl: string;
  bannerPhotoUrl: string;
  midPhotoUrl: string;
  descriptionIcon: string;
  descriptionHeader: string;
  descriptionBody: string;
  footerPhotoUrl: string;
  tagline: string;
  transactions?: Transaction[];
  errorMessage?: string;
  showNotifyMe?: boolean;
  auctionBidIncrement?: string;
};
