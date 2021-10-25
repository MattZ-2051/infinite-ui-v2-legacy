<script lang="ts">
  import type { Page } from '@sveltejs/kit';
  import { setContext, getContext } from 'svelte';
  import clsx from 'clsx';
  import { page } from '$app/stores';
  import { styles } from '$util/styles';
  import { getMatch, getCurrentPage } from './theme.util';

  export let id: string;
  export let display = false;

  let _class = '';
  /**
   * Extra classes.
   */
  export { _class as class };

  const context: string[] = [...((getContext('theme') as string[]) || []), id].filter(Boolean);
  setContext('theme', context);

  function getThemeClass(_page: Page, _context: string[]) {
    return getMatch([`${getCurrentPage(_page)}`, ..._context].filter(Boolean).join('.'));
  }

  $: style = styles({ display: !display ? 'contents' : '' });
  $: classes = clsx(getThemeClass($page, context), _class);
</script>

<div {style} class={classes} data-theme-context={context.join('.')} {...$$restProps}><slot /></div>

<style>
  div {
    color: var(--default-color);
    background-color: var(--bg-color);
  }
</style>
