import { post } from '$lib/api';

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

export async function stripeCreatePaymentIntent({ listingId, fetch }: { listingId: string; fetch?: Fetch }) {
  const response = await post<{ client_secret: string }>(`listings/${listingId}/stripe/payment`, { fetch });
  return response.client_secret;
}
