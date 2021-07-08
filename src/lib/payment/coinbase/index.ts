import { variables } from '$lib/variables';

const serviceURI = 'https://commerce.coinbase.com';

export type TransactionResult =
  | 'charge-confirmed'
  | 'charge-failed'
  | 'payment-detected'
  | 'error-not-found'
  | 'checkout-modal-closed';

export function generateUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.trunc(Math.random() * 16),
      v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

export function getServiceURI(uid: string, metadata?: string): string {
  const queryParameters: { origin: string; version: string; buttonId: string; custom?: string } = {
    origin: `${window.location.origin}/`,
    version: '1.5.2',
    buttonId: uid,
  };

  if (metadata) {
    queryParameters.custom = metadata;
  }

  const checkoutId = variables.coinbase.checkoutId;

  const query = Object.entries(queryParameters)
    .reduce((accumulator, [key, value]) => {
      accumulator.push(`${window.encodeURIComponent(key)}=${window.encodeURIComponent(value)}`);

      return accumulator;
    }, [])
    .join('&');

  return `${serviceURI}/embed/checkout/${window.encodeURIComponent(checkoutId)}?${query}`;
}

export function handleServiceMessage(
  message: { origin: string; data: { event: string; code?: string; buttonId: string } },
  uid: string,
  dispatch: (event: string, data?: string) => void
) {
  if (message?.origin !== serviceURI || message?.data?.buttonId !== uid) {
    return;
  }

  switch (message?.data?.event) {
    case 'charge_confirmed':
      dispatch('charge-confirmed', message.data.code);
      break;
    case 'charge_failed':
      dispatch('charge-failed', message.data.code);
      break;
    case 'payment_detected':
      dispatch('payment-detected', message.data.code);
      break;
    case 'checkout_modal_closed':
      dispatch('checkout-modal-closed');
      break;
  }
}
