import type { AchAccount } from './types';
import { createEffect, createStore } from 'effector';
import { getAchAccounts } from './account.api';

export const achAccountFetchFx = createEffect(async () => {
  return await getAchAccounts();
});

export const achAccounts = createStore<AchAccount[]>([]).on(achAccountFetchFx.doneData, (state, payload) => payload);
