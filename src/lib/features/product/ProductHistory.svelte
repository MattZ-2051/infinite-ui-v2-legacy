<script lang="ts">
  import { mdiLinkVariant } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';

  let history = [
    {
      username: '@alessandroveronezi',
      price: '$900',
      date: 'April 14, 2021 at 7:34 am',
    },
    {
      username: '@izabellarodrigues',
      price: '$1200',
      date: 'April 14, 2021 at 7:34 am',
    },
    {
      username: '@annapadilha',
      price: '$1200',
      date: 'April 14, 2021 at 7:34 am',
    },
    {
      username: '@annapadilha',
      price: '$1200',
      date: 'April 14, 2021 at 7:34 am',
    },
    {
      username: '@katowns',
      price: '$200',
      date: 'April 14, 2021 at 7:34 am',
    },
  ];
</script>

<div class="text-gray-500">
  {#each history as item}
    <div
      class="grid-container group grid items-center justify-items-start w-full h-20 space-between border-b border-gray-800 hover:border-white"
    >
      <a href="/" class="self-end font-black italic group-hover:text-white">
        {item.username}
      </a>
      <div class="justify-self-end">
        Bought for
        <span class="text-white">{item.price}</span>
      </div>
      <Icon
        tooltip={{ content: `my tooltip: ${item.price}`, theme: 'white' }}
        path={mdiLinkVariant}
        class="row-span-2 w-6 justify-self-center group-hover:text-white"
      />
      <span class="col-span-2 justify-self-end self-start font-black italic text-sm"
        >{item.date}</span
      >
    </div>
  {/each}
</div>

<style>
  .grid-container {
    grid-template-columns: auto auto 35px;
  }
</style>
