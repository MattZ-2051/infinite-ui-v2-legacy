<script lang="ts">
  import copy from 'clipboard-copy';
  import { mdiContentCopy, mdiCheckCircle } from '@mdi/js';
  import type { Product, Sku, Transaction } from '$lib/sku-item/types';
  import information from '$lib/components/icons/information';
  import { variables } from '$lib/variables';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import notRedeemable from '$lib/components/icons/not-redeemable';
  import imageError from '$util/imageError';
  import { onSignIn, user, userId } from '$lib/user';
  import UserLink from '$lib/components/UserLink.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import SkuStatus from '$project/sku-item/SkuStatus.svelte';
  import ProductActions from './actions/ProductActions.svelte';
  import { transferredOut, transferInUnresolved, isOwner, getMintStatus } from './product.service';
  import MintButton from './mintButton/mintButton.svelte';
  import MintNftModal from './mint/MintNftModal.svelte';
  import { refetchProductFx, txState } from './product.store';

  export let product: Product;
  export let transactions: Transaction[];

  $: isShowMintModal = false;
  let sku: Sku;

  $: sku = product.sku;
  $: isTransferredOut = transactions.length > 0 ? transferredOut(product, transactions) : false;
  $: isTransferInUnresolved = transactions.length > 0 ? transferInUnresolved(product, transactions) : false;
  $: isProductOwner = isOwner(product, $userId);
  $: isTransactionLater = product.sku?.mintPolicy?.transaction === 'later';
  $: isTransactionUserSelect = product.sku?.mintPolicy?.transaction === 'user-selected';
  $: mintStatus = getMintStatus(product, $txState.status);
  $: mintLaterLabel = product.status === 'purchased' ? 'Owner' : 'Minted by';
  $: mintByLabel = isTransactionLater ? mintLaterLabel : 'Owned by';
  $: !product.serialNumber && product.mintingTrxHash && refetchProduct();

  const refetchProduct = async () => {
    setTimeout(async () => {
      await refetchProductFx();
    }, 8000);
  };

  const MINT_OWNER_LABEL = isTransactionLater ? 'Owned by' : 'Owner';
  const cellClass =
    'flex flex-col gap-1.5 text-sm sm:text-base py-4 px-3 sm:px-6 overflow-hidden flex-1 basis-[178px] lg:basis-[max-content] xl:basis-auto min-w-min whitespace-nowrap';
  const headerClass = 'text-gray-500 text-sm';

  let copiedLink = false;

  const onCopyLink = async () => {
    await copy(product.tokenId);
    copiedLink = true;
    setTimeout(() => {
      copiedLink = false;
    }, 5000);
  };

  const redirectToOpenSea = () => {
    const contractAddress = product?.mintingContractAddress
      ? product.mintingContractAddress
      : variables.ethNetwork.nftContractAddress;
    const OPEN_SEA_URL = product.serialNumber
      ? `${variables.openSea.nftAssetUrl}${contractAddress}/${product.serialNumber}`
      : (import.meta.env.VITE_OPENSEA_URL_NFT_MINTED as string);
    window.open(OPEN_SEA_URL as string, '_blank');
  };

  const handleChangeModalToMint = () => {
    if (!$user && product.sku?.mintPolicy?.transaction === 'later') {
      onSignIn();
    }
    if (product.status !== 'minted' || $txState.status === 'pending') {
      isShowMintModal = true;
    }
  };
</script>

