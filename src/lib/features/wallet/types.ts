export interface KycInfo {
  kycMaxLevel: number;
  kycPending: boolean;
  kycRecords: KycRecord[];
  kycRequired: boolean;
}

export interface Wallet extends KycInfo {
  cards: CreditCard[];
  balance: {
    amount: string;
    currency: string;
  };
}

export type CreditCard = {
  id: string;
  status: 'complete' | 'pending' | 'failed';
  last4: string;
  network: string;
  expYear: number;
  expMonth: number;
  metadata: {
    phoneNumber: string;
    email: string;
  };
  fingerprint: string;
  verification: {
    avs: string; // AVSCode;
    cvv: 'pending' | 'pass' | 'fail' | 'unavailable' | 'not_requested';
  };
};

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
  withdrawableBalance: string;
  totalBalance: string;
};

export type HbarTransaction = {
  depositStatus: 'pending' | 'success' | 'error';
  hbarAmount: string;
  rawTransaction: { id: string; consensusAt: Date };
};

export type HbarDeposits = {
  newTransactions: HbarTransaction[];
};

export type WalletExtended = Wallet & { balanceInfo: BalanceInfo };
