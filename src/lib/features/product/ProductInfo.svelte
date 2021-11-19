<script lang="ts">
  import copy from 'clipboard-copy';
  import { mdiContentCopy, mdiCheckCircle } from '@mdi/js';
  import type { Product, Sku } from '$lib/sku-item/types';
  import information from '$lib/components/icons/information';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import imageError from '$util/imageError';
  import { userId } from '$lib/user';
  import UserLink from '$lib/components/UserLink.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import SkuStatus from '$project/sku-item/SkuStatus.svelte';
  import ProductActions from './actions/ProductActions.svelte';

  export let product: Product;

  let sku: Sku;
  $: sku = product.sku;

  const cellClass = 'flex flex-col gap-1.5 py-4 px-6 overflow-hidden';
  const headerClass = 'text-gray-500 text-sm';

  let copiedLink = false;

  const onCopyLink = async () => {
    await copy(product.tokenId);
    copiedLink = true;
    setTimeout(() => {
      copiedLink = false;
    }, 5000);
  };
</script>

<div
  class="rounded-lg border border-gray-200 text-white overflow-hidden grid grid-cols-2 lg:grid-cols-none lg:grid-flow-col lg:divide-x lg:divide-gray-200 flex-grow"
>
  <div class={cellClass}>
    <div class={headerClass}>Status</div>
    <SkuStatus {sku} {product} forProductStatus />
  </div>
  {#if sku.redeemable}
    <div class={cellClass}>
      <div class={headerClass}>Condition</div>
      <div class="flex gap-2">
        <IconRedeem>
          {product.redeemedStatus === 'redeemed' ? 'Redeemed' : 'Redeemable'}
        </IconRedeem>
      </div>
    </div>
  {/if}
  <div class={cellClass}>
    {#if sku.currency === 'USD'}
      <div class={headerClass}>Owner</div>
      <div>
        {#if product?.owner?.profilePhotoUrl}
          <img
            class="w-6 h-6 rounded-full object-cover inline mr-2"
            src={product.owner.profilePhotoUrl}
            alt="profilePhoto"
            use:imageError={() => (product.owner.profilePhotoUrl = undefined)}
            loading="lazy"
          />
        {/if}
        <div class="truncate inline"><UserLink username={product.owner.username} /></div>
      </div>
    {:else if sku.currency === 'ETH'}
      <div class={`${headerClass} flex justify-between`}>
        Minted by
        <div class=" rounded-full text-white bg-gray-100 w-min p-1 hover:bg-gray-300 cursor-pointer">
          <Icon
            path={information}
            size="0.9em"
            tooltip="User who purchased and minted the NFT. Go to the blockchain explorer to view the NFT and the latest wallet that owns the NFT."
          />
        </div>
      </div>
      {#if product?.owner?.profilePhotoUrl}
        <img
          class="w-6 h-6 rounded-full object-cover inline mr-2"
          src={product.owner.profilePhotoUrl}
          alt="profilePhoto"
          use:imageError={() => (product.owner.profilePhotoUrl = undefined)}
          loading="lazy"
        />
      {/if}
      <div class="truncate inline"><UserLink username={product.owner.username} /></div>
    {/if}
  </div>
  <div class={cellClass}>
    <div class={`${headerClass} flex justify-between`}>
      Created by
      <div class="rounded-full text-white bg-gray-100 w-min p-1 hover:bg-gray-300 cursor-pointer">
        <Icon
          path={information}
          size="0.9em"
          tooltip="User who issued the NFT and who was who created the assets for this NFT."
        />
      </div>
    </div>
    <div><TalentLink profile={sku.issuer} /></div>
  </div>
  <div class={cellClass}>
    {#if sku.currency === 'ETH'}
      <div class={headerClass}>ERC721 Transaction</div>
      <div class="flex flex-row items-center">
        <div class="truncate flex-1">
          <a class="link" href={product.explorerLink} target="_blank" rel="noopener noreferrer">{product.tokenId}</a>
        </div>
        {#if copiedLink}
          <Icon path={mdiCheckCircle} color="green" size="1em" />
        {:else}
          <Icon path={mdiContentCopy} class="opacity-70 hover:opacity-100 ml-2" size="1em" on:click={onCopyLink} />
        {/if}
      </div>
    {:else}
      <div class={headerClass}>Hedera Token</div>
      <div class="truncate">
        <a class="link" href={product.explorerLink} target="_blank" rel="noopener noreferrer">{product.tokenId}</a>
      </div>
    {/if}
  </div>
  {#if product.sku.currency !== 'ETH'}
    <ProductActions {product} userId={$userId} />
  {/if}
</div>
