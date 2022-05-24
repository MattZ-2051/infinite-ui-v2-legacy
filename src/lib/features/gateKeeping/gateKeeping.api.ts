import type { GateKeepingResponse, RequiredSkusResponse, StatusGateKeeping } from './types';
import { get } from '$lib/api';
import { getSkuOnly } from '../sku/sku.api';

export const checkRequiredSkus = async ({ skuId }: { skuId: string }): Promise<RequiredSkusResponse> => {
  if (skuId) {
    const { type, data } = await get<GateKeepingResponse>(`/skus/${skuId}/gate-keeping`, { fetch });
    if (type === 'empty' || data.length === 0) {
      return { type, skus: [] };
    }

    // Flag to check what's first sku to buy on lineal dependecy.
    let buyNow = false;
    const skus = await Promise.all(
      data.reverse().map(async ({ skuRequiredId: id, hasProduct }) => {
        let status: StatusGateKeeping;
        if (hasProduct) {
          status = 'owned';
        } else {
          status = (type === 'and' || !buyNow) && data.length > 1 ? 'buyNow' : 'notOwnedYet';
          buyNow = true;
        }

        const sku = await getSkuOnly({ id });

        if (!hasProduct && sku.forSaleListingsCounter === 0) {
          status = 'soldOut';
        }
        return { sku, status };
      })
    );

    return { type, skus };
  }
};
