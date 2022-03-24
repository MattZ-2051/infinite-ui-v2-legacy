<script>
  export let checked = false;
</script>

<label class="switch">
  <input type="checkbox" bind:checked />
  <span class="slider" />
</label>

<style lang="postcss">
  .switch {
    @apply border border-gray-200;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 40px;
    height: 24px;
  }

  .switch > input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--inverse-color);
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    transition: 0.4s;
    background-color: var(--gray-200);
  }

  input:checked + .slider:before {
    background-color: var(--default-color);
  }

  input:checked + .slider:before {
    transform: translateX(16px);
  }
</style>
