export type SubscriptionTypesEnum = 'sku' | 'issuer';

export interface Subscription {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  user: string;
  type: SubscriptionTypesEnum;
  subId: string;
}
