<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';
  import Input from '$lib/components/Input.svelte';
  import { getPathValue } from './form.util';

  export let name: string;
  export let label = '';
  export let before = '';
  export let after = '';
  export let value = '';
  export let placeholder = '';
  export let disabled = false;
  export let textarea = false;
  export let select = false;
  let _class = '';
  export { _class as class };

  const errors = getContext('errors') as Writable<unknown>;
</script>

<Input let:klass let:id {label} {before} {after} class={_class} error={getPathValue(name, $errors)}>
  {#if textarea}
    <textarea {id} class={klass} {name} {value} {placeholder} {disabled} {...$$restProps} />
  {:else if select}
    <select {id} class={klass} {name} {value} {placeholder} {disabled} {...$$restProps}>
      <slot />
    </select>
  {:else}
    <input {id} class={klass} {name} {value} {placeholder} {disabled} {...$$restProps} />
  {/if}
</Input>
