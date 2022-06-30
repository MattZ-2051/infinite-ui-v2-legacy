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

export async function stripeCreatePaymentIntent({
  listingId,
  fetch,
  mintToAddress,
  whitelistCode,
}: {
  listingId: string;
  fetch?: Fetch;
  mintToAddress?: string;
  whitelistCode?: string;
}) {
  return post<PaymentIntentProperties>(
    `listings/${listingId}/stripe/payment`,
    {
      mintToAddress,
      whitelistCode,
    },
    { fetch }
  );
}
