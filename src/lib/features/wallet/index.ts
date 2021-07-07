import type { Wallet } from './types';
import { writable } from 'svelte/store';

export const wallet = writable<Wallet>(undefined);
