import type { ListingCosts, ValidETHListingData } from './types';
import { get } from '$lib/api';

export async function validETHdirectPurchase(listingId: string) {
  return await get<ValidETHListingData>(`listings/${listingId}/is-valid-direct-eth-purchase`, {});
}

export async function getCosts(listingId: string) {
  return await get<ListingCosts>(`/listings/${listingId}/stripe/costs`, {});
}
