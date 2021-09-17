import type { Subscription, SubscriptionTypesEnum } from './types';
import { post, del, getPage } from '$lib/api';

export async function subscribe(subId: string) {
  return await post<Subscription>('subscriptions', { subId });
}

async function mySubscriptions(
  page: number,
  perPage: number,
  filter: { type?: SubscriptionTypesEnum; subId?: string } = {}
) {
  const { data, total } = await getPage<Subscription>('subscriptions/me', {
    params: {
      page: page.toString(10),
      per_page: perPage.toString(10),
      filter: JSON.stringify(filter),
    },
  });
  return { data, total };
}

export async function mySubscription(subId: string) {
  const { data } = await mySubscriptions(1, 1, { subId });
  return data[0];
}

export async function unsubscribe(id: string) {
  return await del<Subscription>(`subscriptions/${id}`);
}
