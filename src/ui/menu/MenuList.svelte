<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { MenuItems } from './types';

  let selfElement: HTMLElement;
  let items: { id: string; menuItemElement: HTMLElement }[] = [];
  let currenItemStore = writable<string>();
  let currentIndex = -1;
  let _class = '';
  export { _class as class };

  onMount(() => {
    selfElement.focus({ preventScroll: true });
  });

  setContext('currenItemStore', currenItemStore);
  setContext('menuItems', <MenuItems>{
    registerItem(id, menuItemElement) {
      // eslint-disable-next-line unicorn/prefer-spread
      const index = Array.from(selfElement.children).indexOf(menuItemElement);
      items.splice(index, 0, { id, menuItemElement });
      items = items;
    },
    unregisterItem(id) {
      const index = items.findIndex((item) => item.id === id);
      if (index > -1) {
        items.splice(index, 1);
        items = items;
      }
    },
  });

  function move(event: Event, moves: number) {
    event.preventDefault();
    currentIndex = (items.length + currentIndex + moves) % items.length;
    $currenItemStore = items[currentIndex].id;
  }

  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        move(event, -1);
        return;
      case 'ArrowDown':
        move(event, 1);
        return;
      default:
        return;
    }
  }
</script>

<ul
  tabindex="-1"
  bind:this={selfElement}
  on:keydown={handleKeydown}
  role="menu"
  class="flex flex-col px-4 py-2 rounded-3xl z-50 outline-none {_class}"
  {...$$restProps}
>
  <slot />
</ul>

<style>
  ul {
    background: var(--menu-background-color);
    box-shadow: 0px 0px 20px var(--menu-box-shadow-color);
  }
</style>
