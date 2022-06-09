import type { SortOption } from '$lib/sku-item/types';

export const INITIAL_SORT_OPTIONS: SortOption[] = [
  {
    name: 'Serial A to Z',
    value: 'serialNumber:asc',
  },
  {
    name: 'Serial Z to A',
    value: 'serialNumber:desc',
  },
  {
    name: 'Price high to low',
    value: 'price:desc',
  },
  {
    name: 'Price low to high',
    value: 'price:asc',
  },
];

export const INITIAL_SORT_OPTIONS_MINT_LATER: SortOption[] = [
  {
    name: 'Serial Z to A',
    value: 'serialNumber:desc',
  },
  {
    name: 'Serial A to Z',
    value: 'serialNumber:asc',
  },
  {
    name: 'Newest',
    value: 'updatedAt:desc',
  },
  {
    name: 'Oldest',
    value: 'updatedAt:asc',
  },
];

export const INITIAL_MINT_STATUS_OPTIONS: SortOption[] = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Minted',
    value: 'minted',
  },
  {
    name: 'Not minted',
    value: 'notMinted',
  },
];

export const INITIAL_SALE_TYPE_OPTIONS: SortOption[] = [
  {
    name: 'All for sale',
    value: '',
  },
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Auction Only',
    value: 'auction',
  },
  {
    name: 'Buy Now Only',
    value: 'fixed',
  },
];
