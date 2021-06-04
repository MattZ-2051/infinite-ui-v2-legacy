<script lang="ts">
  import Rarity from '$lib/rarity/Rarity.svelte';
  import TimeDifference from './TimeDifference.svelte';

  export let img;
  export let name;
  export let rarity;
  export let title;
  export let series;
  export let serial;
  export let date;
  export let marked = true;
</script>

<div class="flex flex-col">
  <div class="w-full h-72 bg-cover card-img relative" style="background-image:url({img})">
    {#if marked}
      <div
        class="w-8 h-8 bg-white absolute top-6 right-4 rounded-full flex shadow-md hover:opacity-60 p-1.5"
      >
        <img class="" src="/redeem.png" alt="marked" />
      </div>
    {/if}
  </div>
  <div class="px-5 pt-3 pb-10 bottom-half-container rounded-b-3xl">
    <div class="flex justify-between ">
      <span class=" card-name ">{name}</span>
      <Rarity {rarity} />
    </div>
    <div class="my-5">
      <span class=" text-3xl font-light card-title">{title}</span>
    </div>
    <div class="flex justify-between mt-12 ">
      <span class="card-series">{series}</span>
      <div class=" flex items-center">
        {#if serial === 'Unique item!'}
          <img class="w-5 h-5 mr-1 " src="fire.png" alt="fire" />
        {:else}
          <span class="card-serial">Serial:</span>
        {/if}
        <span class={serial === 'Unique item!' ? 'card-uniqueitem' : 'card-serial-number'}
          >{serial}</span
        >
      </div>
    </div>
  </div>
  <div
    class="flex justify-between card-status rounded-full py-3 transform -translate-y-2/4 mx-3 whitespace-nowrap px-6 items-center"
  >
    <span class="card-status-text">Upcoming in:</span>
    <span class="text-2xl card-time-color font-light"><TimeDifference {date} /></span>
  </div>
</div>

<style>
  .bottom-half-container {
    background-color: var(--card-container-color, #ffffff);
    border: var(--bottom-border, 1px solid #ededed);
  }

  .card-name {
    color: var(--card-name-color, #9e9e9e);
  }
  .card-title {
    color: var(--card-title-color, #000000);
  }
  .card-series {
    color: var(--card-series-color, #000000);
  }
  .card-uniqueitem {
    color: #ff0000;
  }
  .card-serial {
    color: #9e9e9e;
  }
  .card-serial-number {
    color: var(--card-serial-number-color, #000000);
  }
  .card-status {
    background: var(--card-status-color, #000000);
  }
  .card-status-text {
    color: #c4c4c4;
  }
  .card-time-color {
    color: #ffffff;
  }
</style>
