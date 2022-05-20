<script lang="ts">
  import { CLIENT_COMPANY_NAME } from '$project/variables';
  import Icon from '$ui/icon/Icon.svelte';
  import ethereum from '$lib/components/icons/ethereum';
</script>

<div class="w-full">
  <div class="separator" />
  <div class="flex py-5 justify-between gap-2 items-center text-sm">
    <div class="flex gap-4 items-center">
      <div class="rounded-full p-2" style="background-color: var(--eth-disclaimer-icon-color, var(--default-color))">
        <Icon path={ethereum} size="1" color="var(--bg-color)" />
      </div>
      <span class="text-default" style="font-weight: var(--eth-disclaimer-weight, 400);"
        >This {CLIENT_COMPANY_NAME} NFT is minted on Ethereum</span
      >
    </div>
  </div>
  <div class="separator" />
</div>
