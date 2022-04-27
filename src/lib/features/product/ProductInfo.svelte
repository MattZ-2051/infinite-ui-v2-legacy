<script lang="ts">
  import copy from 'clipboard-copy';
  import { mdiContentCopy, mdiCheckCircle } from '@mdi/js';
  import type { Product, Sku, Transaction } from '$lib/sku-item/types';
  import type { StatusMintButton } from './mintButton/types';
  import { onMount } from 'svelte';
  import information from '$lib/components/icons/information';
  import { getNftTokenId } from '$lib/payment/crypto/etherscan';
  import { variables } from '$lib/variables';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import imageError from '$util/imageError';
  import { onSignIn, user, userId } from '$lib/user';
  import UserLink from '$lib/components/UserLink.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import SkuStatus from '$project/sku-item/SkuStatus.svelte';
  import ProductActions from './actions/ProductActions.svelte';
  import { transferredOut, transferInUnresolved, isOwner, getMintStatus } from './product.service';
  import MintButton from './mintButton/mintButton.svelte';
  import MintNftModal from './mint/MintNftModal.svelte';

  export let product: Product;
  export let transactions: Transaction[];

  let isShowMintModal = false;
  let sku: Sku;
  let mintStatus: StatusMintButton = 'toMint';
  let mintedNftTokenId: string;
  let nftEthAddress: string;
  let tokenCellClass = '';
  let headerTokenClass = 'pb-1';

  $: sku = product.sku;
  $: isTransferredOut = transactions.length > 0 ? transferredOut(product, transactions) : false;
  $: isTransferInUnresolved = transactions.length > 0 ? transferInUnresolved(product, transactions) : false;
  $: isProductOwner = isOwner(product, $userId);
  $: isTransactionLater = product.sku?.mintPolicy?.transaction === 'later';
  $: mintStatus = getMintStatus(product.status);
  $: mintLaterLabel = product.status === 'purchased' ? 'Owner' : 'Minted by';
  $: mintByLabel = isTransactionLater ? mintLaterLabel : 'Owned by';
  $: tokenCellClass =
    !isTransactionLater && sku?.redeemable ? 'flex flex-row  2xl:flex-col flex-row-reverse justify-end' : '';
  $: headerTokenClass = !isTransactionLater && sku?.redeemable ? 'ml-1 mt-0.5 pb-1' : 'pb-1';
  $: product.status === 'minted' && getNftId(product.tokenId);

  const MINT_OWNER_LABEL = isTransactionLater ? 'Owned by' : 'Owner';
  const cellClass = 'flex flex-col gap-1.5 py-6 px-6 overflow-hidden';
  const headerClass = 'text-gray-500 text-sm';
  const actionCellClass = 'col-span-2 2xl:col-span-1';

  let copiedLink = false;

  const onCopyLink = async () => {
    await copy(product.tokenId);
    copiedLink = true;
    setTimeout(() => {
      copiedLink = false;
    }, 5000);
  };

  const redirectToOpenSea = () => {
    const OPENSEA_URL =
      mintedNftTokenId && nftEthAddress
        ? `${variables.openSea.nftAssetUrl}${nftEthAddress}/${mintedNftTokenId}`
        : import.meta.env.VITE_OPENSEA_URL_NFT_MINTED;
    window.open(OPENSEA_URL, '_blank');
  };

  const handleChangeModalToMint = () => {
    if (!$user && product.sku?.mintPolicy?.transaction === 'later') {
      onSignIn();
    }
    isShowMintModal = true;
  };

  const getNftId = async (txHash: string) => {
    const response = await getNftTokenId(txHash);
    if (response) {
      mintedNftTokenId = response.tokenId;
      nftEthAddress = response.address;
    }
  };

  onMount(async () => {
    if (product.tokenId === 'minted') {
      getNftId(product.tokenId);
    }
  });
</script>

<div
  class="rounded-lg border border-gray-200 text-default overflow-hidden grid grid-cols-2 2xl:grid-cols-none 2xl:grid-flow-col 2xl:divide-x 2xl:divide-gray-200 flex-grow"
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
  {#if sku.redeemable}
    <div class={cellClass}>
      <div class={headerClass}>Redemption Status</div>
      <IconRedeem>
        <span class="pl-2">{product.redeemedStatus === 'redeemed' ? 'Redeemed' : 'Redeemable'}</span>
      </IconRedeem>
    </div>
  {/if}
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
        <Icon path={information} size="0.9em" tooltip="User who issued the NFT and created the assets for this NFT." />
      </div>
    </div>
    <div><TalentLink profile={sku.issuer} /></div>
  </div>
  <div class={cellClass}>
    <div class={tokenCellClass}>
      {#if sku.currency === 'ETH'}
        <div class={`${headerClass} ${headerTokenClass}`}>ERC721 Transaction</div>
        {#if mintStatus !== 'processed' && (sku?.mintPolicy?.transaction === 'later' || sku?.mintPolicy?.transaction === 'user-selected')}
          <span>Not Minted</span>
        {:else}
          <div class="flex flex-row items-center max-w-xs">
            <div class="truncate flex-1">
              <a class="link" href={product.explorerLink} target="_blank" rel="noopener noreferrer">{product.tokenId}</a
              >
            </div>
            {#if copiedLink}
              <Icon path={mdiCheckCircle} color="green" size="1em" />
            {:else}
              <Icon path={mdiContentCopy} class="opacity-70 hover:opacity-100 ml-2" size="1em" on:click={onCopyLink} />
            {/if}
          </div>
        {/if}
      {:else}
        <div class={`${headerClass} ${headerTokenClass}`}>Hedera Token</div>
        <div class="truncate">
          <a class="link" href={product.explorerLink} target="_blank" rel="noopener noreferrer">{product.tokenId}</a>
        </div>
      {/if}
    </div>
  </div>
  {#if product.sku.currency !== 'ETH' && !isTransactionLater}
    <ProductActions {product} userId={$userId} />
  {/if}
  {#if (isProductOwner && isTransactionLater) || (isTransactionLater && product.status === 'minted')}
    <div class={actionCellClass}>
      <MintButton status={mintStatus} toMint={handleChangeModalToMint} processed={redirectToOpenSea} />
    </div>
  {/if}
</div>
{#if isShowMintModal}
  <MintNftModal {product} onClose={() => (isShowMintModal = false)} />
{/if}
