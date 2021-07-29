export type ActionType =
  | 'redeem'
  | 'transfer'
  | 'auction'
  | 'cancel-auction'
  | 'create-sale'
  | 'cancel-sale'
  | 'transfer';

export type Action = {
  type: ActionType;
  label: string;
  icon?: string;
};
