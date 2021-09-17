/* eslint-disable unicorn/no-null */
import type { Subscription } from '$lib/notify/types';
import type { ApiError } from '$lib/api';
import { createEffect, createStore } from 'effector';
import { mySubscription, subscribe, unsubscribe } from '$lib/notify/notify.api';
import { toast } from '$ui/toast';

export const fetchSubscriptionFx = createEffect<string, Subscription, ApiError>(mySubscription);
export const createSubscriptionFx = createEffect(subscribe);
export const deleteSubscriptionFx = createEffect(unsubscribe);

export const subscription = createStore<Subscription>(null)
  .on(fetchSubscriptionFx.doneData, (state, payload) => payload || null)
  .on(createSubscriptionFx.doneData, (state, payload) => payload)
  .on(deleteSubscriptionFx.doneData, () => null);

createSubscriptionFx.done.watch(() => {
  toast.success('You will now be notified of upcoming news from this creator.');
});
deleteSubscriptionFx.done.watch(() => {
  toast.success('You will no longer be notified of upcoming news from this creator.');
});

createSubscriptionFx.fail.watch(() => {
  toast.danger('There was a problem with your subscription.');
});
deleteSubscriptionFx.fail.watch(() => {
  toast.danger('There was a problem with your unsubscription.');
});
fetchSubscriptionFx.fail.watch(() => {
  toast.danger('Whoops, something went wrong - please try again.');
});
