export interface AccountError {
  type: string;
  message: string;
  code: number;
  isError: boolean;
}

export interface AccountData {
  network: string;
  id: string;
  publicKey: string;
  privateKey?: string;
  metadata?: string;
}

export type InfiniteExtensionAccount = AccountData | AccountError | null;

export interface InfiniteExtension {
  login: (network: string) => Promise<InfiniteExtensionAccount>;
  logout: () => Promise<boolean>;
  account: InfiniteExtensionAccount;
  addAccount: (network: string, id: string, privateKey: string) => unknown;
  getTransactionSigner: () => (message: Uint8Array) => Promise<Uint8Array>;
}

export interface InfiniteExtensionState {
  extensionAvailable?: boolean;
  walletLocked?: boolean;
  loggedIn?: boolean;
  current?: AccountData;
}

export interface MirrorNodeBalanceToken {
  admin_key: { _type: string; key: string };
  symbol: string;
  token_id: string;
  type: 'FUNGIBLE_COMMON' | 'NON_FUNGIBLE_UNIQUE';
}

export interface MirrorNodeBalanceResponse {
  tokens: MirrorNodeBalanceToken[];
  links: {
    next: string | null;
  };
}

interface NftSerialData {
  account_id: string;
  created_timestamp: string;
  deleted: boolean;
  metadata: string;
  modified_timestamp: string;
  serial_number: number;
  token_id: string;
}

export interface MirrorNodeNftResponse {
  nfts: NftSerialData[];
  links: {
    next: string | null;
  };
}

export interface TransferOutResponse {
  _id: string;
  type: 'transfer_out';
  status: 'success' | 'pending' | 'error';
  owner: string;
  transactionData: {
    product: string;
    wallet: string;
    transactionHash: string;
    transactionId: string;
    from: string;
    to: string;
    tokenId: string;
    status: string;
    explorerLink: string;
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
