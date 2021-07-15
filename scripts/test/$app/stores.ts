import { readable } from 'svelte/store';

export const page = readable({ query: { get: jest.fn() } });
