<script lang="ts">
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

<div data-style="container" class="flex flex-col">
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
      <div class="flex">
        <div
          class="w-4 h-4  rounded-full mr-2 mt-1"
          class:legendary-badge-color={rarity === 'Legendary'}
          class:epic-badge-color={rarity === 'Epic'}
          class:rare-badge-color={rarity === 'Rare'}
          class:uncommon-badge-color={rarity === 'Uncommon'}
        />
        <span
          class:legendary-text-color={rarity === 'Legendary'}
          class:epic-text={rarity === 'Epic'}
          class:rare-text={rarity === 'Rare'}
          class:uncommon-text={rarity === 'Uncommon'}>{rarity}</span
        >
      </div>
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
  [data-style='container'] {
    --uncommon-start: #777777;
    --uncommon-end: #171717;
    --rare-start: #11d6ec;
    --rare-end: #00eb7c;
    --epic-start: #e81cff;
    --epic-end: #40c9ff;
    --legendary-start: #fff72d;
    --legendary-end: #ff9412;
  }
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
  .uncommon-badge-color {
    background: linear-gradient(45deg, #171717 0%, #777777 100%);
  }
  .uncommon-text {
    @apply text-transparent bg-clip-text bg-gradient-to-tr;
    --tw-gradient-to: var(--uncommon-start);
    --tw-gradient-from: var(--uncommon-end);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(244, 114, 182, 0));
  }
  .rare-badge-color {
    background: linear-gradient(41.72deg, #00eb7c -14.01%, #11d6ec 90.62%);
  }
  .rare-text {
    @apply text-transparent bg-clip-text bg-gradient-to-tr;
    --tw-gradient-to: var(--rare-start);
    --tw-gradient-from: var(--rare-end);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(244, 114, 182, 0));
  }
  .epic-badge-color {
    background: linear-gradient(45deg, var(--epic-end) 0%, var(--epic-start) 100%);
  }
  .epic-text {
    @apply text-transparent bg-clip-text bg-gradient-to-tr;
    --tw-gradient-to: var(--epic-start);
    --tw-gradient-from: var(--epic-end);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(244, 114, 182, 0));
  }
  .legendary-badge-color {
    background: linear-gradient(45deg, #ff9412 0%, #fff72d 98.96%);
  }
  .legendary-text-color {
    @apply text-transparent bg-clip-text bg-gradient-to-tr;
    --tw-gradient-to: var(--legendary-start);
    --tw-gradient-from: var(--legendary-end);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(244, 114, 182, 0));
  }
</style>
