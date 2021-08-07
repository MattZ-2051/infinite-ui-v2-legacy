<script lang="ts"></script>

<li {...$$restProps} on:click on:mouseover on:mouseenter on:mouseleave on:focus>
  <slot />
</li>

<style>
  li {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: var(--breadcrumb-gap, 0.5rem);
  }

  li::after {
    margin-left: var(--breadcrumb-gap, 0.5rem);
    color: var(--breadcrumb-color, #161616);
    content: '/';
  }

  li:last-child::after {
    content: '';
  }
</style>
