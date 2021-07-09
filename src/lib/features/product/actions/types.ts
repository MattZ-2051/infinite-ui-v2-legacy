export type ActionType = 'redeem' | 'transfer' | 'auction' | 'cancel-auction' | 'create-sale' | 'cancel-sale';

export type Action = {
  type: ActionType;
  label: string;
  icon?: string;
};
