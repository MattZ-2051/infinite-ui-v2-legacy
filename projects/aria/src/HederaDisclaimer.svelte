<script lang="ts">
  import { mdiArrowRight } from '@mdi/js';
  import { CLIENT_COMPANY_NAME } from '$project/variables';
  import Icon from '$ui/icon/Icon.svelte';
  import hedera from '$lib/components/icons/hedera';
</script>

<div class="w-full">
  <div class="separator" />
  <div class="flex py-5 justify-between gap-2 items-center text-sm">
    <div class="flex gap-4 items-center">
      <div class="rounded-full bg-default p-3">
        <Icon path={hedera} size="0.75" color="var(--bg-color)" />
      </div>
      <span>{CLIENT_COMPANY_NAME} NFTs are minted on the Hedera Hashgraph</span>
    </div>
    <div class="flex flex-col sm:flex-row gap-2 items-center">
      <a
        href="https://aria-network.force.com/support/s/article/What-is-Hedera-Hashgraph"
        class="link text-primary text-base whitespace-nowrap"
        >Read more
      </a>
      <span class="bg-primary p-px">
        <Icon path={mdiArrowRight} size="0.9" color="var(--color)" />
      </span>
    </div>
  </div>
  <div class="separator" />
</div>
