<script lang="ts">
  import type { Breadcrumb } from './types';
  import clsx from 'clsx';

  export let items: Breadcrumb[] = [];
  export let itemClass = '';
  export let dividerClass = '';

  const defaults: Breadcrumb = {
    disabled: false,
    href: '',
    text: '',
    class: '',
    props: {},
  };
  items = items.map((item) => ({ ...defaults, ...item, class: clsx(itemClass, item.class) }));

  let currentWidth: number;
</script>

<ul {...$$restProps} bind:clientWidth={currentWidth}>
  {#each items as item, i}
    {#if i > 0}
      <li class={dividerClass}>
        <slot name="divider">/</slot>
      </li>
    {/if}
    <li>
      <slot {item} {currentWidth}>
        {#if item.href}
          <a href={item.href} class={item.class} class:disabled={item.disabled} {...item.props}>
            {#if item.limit && item.limit > currentWidth}
              ...
            {:else}
              <slot name="link-text">{item.text}</slot>
            {/if}
          </a>
        {:else}
          <span class={item.class} class:disabled={item.disabled} {...item.props}>
            {#if item.limit && item.limit > currentWidth}
              ...
            {:else}
              <slot name="text">{item.text}</slot>
            {/if}
          </span>
        {/if}
      </slot>
    </li>
  {/each}
</ul>
