import { createStore, createEvent } from 'effector';
import type { CheckoutState } from './types';

export const updateCheckoutState = createEvent<CheckoutState>();
export const checkoutState = createStore<CheckoutState>('loading', { name: 'checkout-state' }).on(
  updateCheckoutState,
  (_, newState) => newState
);
