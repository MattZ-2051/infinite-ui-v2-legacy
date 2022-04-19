import type { Awaited } from 'ts-essentials';
import type { Profile, Product, Sku, SkuStatus } from '$lib/sku-item/types';
import { createEffect, createStore, createEvent, forward } from 'effector';
import { get as getStoreValue } from 'svelte/store';
import { tokenBalance, nftBalance } from '$lib/features/infinite-wallet/infinite-wallet.store';
import { tenantSettings } from '$lib/tenant/settings.store';
import { gotoQueryParameters } from '$util/queryParameter';
import { user } from '$lib/user';
import { loadSkus, loadProducts, loadFeaturedSku, loadExternalProducts } from './collection.api';

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
    profile,
    tab,
    page,
    sortBy,
    skuStatus,
  }: {
    profile: Profile;
    tab: 'Releases' | 'NFTs' | 'ExternalNFTs' | 'ExternalTokens';
    page: number;
    sortBy: string;
    forSale?: boolean;
    skuStatus?: SkuStatus;
  }): Promise<{
    totalSkus?: number;
    skus?: Sku[];
    totalProducts?: number;
    products?: Product[];
    featuredSku?: Sku;
  }> => {
    const featuredSkuPromise = profile.featuredSku
      ? loadFeaturedSku({ id: profile.featuredSku })
      : Promise.resolve(undefined);

    tab = tab || (profile.role === 'issuer' || getStoreValue(tenantSettings).skuCreationEnabled ? 'Releases' : 'NFTs');
    const forSale = tab === 'Releases' && getStoreValue(user)?._id !== profile._id;

    const parameters = {
      page,
      profileId: profile._id,
      sortBy,
      perPage: profile.role === 'issuer' ? perPageIssuer : perPageUser,
      skuStatus,
      ...(forSale && { forSale }),
    };

    // eslint-disable-next-line unicorn/prefer-switch
    if (tab === 'Releases') {
      const [{ skus, totalSkus }, featuredSku] = await Promise.all([loadSkusFx(parameters), featuredSkuPromise]);
      return { skus, totalSkus, featuredSku };
    } else if (tab === 'NFTs') {
      const [{ products, totalProducts }, featuredSku] = await Promise.all([
        loadProductsFx(parameters),
        featuredSkuPromise,
      ]);
      return { products, totalProducts, featuredSku };
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

      return { products, totalProducts };
    }
  }
);

const loadSkusFx = createEffect(
  async ({
    page,
    profileId,
    sortBy,
    perPage,
    forSale,
    skuStatus,
  }: {
    page: number;
    profileId: string;
    sortBy: string;
    perPage: number;
    forSale?: boolean;
    skuStatus: SkuStatus;
  }): Promise<{
    totalSkus: number;
    skus: Sku[];
  }> => {
    return await loadSkus({ profileId, page, sortBy, perPage, forSale, skuStatus });
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
  }: {
    page: number;
    profileId: string;
    sortBy: string;
    perPage: number;
  }): Promise<{
    totalProducts: number;
    products: Product[];
  }> => {
    return await loadProducts({ profileId, page, sortBy, perPage });
  }
);

const loadExternalProductsFx = createEffect(
  async ({
    ids,
    page,
    sortBy,
    perPage,
  }: {
    ids: string[];
    page: number;
    sortBy: string;
    perPage: number;
  }): Promise<{
    totalProducts: number;
    products: Product[];
  }> => {
    return await loadExternalProducts({ ids, page, sortBy, perPage });
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
