<script lang="ts"></script>

<nav aria-label="Breadcrumb" {...$$restProps} on:click on:mouseover on:mouseenter on:mouseleave on:focus>
  <ol>
    <slot />
  </ol>
</nav>

<style>
  ol {
    display: flex;
    flex-wrap: wrap;
  }
</style>
