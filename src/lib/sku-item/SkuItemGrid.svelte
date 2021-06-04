<script lang="ts">
  import SkuItem from './SkuItem.svelte';

  export let max = 0;

  const data = [
    {
      img: '/jordan.jpg',
      name: 'Jordan',
      rarity: 'Legendary',
      title: 'Long Walk',
      series: '# Series 3',
      serial: 'Unique item!',
      date: new Date(2021, 8, 23),
    },
    {
      img: '/cars_traffic.jpg',
      name: 'Car',
      rarity: 'Rare',
      title: 'Futuristic Car',
      series: '# Series 10',
      serial: 'XY786',
      date: new Date(2021, 10, 23),
    },
    {
      img: '/graffiti.jpg',
      name: 'Street Art',
      rarity: 'Epic',
      title: 'Graffiti Girl',
      series: '# Series 18',
      serial: 'HT542',
      date: new Date(2021, 7, 13),
    },
    {
      img: '/koko.jpg',
      name: 'Koko',
      rarity: 'Uncommon',
      title: 'Observe',
      series: '# Series 33',
      serial: 'FB432',
      date: new Date(2021, 7, 23),
    },
    {
      img: '/cars_traffic.jpg',
      name: 'Car',
      rarity: 'Rare',
      title: 'Futuristic Car',
      series: '# Series 10',
      serial: 'XY786',
      date: new Date(2021, 10, 23),
    },
    {
      img: '/graffiti.jpg',
      name: 'Street Art',
      rarity: 'Epic',
      title: 'Graffiti Girl',
      series: '# Series 18',
      serial: 'HT542',
      date: new Date(2021, 7, 13),
    },
    {
      img: '/koko.jpg',
      name: 'Koko',
      rarity: 'Uncommon',
      title: 'Observe',
      series: '# Series 33',
      serial: 'FB432',
      date: new Date(2021, 7, 23),
    },
    {
      img: '/jordan.jpg',
      name: 'Jordan',
      rarity: 'Legendary',
      title: 'Long Walk',
      series: '# Series 3',
      serial: 'Unique item!',
      date: new Date(2021, 8, 23),
    },
    {
      img: '/cars_traffic.jpg',
      name: 'Car',
      rarity: 'Rare',
      title: 'Futuristic Car',
      series: '# Series 10',
      serial: 'XY786',
      date: new Date(2021, 10, 23),
    },
    {
      img: '/graffiti.jpg',
      name: 'Street Art',
      rarity: 'Epic',
      title: 'Graffiti Girl',
      series: '# Series 18',
      serial: 'HT542',
      date: new Date(2021, 7, 13),
    },
    {
      img: '/koko.jpg',
      name: 'Koko',
      rarity: 'Uncommon',
      title: 'Observe',
      series: '# Series 33',
      serial: 'FB432',
      date: new Date(2021, 7, 23),
    },
  ];

  $: information = max > 0 ? data.slice(0, max) : data;
</script>

<div
  class="grid grid-cols-1 gap-2 max-w-sm mx-auto md:max-w-none md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 {$$props.class}"
>
  {#each information as info}
    <SkuItem
      img={info.img}
      name={info.name}
      rarity={info.rarity}
      title={info.title}
      series={info.series}
      serial={info.serial}
      date={info.date}
    />
  {/each}
</div>
