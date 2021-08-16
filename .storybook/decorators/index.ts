import type { SvelteComponent } from 'svelte';
import _ThemeDecorator from './ThemeDecorator.svelte';

const ThemeDecorator = _ThemeDecorator as unknown as SvelteComponent;

export { ThemeDecorator };
