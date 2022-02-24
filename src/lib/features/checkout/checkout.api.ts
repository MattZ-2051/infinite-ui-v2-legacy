import type { ValidETHListingData } from './types';
import { get } from '$lib/api';

export async function validETHdirectPurchase(listingId: string) {
  return await get<ValidETHListingData>(`listings/${listingId}/is-valid-direct-eth-purchase`, {});
}
