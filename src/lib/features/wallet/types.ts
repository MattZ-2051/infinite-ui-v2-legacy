export interface Wallet {
  cards: CreditCard[];
  balance: {
    amount: string;
    currency: string;
  };
  kycMaxLevel: number;
  kycPending: boolean;
  kycRecords: KycRecord[];
}

export interface CreditCard {
  id: string;
  status: string;
  last4: string;
  network: string;
  expYear: number;
  expMonth: number;
  metadata: {
    phoneNumber: string;
    email: string;
  };
  fingerprint: string;
}

export interface KycRecord {
  _id: string;
  level: number;
  status: string;
  inquiryCompletedAt: string;
  inquiryId: string;
  createdAt: string;
  updatedAt: string;
}

export type BalanceInfo = {
  _id: string;
  transactionAvailableBalance: string;
  purchasesLock: string;
  depositsLock: string;
  salesLock: string;
  withdrawalsLock: string;
  bidsLock: string;
  lockedPositiveBalance: string;
  lockedNegativeBalance: string;
  lockedBalance: string;
  ccNoWithdrawablesLock: string;
  circleBalance: string;
  ccWithdrawablesLock: string;
  totalBalance: string;
};
