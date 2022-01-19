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
  logedIn?: boolean;
  current?: AccountData;
}
