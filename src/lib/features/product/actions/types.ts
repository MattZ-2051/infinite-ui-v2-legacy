export type ActionType = 'redeem' | 'transfer' | 'auction' | 'create-sale' | 'cancel-sale';

export type Action = {
  type: ActionType;
  label: string;
  icon?: string;
};
