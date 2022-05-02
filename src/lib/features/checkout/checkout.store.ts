import type { Product } from '$lib/sku-item/types';
import { createStore, createEvent, createEffect, Event, Store } from 'effector';
import type { CheckoutState } from './types';
import { createPolling } from '$util/effector';
import { toast } from '$ui/toast';
import routes from '$project/routes';
import { getProductPaymentIntent, getProductTxHash } from '../product/product.api';

export const updateCheckoutState = createEvent<CheckoutState>();
export const checkoutState = createStore<CheckoutState>('loading', { name: 'checkout-state' }).on(
  updateCheckoutState,
  (_, newState) => newState
);

export const productBoughtCheckout = createEvent<{ id: string }>();
export const productId = createStore<{ id: string }>({ id: '' }, { name: 'product' }).on(
  productBoughtCheckout,
  (_, newId) => newId
);

interface Poll {
  start: Event<void>;
  stop: Event<void>;
  $isActive: Store<boolean>;
}

interface Data {
  txHash?: string;
  paymentIntent?: string;
  oldCheckout?: boolean;
}
interface ProductState {
  product: Product;
  data: Data;
  poll?: Poll;
}

export const pendingProductCreated = createEvent<Data>();

const pollProductStateFx = createEffect(async () => {
  const { txHash, paymentIntent } = productState.getState().data;
  try {
    if (txHash) {
      return await getProductTxHash(txHash);
    } else if (paymentIntent) {
      return await getProductPaymentIntent(paymentIntent);
    }
  } catch (error) {
    if (error.status === 404) {
      return;
    } else {
      throw error;
    }
  }
});

export const updateProductState = createEvent<ProductState>();
const updateData = createEvent<Data>();

export const productState = createStore<ProductState>(
  { product: undefined, data: { txHash: '', paymentIntent: '', oldCheckout: false } },
  { name: 'product-state' }
).on(updateProductState, (state, newStatus) => ({ ...state, status: newStatus }));

productState.on(updateData, (state, payload) => ({ ...state, data: payload }));

productState.on(pendingProductCreated, (_, payload) => {
  updateData(payload);
  const poll = createPolling(pollProductStateFx, 3000);
  poll.start();
  return { product: undefined, data: payload, poll };
});

pollProductStateFx.doneData.watch(async (response: Product) => {
  const oldCheckout = productState.getState().data?.oldCheckout;
  if (response) {
    updateProductState({ product: response, data: { txHash: '', paymentIntent: '', oldCheckout: false } });
    productBoughtCheckout({ id: response._id });
    updateCheckoutState('success');

    if (oldCheckout) {
      transactionSuccessMessage(response);
    }
    const poll = productState.getState().poll;
    poll.stop();
  }
});

const transactionSuccessMessage = (transactionData?: Product) => {
  const serialNumber = transactionData?.serialNumber;
  const skuName = transactionData?.name;
  const product = transactionData._id;
  toast.success(
    `Congrats! Your NFT purchase was processed successfully!` +
      (!serialNumber
        ? ` Click <a href=${routes.product(
            product
          )} class="font-bold">here</a> to view your new collectible: ${skuName}`
        : ` Click <a href=${routes.product(
            product
          )} class="font-bold">here</a> to view your new collectible: ${skuName} #${serialNumber}.`),
    { toastId: 'sku-purchase-success' }
  );
};
