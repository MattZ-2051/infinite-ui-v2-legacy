<script lang="ts">
  import { Modal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';
  import routes from '$project/routes';

  export let isOpen;
</script>

{#if isOpen}
  <Modal title="Yeah! Funds added.">
    <div class="flex flex-col justify-center items-center gap-4 mt-2 text-base max-w-sm text-center py-4 px-10 m-auto">
      <div class="text-gray-500 text-base">
        Check your open tabs to refresh your previous screen to see your added funds<br />
        or
      </div>
      <div class="flex flex-col gap-4">
        <Button variant="brand" href={routes.marketplace}>Go to Marketplace</Button>
        <Button href={routes.wallet}>View Wallet</Button>
      </div>
    </div>
  </Modal>
{/if}
