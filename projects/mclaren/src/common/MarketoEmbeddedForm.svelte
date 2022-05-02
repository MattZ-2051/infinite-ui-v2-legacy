<script context="module" lang="ts">
  declare const MktoForms2: {
    loadForm: (arguments: string, caller: string, length: number, name?: string) => void;
  };
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import injectScript from '$util/injectScript';

  onMount(async () => {
    await injectScript({
      url: 'https://pages.cars.mclaren.com/js/forms2/js/forms2.min.js',
      id: 'marketo-form',
    });
    MktoForms2.loadForm('https://pages.cars.mclaren.com', '796-KWN-786', 1092);
  });
</script>

<form id="mktoForm_1092" />

<style lang="postcss">
  form:global(.mktoForm button:hover) {
    color: #ffffff !important;
    background: linear-gradient(78.89deg, #ff8d1c 0%, #ff5e17 50%, #ff3414 100%);
  }
</style>
