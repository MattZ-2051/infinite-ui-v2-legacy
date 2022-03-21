import type { Product, Transaction } from '$lib/sku-item/types';

export type TabType = 'description' | 'auction' | 'history' | 'owner';

export type Tab = { id: TabType; title: string };

export interface EthMintTransaction {
  blockchainTransaction: {
    explorerLink: string;
    tokenUri: string;
    transactionHash: string;
    transactionId: string;
  };
  product: Product;
  transaction: Transaction;
}
