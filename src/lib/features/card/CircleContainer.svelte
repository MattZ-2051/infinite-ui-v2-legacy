<script lang="ts">
  import { mdiClose } from '@mdi/js';
  import { goto } from '$app/navigation';
  import Image from '$ui/image/Image.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import Circle from '$lib/features/wallet/deposit/circle-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
  import routes from '$project/routes';

  function onClose() {
    goto(routes.wallet);
  }
</script>

<div class="container flex flex-col items-center my-5 md:my-10">
  <div class="p-9 rounded-sm border border-gray-100 rounded-lg max-w-md">
    <div class="flex justify-between pb-3">
      <div class="flex items-center gap-2 text-xl">
        <Image src={Circle} class="flex-none w-8 h-8" /> Circle Payments
      </div>
      <div class="flex items-center justify-center">
        <button
          type="button"
          on:click={onClose}
          class="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-0.5 inline-flex items-center justify-center"
          ><Icon path={mdiClose} size="0.8" /></button
        >
      </div>
    </div>
    <slot />
  </div>
</div>