<div class="rounded-lg border border-gray-200 text-default overflow-hidden">
  <div
    class="cell-block basis-0 grow-[999] min-w-min flex flex-wrap overflow-hidden divide-gray-200 divide-x divide-y -mt-1 -ml-1"
  >
    {#if !isTransactionLater}
      {#if (isTransferredOut || isTransferInUnresolved) && !isTransactionLater}
        <div class={cellClass}>
          <div class={headerClass}>Status</div>
          <div class="flex gap-2 capitalize">
            {#if isTransferredOut}
              Transferred Out
            {:else if isTransferInUnresolved}
              Transfer In {transactions[0].status}
            {/if}
          </div>
        </div>
      {:else}
        <div class={cellClass}>
          <div class={headerClass}>Status</div>
          <SkuStatus {sku} {product} forProductStatus />
        </div>
      {/if}
    {/if}
    <div class={cellClass}>
      <div class={headerClass}>Redemption Status</div>
      {#if sku?.redeemable}
        <IconRedeem>
          <span class="pl-2 block truncate">{product.redeemedStatus === 'redeemed' ? 'Redeemed' : 'Redeemable'}</span>
        </IconRedeem>
      {:else}
        <div class="truncate">
          <Icon path={notRedeemable} class="float-left" /><span>Not Redeemable</span>
        </div>
      {/if}
    </div>
    <div class={cellClass}>
      {#if sku.currency === 'USD'}
        <div class={headerClass}>{MINT_OWNER_LABEL}</div>
        <div class="flex flex-row">
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
          {mintByLabel}
          <div class="rounded-full text-white bg-gray-100 w-min p-1 hover:bg-gray-300 cursor-pointer ml-2">
            <Icon
              path={information}
              size="0.9em"
              tooltip="User who purchased and minted the NFT. Go to the blockchain explorer to view the NFT and the latest wallet that owns the NFT."
            />
          </div>
        </div>
        <div class="flex flex-row">
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
      {/if}
    </div>
    <div class={cellClass}>
      <div class={`${headerClass} flex justify-between`}>
        Created by
        <div class="rounded-full text-white bg-gray-100 w-min p-1 hover:bg-gray-300 cursor-pointer ml-2">
          <Icon
            path={information}
            size="0.9em"
            tooltip="User who issued the NFT and created the assets for this NFT."
          />
        </div>
      </div>
      <TalentLink profile={sku.issuer} />
    </div>
    <div class={`${cellClass} token-cell`} style="">
      {#if sku.currency === 'ETH'}
        <div class={`${headerClass}`}>ERC721 Transaction</div>
        {#if mintStatus !== 'processed' && (sku?.mintPolicy?.transaction === 'later' || sku?.mintPolicy?.transaction === 'user-selected')}
          <span>Not Minted</span>
        {:else}
          <div class="flex items-center gap-2 whitespace-nowrap">
            <a
              class="truncate min-w-0 max-w-[6rem] lg:max-w-[8rem]"
              href={product.explorerLink}
              target="_blank"
              rel="noopener noreferrer">{product.tokenId}</a
            >
            {#if copiedLink}
              <Icon path={mdiCheckCircle} color="green" size="1em" class="shrink-0" />
            {:else}
              <Icon
                path={mdiContentCopy}
                class="opacity-70 hover:opacity-100 shrink-0"
                size="1em"
                on:click={onCopyLink}
              />
            {/if}
          </div>
        {/if}
      {:else}
        <div class={`${headerClass}`}>Hedera Token</div>
        <div class="truncate">
          <a class="link" href={product.explorerLink} target="_blank" rel="noopener noreferrer">{product.tokenId}</a>
        </div>
      {/if}
    </div>
    {#if isProductOwner && product.sku.currency !== 'ETH' && !isTransactionLater}
      <div class="action-cell">
        <ProductActions {product} userId={$userId} />
      </div>
    {/if}
    {#if (isProductOwner && isTransactionLater) || (isTransactionLater && product.status === 'minted') || (isTransactionUserSelect && (product.status === 'purchased' || product.status === 'minted' || $txState.status === 'pending'))}
      <div class="action-cell">
        <MintButton status={mintStatus} toMint={handleChangeModalToMint} processed={redirectToOpenSea} />
      </div>
    {/if}
  </div>
</div>
{#if isShowMintModal}
  <MintNftModal {product} onClose={() => (isShowMintModal = false)} />
{/if}

<style lang="postcss">
  .token-cell:nth-of-type(odd) {
    @apply flex flex-wrap flex-grow flex-shrink flex-row-reverse xl:flex-col justify-end xl:justify-start;
    flex-basis: calc((850px - 100%) * 999);
  }
  .action-cell {
    flex-grow: 1;
    min-width: fit-content;
  }
  .action-cell:nth-of-type(odd) {
    flex-basis: calc((850px - 100%) * 999);
  }

  @screen 2xl {
    .token-cell:nth-of-type(odd),
    .action-cell:nth-of-type(odd) {
      flex-basis: auto;
    }
  }
</style>
