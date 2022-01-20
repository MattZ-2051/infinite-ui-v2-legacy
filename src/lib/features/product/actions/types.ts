export type ActionType =
  | 'redeem'
  | 'transfer'
  | 'auction'
  | 'cancel-auction'
  | 'create-sale'
  | 'cancel-sale'
  | 'transfer'
  | 'transfer-in';

export type Action = {
  type: ActionType;
  label: string;
  icon?: string;
};
