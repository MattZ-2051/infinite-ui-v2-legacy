import { post } from '$lib/api';

interface PaymentIntentProperties {
  client_secret: string;
  cost: {
    currency: 'USD' | 'ETH';
    finalPayout: number;
    initialBuyersFee: number;
    initialBuyersFeePercentage: number;
    initialSellersFee: number;
    initialSellersFeePercentage: number;
    resale: boolean;
    resaleBuyersFeePercentage: number;
    serviceEarnings: number;
    totalCost: number;
  };
  networkFee: {
    gas: string;
  };
  rate: {
    amount: string;
    date: string;
  };
}

export async function connectStripeAccount({
  refresh_url,
  return_url,
  fetch,
}: {
  refresh_url?: string;
  return_url?: string;
  fetch?: Fetch;
}) {
  const response = await post<{ url: string }>(`users/connect-stripe-account`, { refresh_url, return_url }, { fetch });
  return response.url;
}

export async function stripeCreatePaymentIntent({
  listingId,
  fetch,
  mintToAddress,
}: {
  listingId: string;
  fetch?: Fetch;
  mintToAddress: string;
}) {
  const response = await post<PaymentIntentProperties>(`listings/${listingId}/stripe/payment`, {
    fetch,
    mintToAddress,
  });
  return response;
}
