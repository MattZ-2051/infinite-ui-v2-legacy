<script lang="ts">
  import ButtonGroup from '../ButtonGroup.svelte';

  export let Component;
  export let componentClass = '';
</script>

<ButtonGroup class={componentClass}>
  <Component />
</ButtonGroup>
