<script lang="ts">
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

  function getThemeClass(url: URL, _context: string[]) {
    return getMatch([`${getCurrentPage(url)}`, ..._context].filter(Boolean).join('.'));
  }

  $: style = styles({ display: !display ? 'contents' : '' });
  $: classes = clsx(getThemeClass($page.url, context), _class);
</script>

<div {style} class={classes} data-theme-context={context.join('.')} {...$$restProps}><slot /></div>

<style>
  div {
    color: var(--default-color);
    background-color: var(--bg-color);
    background-image: var(--bg-image, none);
  }
</style>
