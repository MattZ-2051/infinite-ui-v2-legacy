import type { Awaited } from 'ts-essentials';
import type { Profile, Product, Sku } from '$lib/sku-item/types';
import { createEffect, createStore, createEvent, forward } from 'effector';
import { browser } from '$app/env';
import { gotoQueryParameters } from '$util/queryParameter';
import { loadProfile, loadSkus, loadProducts } from './collection.api';

export const changeTab = createEvent<'Releases' | 'NFTs'>();
export const changePage = createEvent<number>();
export const changeSort = createEvent<string>();
export const setCollection = createEvent<Awaited<ReturnType<typeof loadCollectionFx>>>();
export const clearCollection = createEvent();

export const perPageIssuer = 4;
export const perPageUser = 8;

export const loadCollectionFx = createEffect(
  async ({
    username,
    tab,
    page,
    sortBy,
    forSale,
    fetch,
  }: {
    username: string;
    tab: 'Releases' | 'NFTs';
    page: number;
    sortBy: string;
    forSale?: string;
    fetch: Fetch;
  }): Promise<{ profile: Profile; totalSkus?: number; skus?: Sku[]; totalProducts?: number; products?: Product[] }> => {
    const current = profile.getState() as Profile;
    const _profile = browser && username === current?.username ? current : await loadProfile({ username, fetch });

    tab = tab || (_profile.role === 'issuer' ? 'Releases' : 'NFTs');
    const parameters = {
      page,
      profileId: _profile._id,
      sortBy,
      perPage: _profile.role === 'issuer' ? perPageIssuer : perPageUser,
      forSale,
      fetch,
    };
    if (tab === 'Releases') {
      const { skus, totalSkus } = await loadSkusFx(parameters);
      return { profile: _profile, skus, totalSkus };
    } else if (tab === 'NFTs') {
      const { products, totalProducts } = await loadProductsFx(parameters);
      return { profile: _profile, products, totalProducts };
    }
  }
);

// eslint-disable-next-line unicorn/no-null
export const profile = createStore<Profile>(null)
  .on(setCollection, (state, payload) => payload.profile)
  .reset(clearCollection);

const loadSkusFx = createEffect(
  async ({
    page,
    profileId,
    sortBy,
    perPage,
    forSale,
    fetch,
  }: {
    page: number;
    profileId: string;
    sortBy: string;
    perPage: number;
    forSale?: string;
    fetch: Fetch;
  }): Promise<{
    totalSkus: number;
    skus: Sku[];
  }> => {
    return await loadSkus({ profileId, page, sortBy, perPage, fetch, forSale });
  }
);

export const skus = createStore<Sku[]>([]).on(setCollection, (state, payload) =>
  'skus' in payload ? payload.skus : state
);

// eslint-disable-next-line unicorn/no-null
export const skusTotal = createStore<number>(null)
  .on(setCollection, (state, payload) => ('totalSkus' in payload ? payload.totalSkus : state))
  .on(changeTab, (state, payload) => {
    // eslint-disable-next-line unicorn/no-null
    return payload === 'Releases' ? null : state;
  });

const loadProductsFx = createEffect(
  async ({
    page,
    profileId,
    sortBy,
    perPage,
    fetch,
  }: {
    page: number;
    profileId: string;
    sortBy: string;
    perPage: number;
    fetch: Fetch;
  }): Promise<{
    totalProducts: number;
    products: Product[];
  }> => {
    return await loadProducts({ profileId, page, sortBy, perPage, fetch });
  }
);

export const products = createStore<Product[]>([]).on(setCollection, (state, payload) =>
  'products' in payload ? payload.products : state
);

// eslint-disable-next-line unicorn/no-null
export const productsTotal = createStore<number>(null)
  .on(setCollection, (state, payload) => ('totalProducts' in payload ? payload.totalProducts : state))
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

forward({
  from: changeSort.map((sortBy) => ({
    sortBy,
  })),
  to: changeTabfx,
});
