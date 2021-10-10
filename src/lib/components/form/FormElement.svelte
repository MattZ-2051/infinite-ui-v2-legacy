<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';
  import type { SvelteComponentDev } from 'svelte/internal';
  import Input from './input/Input.svelte';
  import { getPathValue } from './form.util';

  export let name: string;
  export let component: typeof SvelteComponentDev = Input;

  const errors = getContext('errors') as Writable<unknown>;
</script>

<svelte:component this={component} {name} error={getPathValue(name, $errors)} {...$$restProps}>
  <slot />
</svelte:component>
