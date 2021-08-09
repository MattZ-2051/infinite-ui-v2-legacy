import type { Writable } from 'svelte/store';

export type TabItem = { id: string; title?: string; icon?: string };

export type SelectedTab = Writable<TabItem>;
