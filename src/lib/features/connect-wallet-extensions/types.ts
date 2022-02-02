export type WalletExtension = {
  name: string;
  connected: boolean;
  login: () => void;
  logout: () => void;
  disabled: boolean;
  needsLogin: boolean;
};
