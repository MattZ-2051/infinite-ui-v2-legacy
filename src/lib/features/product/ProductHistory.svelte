<script lang="ts">
  import { mdiLinkVariant } from '@mdi/js';
  import type { Transaction } from '$lib/sku-item/types';
  import Icon from '$ui/icon/Icon.svelte';
  import { gotoQueryParameters } from '$util/queryParameter';
  import DateFormat from '$ui/date/DateFormat.svelte';
  import { page } from '$app/stores';
  import { formatCurrency } from '$util/format';
  import { Pagination } from '$ui/pagination';
  import { openModal } from '$ui/modals';
  import iconAuction from '$lib/components/icons/auction';
  import UserLink from '$lib/components/UserLink.svelte';
  import AuctionHistoryModal from '$lib/features/product/auction/AuctionHistoryModal.svelte';
  import { loadingTransactions } from './product.api';
  import { product, transactions, totalTransactions } from './product.store';

  $: p = +$page.url.searchParams.get(`page`) || 1;
  const gotoPage = (event: CustomEvent) => {
    gotoQueryParameters(
      {
        params: { tab: 'history', page: event.detail.value },
      },
      { noscroll: true, keepfocus: true }
    );
  };

  const filterTransaction = (transaction: Transaction): Transaction | undefined => {
    if (transaction.type === 'nft_mint') {
      return $product.serialNumber ? transaction : undefined;
    } else {
      return transaction;
    }
  };
  $: transactionShow = $transactions.filter((transaction) => {
    return filterTransaction(transaction);
  });
  async function showAuctionHistory(listingId: string) {
    openModal(AuctionHistoryModal, {
      product: $product,
      listing: $product.soldProductListings.find((listing) => listing._id === listingId) || $product.listing,
    });
  }
</script>

<div class:opacity-40={$loadingTransactions}>
  {#if $totalTransactions > 0}
    <div class="text-default">
      {#each transactionShow as transaction}
        {#if transaction.type === 'nft_mint' && !$product.serialNumber}
          <div />
        {:else}
          <div class="highlight flex flex-wrap justify-end items-center gap-1 border-b border-gray-100 py-4">
            <div class="flex gap-3 mr-auto">
              {#if transaction.type === 'nft_mint' && !transaction.owner?.username}
                {transaction.transactionData?.mintWalletAddress}
              {:else}
                <UserLink username={transaction.owner?.username} />
              {/if}
            </div>

            <div class="flex items-center">
              <div class="flex flex-col gap-1 text-right">
                <span>
                  {#if transaction.type === 'purchase' && transaction.status === 'success'}
                    {#if transaction.transactionData.saleType === 'auction'}
                      <Icon
                        path={iconAuction}
                        class="cursor-pointer inline-flex"
                        tooltip="See bids"
                        on:click={() => showAuctionHistory(transaction.transactionData.listing)}
                      />
                      <span class="text-gray-400"> Bought at auction for </span>
                    {:else}
                      <span class="text-gray-400"> Bought for </span>
                    {/if}
                    <span class="text-default">
                      {formatCurrency(transaction.transactionData?.cost?.totalCost, {
                        currency: $product.sku.currency,
                      })}
                    </span>
                  {:else if transaction.type === 'nft_mint'}
                    {$product.serialNumber ? 'NFT Minted' : 'Minting in progress'}
                  {:else if transaction.type === 'nft_redeem'}
                    Redeemed this product
                  {:else if transaction.type === 'transfer_out'}
                    Transferred to {transaction.transactionData?.wallet}
                  {:else if transaction.type === 'transfer_in'}
                    {#if transaction.status !== 'success'}
                      <span class="capitalize">Transfer in {transaction.status}</span>
                    {:else}
                      Transferred in
                    {/if}
                  {:else}
                    Received Transfer
                  {/if}
                </span>
                <span class="text-sm text-gray-400"><DateFormat value={transaction.updatedAt} /></span>
              </div>
              <div class="w-16 flex items-center justify-center">
                {#if transaction?.transactionData?.explorerLink}
                  <a href={transaction?.transactionData?.explorerLink} target="_blank" rel="noreferrer">
                    <Icon
                      tooltip={{ content: 'View transaction' }}
                      path={mdiLinkVariant}
                      size="0.8"
                      class="w-6 justify-self-center text-gray-200 hover:text-default"
                    />
                    <span class="sr-only">View transaction</span>
                  </a>
                {:else if transaction?.transactionData?.hederaTransaction?.explorerLink}
                  <a href={transaction.transactionData.hederaTransaction.explorerLink} target="_blank" rel="noreferrer">
                    <Icon
                      tooltip={{ content: 'View transaction' }}
                      path={mdiLinkVariant}
                      size="0.8"
                      class="w-6 justify-self-center text-gray-200 hover:text-default"
                    />
                    <span class="sr-only">View transaction</span>
                  </a>
                {/if}
              </div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
    <Pagination perPage={5} total={$totalTransactions} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
  {:else if $totalTransactions === 0 && !$loadingTransactions}
    <div class="no-results">No records found</div>
  {/if}
</div>

<style lang="postcss">
  .highlight:hover {
    border-image: var(--product-history-border-hover-bg, none) 1;
  }
</style>
