import type { Profile, Product, Sku } from '$lib/sku-item/types';
import { createEffect, createStore, createEvent, forward } from 'effector';
import { browser } from '$app/env';
import { gotoQueryParameters } from '$util/queryParameter';
import { loadProfile, loadSkus, loadProducts } from './collection.api';

export const changeTab = createEvent<'Releases' | 'NFTs'>();
export const changePage = createEvent<number>();

export const loadProfileFx = createEffect(
  async ({ username, fetch }: { username: string; fetch: Fetch }): Promise<Profile> => {
    const current = profile.getState() as Profile;
    return browser && username === current?.username ? current : await loadProfile({ username, fetch });
  }
);

// eslint-disable-next-line unicorn/no-null
export const profile = createStore<Profile>(null).on(loadProfileFx.doneData, (state, payload) => payload);

export const loadSkusFx = createEffect(
  async ({
    page,
    profileId,
    fetch,
  }: {
    page: number;
    profileId: string;
    fetch: Fetch;
  }): Promise<{
    totalSkus: number;
    skus: Sku[];
  }> => {
    return await loadSkus({ profileId, page, fetch });
  }
);

export const skus = createStore<Sku[]>([]).on(loadSkusFx.doneData, (state, payload) => payload.skus);

// eslint-disable-next-line unicorn/no-null
export const skusTotal = createStore<number>(null)
  .on(loadSkusFx.doneData, (state, payload) => payload.totalSkus)
  .on(changeTab, (state, payload) => {
    // eslint-disable-next-line unicorn/no-null
    return payload === 'Releases' ? null : state;
  });

export const loadProductsFx = createEffect(
  async ({
    page,
    profileId,
    fetch,
  }: {
    page: number;
    profileId: string;
    fetch: Fetch;
  }): Promise<{
    totalProducts: number;
    products: Product[];
  }> => {
    return await loadProducts({ profileId, page, fetch });
  }
);

export const products = createStore<Product[]>([]).on(loadProductsFx.doneData, (state, payload) => payload.products);

// eslint-disable-next-line unicorn/no-null
export const productsTotal = createStore<number>(null)
  .on(loadProductsFx.doneData, (state, payload) => payload.totalProducts)
  .on(changeTab, (state, payload) => {
    // eslint-disable-next-line unicorn/no-null
    return payload === 'NFTs' ? null : state;
  });

const changeTabfx = createEffect((parameters) => {
  gotoQueryParameters(
    {
      params: parameters,
    },
    { noscroll: true, keepfocus: true }
  );
});

forward({
  from: changeTab.map((tab) => ({
    tab,
    page: 1,
  })),
  to: changeTabfx,
});

forward({
  from: changePage.map((page) => ({
    page,
  })),
  to: changeTabfx,
});
