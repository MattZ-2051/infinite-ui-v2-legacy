<script lang="ts">
  import { goto } from '$app/navigation';
  import Image from '$ui/image/Image.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import Circle from '$lib/features/wallet/deposit/circle-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
  import mdiClose from '$lib/features/wallet/assets/close-icon';
  import routes from '$project/routes';

  function onClose() {
    goto(routes.wallet);
  }
</script>

<div class="container flex flex-col items-center my-5 md:my-10">
  <div class="p-9 border border-gray-100 rounded-lg max-w-md w-full">
    <div class="flex justify-between pb-3">
      <div class="flex items-center gap-2 text-3xl font-medium">
        <Image src={Circle} class="flex-none w-8 h-8" /> Circle Payments
      </div>
      <div class="flex items-center justify-center">
        <button type="button" on:click={onClose} class="text-default rounded-full flex items-center justify-center "
          ><Icon path={mdiClose} /></button
        >
      </div>
    </div>
    <slot />
  </div>
</div>
