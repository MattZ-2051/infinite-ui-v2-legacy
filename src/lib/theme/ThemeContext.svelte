<script lang="ts">
  import type { Page } from '@sveltejs/kit';
  import { setContext, getContext } from 'svelte';
  import { page } from '$app/stores';
  import { getMatch, getCurrentPage } from './theme.util';

  export let id = '';

  const context: string[] = [...((getContext('theme') as string[]) || []), id].filter(Boolean);
  setContext('theme', context);

  function getThemeClass(_page: Page, _context: string[]) {
    return getMatch([`${getCurrentPage(_page)}`, ..._context].filter(Boolean).join('.'));
  }
</script>

<div style="display: contents;" class={getThemeClass($page, context)} data-theme={context.join('.')}>
  <slot />
</div>
