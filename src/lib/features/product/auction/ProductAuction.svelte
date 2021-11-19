<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { gotoQueryParameters } from '$util/queryParameter';
  import UserLink from '$lib/components/UserLink.svelte';
  import { Pagination } from '$ui/pagination';
  import { page } from '$app/stores';
  import DateFormat from '$ui/date/DateFormat.svelte';
  import { formatCurrency, formatDate } from '$util/format';
  import { loadingBids } from './auction.api';
  import { bids, totalBids } from '../product.store';
  import NoAuction from './NoAuction.svelte';
  import { hasAuction } from '../product.service';

  export let product: Product;

  $: listing = hasAuction(product) && (product.activeProductListings?.[0] || product.upcomingProductListings?.[0]);
  $: p = +$page.query.get(`page`) || 1;

  const gotoPage = (event: CustomEvent) => {
    gotoQueryParameters(
      {
        params: { tab: 'auction', page: event.detail.value },
      },
      { noscroll: true, keepfocus: true }
    );
  };
</script>

{#if listing?.status === 'active'}
  <div class:opacity-40={$loadingBids}>
    {#if $totalBids > 0}
      <div class="pt-3">
        <div class="text-gray-500">
          {#each $bids as bid}
            <div
              class="grid-container grid grid-cols-2 gap-x-2 items-center justify-items-start w-full h-20 space-between border-b border-gray-100"
            >
              <span class="self-end font-black">
                <UserLink username={bid.owner?.username} class="font-semibold underline hover:no-underline" />
              </span>
              <div class="justify-self-end">
                Bid for <span class="text-white px-1"
                  >{formatCurrency(bid.bidAmt, { currency: product.sku.currency })}</span
                >
              </div>
              <span class="col-span-2 justify-self-end self-start text-sm text-gray-400">
                <DateFormat value={bid.createdAt} />
              </span>
            </div>
          {/each}
        </div>
      </div>
      <Pagination perPage={5} total={$totalBids} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
    {:else if $totalBids === 0 && !$loadingBids}
      <div class="no-results">No bids found</div>
    {/if}
  </div>
  <div class="text-center text-gray-500 py-6">
    Started at <span class="text-white">{formatCurrency(listing.minBid, { currency: product.sku.currency })}</span>
    on
    <span class="font-semibold text-sm whitespace-nowrap"><DateFormat value={listing.startDate} /></span>
  </div>
{:else if listing?.status === 'upcoming'}
  <div class="pt-12 no-results">
    Auction starts at {formatDate(listing.startDate)}
  </div>
{:else}
  <div class="pt-12">
    <NoAuction {product} />
  </div>
{/if}
