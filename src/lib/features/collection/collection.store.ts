import type { Awaited } from 'ts-essentials';
import type { Profile, Product, Sku, SkuStatus } from '$lib/sku-item/types';
import { createEffect, createStore, createEvent, forward } from 'effector';
import { get as getStoreValue } from 'svelte/store';
import { browser } from '$app/env';
import { tokenBalance, nftBalance } from '$lib/features/infinite-wallet/infinite-wallet.store';
import { tenantSettings } from '$lib/tenant/settings.store';
import { gotoQueryParameters } from '$util/queryParameter';
import { loadProfile, loadSkus, loadProducts, loadFeaturedSku, loadExternalProducts } from './collection.api';

export const changeTab = createEvent<'Releases' | 'NFTs' | 'ExternalNFTs' | 'ExternalTokens'>();
export const changePage = createEvent<number>();
export const changeSort = createEvent<string>();
export const changeStatus = createEvent<SkuStatus>();
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
    skuStatus,
    fetch,
  }: {
    username: string;
    tab: 'Releases' | 'NFTs' | 'ExternalNFTs' | 'ExternalTokens';
    page: number;
    sortBy: string;
    forSale?: boolean;
    skuStatus?: SkuStatus;
    fetch: Fetch;
  }): Promise<{
    profile: Profile;
    totalSkus?: number;
    skus?: Sku[];
    totalProducts?: number;
    products?: Product[];
    featuredSku?: Sku;
  }> => {
    const current = profile.getState() as Profile;
    const _profile = browser && username === current?.username ? current : await loadProfile({ username, fetch });

    const featuredSkuPromise = _profile.featuredSku
      ? loadFeaturedSku({ id: _profile.featuredSku, fetch })
      : Promise.resolve(undefined);

    tab = tab || (_profile.role === 'issuer' || getStoreValue(tenantSettings).skuCreationEnabled ? 'Releases' : 'NFTs');
    const parameters = {
      page,
      profileId: _profile._id,
      sortBy,
      perPage: _profile.role === 'issuer' ? perPageIssuer : perPageUser,
      forSale: forSale || (tab === 'Releases' && skuStatus === 'approved'),
      skuStatus,
      fetch,
    };
    // eslint-disable-next-line unicorn/prefer-switch
    if (tab === 'Releases') {
      const [{ skus, totalSkus }, featuredSku] = await Promise.all([loadSkusFx(parameters), featuredSkuPromise]);
      return { profile: _profile, skus, totalSkus, featuredSku };
    } else if (tab === 'NFTs') {
      const [{ products, totalProducts }, featuredSku] = await Promise.all([
        loadProductsFx(parameters),
        featuredSkuPromise,
      ]);
      return { profile: _profile, products, totalProducts, featuredSku };
    } else if (tab === 'ExternalNFTs' || tab === 'ExternalTokens') {
      let ids: string[];
      if (tab === 'ExternalNFTs') {
        nftBalance.watch((store) => (ids = store));
      } else {
        tokenBalance.watch((store) => (ids = store));
      }

      const { products, totalProducts } = await loadExternalProductsFx({
        ...parameters,
        ids,
      });

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
    skuStatus,
    fetch,
  }: {
    page: number;
    profileId: string;
    sortBy: string;
    perPage: number;
    forSale?: boolean;
    skuStatus: SkuStatus;
    fetch: Fetch;
  }): Promise<{
    totalSkus: number;
    skus: Sku[];
  }> => {
    return await loadSkus({ profileId, page, sortBy, perPage, fetch, forSale, skuStatus });
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

const loadExternalProductsFx = createEffect(
  async ({
    ids,
    page,
    sortBy,
    perPage,
    fetch,
  }: {
    ids: string[];
    page: number;
    sortBy: string;
    perPage: number;
    fetch: Fetch;
  }): Promise<{
    totalProducts: number;
    products: Product[];
  }> => {
    return await loadExternalProducts({ ids, page, sortBy, perPage, fetch });
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
    return payload === 'NFTs' || payload === 'ExternalNFTs' || payload === 'ExternalTokens' ? null : state;
  });

// eslint-disable-next-line unicorn/no-null
export const featuredSku = createStore<Sku>(null)
  .on(setCollection, (state, payload) => ('featuredSku' in payload ? payload.featuredSku : state))
  .reset(clearCollection);

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
    page: false,
    status: '',
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
    page: false,
  })),
  to: changeTabfx,
});

forward({
  from: changeStatus.map((status) => ({
    status,
    page: false,
  })),
  to: changeTabfx,
});
