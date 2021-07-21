<script lang="ts">
  import { mdiLinkVariant } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { gotoQueryParameters } from '$util/queryParameter';
  import DateFormat from '$ui/date/DateFormat.svelte';
  import { page } from '$app/stores';
  import { formatCurrency } from '$util/format';
  import { Pagination, PaginationVariantDark } from '$ui/pagination';
  import UserLink from '$lib/components/UserLink.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import { loadingTransactions } from './product.api';
  import { transactions, totalTransactions } from './product.store';

  $: p = +$page.query.get(`page`) || 1;

  const gotoPage = (event: CustomEvent) => {
    gotoQueryParameters(
      {
        params: { tab: 'history', page: event.detail.value },
      },
      { noscroll: true, keepfocus: true }
    );
  };
</script>

<div class:opacity-40={$loadingTransactions}>
  {#if $totalTransactions > 0}
    <div class="text-gray-500 ">
      {#each $transactions as transaction}
        <div
          class="group flex flex-wrap justify-end items-center gap-1 border-b border-gray-500 hover:border-white py-4"
        >
          <div class="flex gap-3 mr-auto">
            <UserLink username={transaction.owner?.username} class="font-black italic group-hover:text-white" />
          </div>

          <div class="flex items-center">
            <div class="flex flex-col gap-1 text-right">
              <span class="group-hover:text-white">
                {#if transaction.type === 'purchase' && transaction.status === 'success'}
                  Bought for <span class="text-white"
                    >{formatCurrency(transaction.transactionData?.cost?.totalCost)}</span
                  >
                {:else if transaction.type === 'nft_mint'}
                  NFT Minted
                {:else if transaction.type === 'nft_redeem'}
                  <IconRedeem size="0.6" class="inline mr-2" />Redeemed this product
                {:else}
                  Received Transfer
                {/if}
              </span>
              <span class="font-black italic text-sm"><DateFormat value={transaction.updatedAt} /></span>
            </div>
            <div class="w-16 flex items-center justify-center">
              {#if transaction?.transactionData?.explorerLink}
                <a href={transaction?.transactionData?.explorerLink} target="_blank" rel="noreferrer">
                  <Icon
                    tooltip={{ content: 'View transaction', theme: 'white' }}
                    path={mdiLinkVariant}
                    size="0.8"
                    class="w-6 justify-self-center group-hover:text-white"
                  />
                </a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
    <PaginationVariantDark>
      <Pagination perPage={5} total={$totalTransactions} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
    </PaginationVariantDark>
  {:else if $totalTransactions === 0 && !$loadingTransactions}
    <div class="flex justify-center items-center text-2xl text-gray-400 pt-20">No records found</div>
  {/if}
</div>
