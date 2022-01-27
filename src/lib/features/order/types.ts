import type { SvelteComponent } from 'svelte';
import type { Cost, Product, TransactionStatus, TransactionType } from '$lib/sku-item/types';

export type TransactionData = {
  sku: string;
  listing: string;
  cost: Cost;
  issuer: string;
  buyer: string;
  seller: string;
  purchaseLogId: string;
};

export type SkuPurchaseTransaction = {
  _id: string;
  type: TransactionType;
  owner: string;
  transactionData: TransactionData;
  status: TransactionStatus;
  errorLog: unknown;
  product?: Product;
};

export type OrderFlowStep = {
  modal: typeof SvelteComponent | undefined;
  options: Record<string, unknown> | undefined;
};

export type ValidETHListingData = {
  cost: ETHListingCosts;
  externalPurchaseAddressEth: string;
};

export type ETHListingCosts = {
  currency: string;
  finalPayout: number;
  initialBuyersFee: number;
  initialBuyersFeePercentage: number;
  initialSellersFee: number;
  initialSellersFeePercentage: number;
  resale: boolean;
  resaleBuyersFeePercentage: number;
  serviceEarnings: number;
  totalCost: number;
};
