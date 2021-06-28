<script lang="ts">
  export let active: boolean;

  let _class = '';
  export { _class as class };
</script>

<li on:click class:active class="cursor-pointer whitespace-nowrap transition-all ease-out duration-300 {_class || ''}">
  <span class="flex items-center justify-center">
    <slot />
  </span>
</li>

<style>
  li {
    color: var(--tab-color, #9e9e9e);
  }

  li:hover:not(.active) {
    box-shadow: inset 0 -2px var(--tab-color, #9e9e9e);
  }

  .active {
    box-shadow: inset 0 -2px var(--tab-active-border-color, #000000);
    color: var(--tab-active-color, #000000);
  }
</style>
