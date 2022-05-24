import type { Product, Sku } from '$lib/sku-item/types';

export type StatusGateKeeping = 'nowViewing' | 'notOwnedYet' | 'owned' | 'buyNow' | 'soldOut';

export type GateKeepingType = 'and' | 'lineal' | 'empty';
interface Item {
  skuRequiredId: string;
  hasProduct: null | Product;
}
export interface GateKeepingResponse {
  type: GateKeepingType;
  data: Item[];
}
export interface GateKeepingSku {
  sku: Sku;
  status: StatusGateKeeping;
}

export interface RequiredSkusResponse {
  type: GateKeepingType;
  skus: GateKeepingSku[];
}
