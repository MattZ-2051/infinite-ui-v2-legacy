import { get } from '$lib/api';

export async function getSignedUrl() {
  const response = await get<{ moonpayUrlWithSignature: string }>('wallet/moonpay/signature');
  return response.moonpayUrlWithSignature;
}
