import type { Sku } from '$lib/sku-item/types';
import type { SkuV2 } from './types';

export function isSkuV2(sku: Sku | SkuV2): sku is SkuV2 {
  return 'version' in sku && sku.version === '2';
}
