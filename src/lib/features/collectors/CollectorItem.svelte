<script lang="ts">
  import type { CollectorProductV2 } from '$lib/infinite-api-sdk/types';
  import { mdiAccountCircle } from '@mdi/js';
  import mdiChevronRight from '$lib/components/icons/arrow-right';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import imageError from '$util/imageError';
  import getImageElement from '$util/getImageElement';
  import routes from '$project/routes';
  import UserLink from '$lib/components/UserLink.svelte';
  import { RIGHT_ARROW_SIZE_ON_HISTORY } from '$project/variables';
  import CollectorItemStatus from './CollectorItemStatus.svelte';

  export let collector: CollectorProductV2;
  export let redeemable: boolean;
  export let currency: 'USD' | 'ETH';

  $: collectorImage = getImageElement(collector?.nftPublicAssets);
</script>

<a href={routes.product(collector._id)}>
  <div
    class="flex flex-wrap justify-end items-center gap-1 px-4 pt-4 md:px-8"
    style="background-color: var(--collector-item-bg); 
            border-bottom: var(--collector-separator-border-bottom, 1px solid); 
            border-color:var(--gray-100); 
            padding-bottom: var(--collector-separator-padding-bottom, 1rem);"
  >
    <div class="flex gap-3 md:gap-5 mr-auto items-center">
      {#if collector?.nftPublicAssets && collector?.nftPublicAssets?.length > 0 && collectorImage}
        <img
          class="w-12 h-12 object-cover rounded-md"
          src={collectorImage.url}
          alt="collector img"
          use:imageError={() => (collectorImage = undefined)}
          loading="lazy"
          style="box-shadow:0px 4px 8px 0px rgba(0, 0, 0, 0.25);"
        />
      {:else if collector?.owner?.profilePhotoUrl}
        <img
          class="w-12 h-12 rounded-full object-cover"
          src={collector.owner.profilePhotoUrl}
          alt=""
          use:imageError={() => (collector.owner.profilePhotoUrl = undefined)}
          loading="lazy"
        />
      {:else}
        <Icon path={mdiAccountCircle} size="2" />
      {/if}
      <div class="flex flex-col">
        <div class="flex items-center gap-2 collection-big-text">
          {collector?.status === 'purchased' || !collector?.serialNumber ? 'Not Minted' : `#${collector.serialNumber}`}
          {#if redeemable}
            <IconRedeem disabled={collector.redeemedStatus === 'redeemed'} size={20} />
          {/if}
          <span class="collection-small-text">
            <UserLink username={collector.owner?.username} class="sm:hidden md:block lg:hidden " />
          </span>
        </div>
        <span class="collection-small-text">
          <UserLink username={collector.owner?.username} class="text-gray-400 hidden sm:block md:hidden lg:block" />
        </span>
        <div class="flex flex-col items-start gap-1 text-left sm:hidden text-sm md:block lg:hidden">
          <CollectorItemStatus {collector} {currency} />
        </div>
      </div>
    </div>

    <div class="flex items-center gap-6 ">
      <div class="sm:flex flex-col gap-1 text-right hidden md:hidden lg:block">
        <CollectorItemStatus {collector} {currency} />
      </div>
      <Icon path={mdiChevronRight} class="justify-self-center " size={RIGHT_ARROW_SIZE_ON_HISTORY} />
    </div>
    <div
      class="separator mt-3"
      style="display: var(--collector-display-short-separator-line, none); background :var(--gray-100);"
    />
  </div></a
>

<style lang="postcss">
  .collection-big-text {
    font-size: var(--collector-list-description-big-text-size-mobile, 1rem);
  }
  .collection-small-text {
    font-size: var(--collector-list-description-small-text-size-mobile, 0.875rem);
  }

  @screen sm {
    .collection-big-text {
      font-size: var(--collector-list-description-big-text-size, 1rem);
    }
    .collection-small-text {
      font-size: var(--collector-list-description-small-text-size, 0.875rem);
    }
  }
</style>
