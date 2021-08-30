<script lang="ts">
  import Image from '$ui/image/Image.svelte';
  import Intro from './Intro.svelte';
  import darren from './assets/darren.png?w=192&format=avif;webp;png&metadata';
  import rebecca from './assets/rebecca.png?w=192&format=avif;webp;png&metadata';
  import nadine from './assets/nadine.png?w=192&format=avif;webp;png&metadata';
  import evan from './assets/evan.png?w=192&format=avif;webp;png&metadata';
  import jimmy from './assets/jimmy.png?w=192&format=avif;webp;png&metadata';

  const managementTeam = [
    { photo: darren, name: 'DARREN MAN', occupation: 'CO-CEO' },
    { photo: rebecca, name: 'REBECCA JONAH', occupation: 'CO-CEO' },
    { photo: nadine, name: 'NADINE DIETZ', occupation: 'CHIEF MARKETING & STRATEGY OFFICER' },
    { photo: evan, name: 'EVAN GREENE', occupation: 'CCO' },
    { photo: jimmy, name: 'JIMMY NGUYEN', occupation: 'SVP, GROWTH' },
  ];

  const advisoryTeam = [
    { name: 'DAVID BELL', occupation: 'Former CEO/Chairman Interpublic Group' },
    {
      name: 'TOM HARRISON',
      occupation: "Former CEO/Chairman, Diversified Agency Services (DAS), Omnicom Group's largest division",
    },
    {
      name: 'RAJA RAJAMANNAR',
      occupation: 'Current Mastercard CMO, President Healthcare; President World Federation of Advertisers',
    },
    {
      name: 'MICHAEL LYNCH',
      occupation: '17 year Visa exec; leg global sports sponsorships (Olympics, World Cup, NFL, NASCAR, MLB)',
    },
    {
      name: 'AMY JO SMITH',
      occupation: 'CEO Digital Entertainment Group (DEG), the leading trade group for the digital media industry',
    },
    {
      name: 'RODERT D. JORDAN',
      occupation: '30+ year sports industry consultant to teams, venues (Met Life Stadium) and owners',
    },
    {
      name: 'RANDALL BEARD',
      occupation: 'Former President Nielsen, former CMO of American Expresss, P&G (Americas/China)',
    },
    {
      name: 'DANNY KAYE',
      occupation: "Led 20th Century Fox's Worldwide Research/Tech Strategy and founded Fox's Innovation Lab",
    },
    {
      name: 'TOM HUDSON',
      occupation: "25+ year IBM veteran, led IBM's largest businesses; co-founded IBM Services division",
    },
    {
      name: 'JEREMY CAGE',
      occupation: 'Former CMO of $32 billion Global Snacks Group PepsiCo and PepsiCo International Foods',
    },
  ];
</script>

<div class="mt-10">
  <Intro />
</div>

<div class="container flex flex-col gap-16 md:gap-24 py-20">
  <div class="flex flex-col gap-8 md:gap-20">
    <div class="flex justify-center"><h1 class="text-4xl font-bold">LEADERSHIP</h1></div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-12 max-w-5xl mx-auto">
      {#each managementTeam as person}
        <div class="flex flex-col gap-4 items-center text-center">
          <div class="gradient-border ">
            <Image src={person.photo} />
          </div>
          <div class="flex flex-col">
            <span class="text-xl md:text-2xl">{person.name}</span>
            <span class="text-sm md:text-base">{person.occupation}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-14 md:gap-20 ">
    <div class="flex justify-center"><h1 class="text-4xl font-bold">ADVISORY TEAM</h1></div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-12">
      {#each advisoryTeam as person}
        <div class="flex flex-col gap-8 items-center text-center advisory">
          <div class="flex flex-col">
            <span class="md:text-2xl text-xl">{person.name}</span>
            <span style="max-width: 222px;" class="text-sm md:text-base">{person.occupation}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="postcss">
  @screen md {
    .advisory:nth-child(9) {
      grid-column-start: 2;
    }
    .advisory:nth-child(10) {
      grid-column-start: 3;
    }
  }

  h1 {
    background: linear-gradient(88.12deg, #76faf3 14.15%, #8f13ff 116.49%);
    @apply text-transparent bg-clip-text;
  }

  .gradient-border {
    border-width: 4px;
    border-image: linear-gradient(45deg, #76faf3, #8f13ff);
    border-image-slice: 1;
  }
</style>
