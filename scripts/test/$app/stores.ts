import { readable } from 'svelte/store';
import { noop } from 'ts-essentials';

export const page = readable({ query: { get: noop } });
