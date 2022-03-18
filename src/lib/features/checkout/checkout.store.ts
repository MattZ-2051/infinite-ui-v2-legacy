import type { Product } from '$lib/sku-item/types';
import { createStore, createEvent, createEffect, Event, Store } from 'effector';
import type { CheckoutState } from './types';
import { createPolling } from '$util/effector';
import { getProductVoucherCode } from '../product/product.api';

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
  skuId: string;
  voucherCode: string;
}
interface ProductState {
  product: Product;
  data: Data;
  poll?: Poll;
}

export const pendingProductCreated = createEvent<Data>();

const pollProductStateFx = createEffect(async () => {
  const { skuId, voucherCode } = productState.getState().data;
  try {
    return await getProductVoucherCode(skuId, voucherCode);
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
  { product: undefined, data: { skuId: '', voucherCode: '' } },
  { name: 'product-state' }
).on(updateProductState, (state, newStatus) => ({ ...state, status: newStatus }));

productState.on(updateData, (state, payload) => ({ ...state, data: payload }));

productState.on(pendingProductCreated, (_, payload) => {
  updateData(payload);
  const poll = createPolling(pollProductStateFx, 3000);
  poll.start();
  return { product: undefined, data: payload, poll };
});

pollProductStateFx.doneData.watch(async (response) => {
  if (response) {
    updateProductState({ product: response, data: { voucherCode: '', skuId: '' } });
    productBoughtCheckout({ id: response._id });
    updateCheckoutState('success');
    const poll = productState.getState().poll;
    poll.stop();
  }
});
