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
    { photo: '', name: 'ILONA STEPANYANTS', occupation: 'SVP, BRAND' },
    { photo: '', name: 'TRAVIS McMICHAEL III', occupation: 'SVP, CREATIVE' },
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

<div class="container  flex flex-col gap-20">
  <Intro />

  <span class="text-4xl text-center">MANAGEMENT</span>
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-12">
    {#each managementTeam as person}
      <div class="flex flex-col gap-4 items-center text-center ">
        {#if person.photo === ''}
          <div style="width:192px; height:192px;" class="bg-gray-300" />
        {:else}
          <Image src={person.photo} />
        {/if}
        <div class="flex flex-col">
          <span class="text-2xl">{person.name}</span>
          <span>{person.occupation}</span>
        </div>
      </div>
    {/each}
  </div>

  <span class="text-4xl text-center">ADVISORY TEAM</span>
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
    {#each advisoryTeam as person}
      <div class="flex flex-col gap-8 items-center text-center advisory">
        <div class="flex flex-col">
          <span class="text-2xl">{person.name}</span>
          <span style="max-width: 222px;">{person.occupation}</span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="postcss">
  @screen lg {
    .advisory:nth-child(9) {
      grid-column-start: 2;
    }
    .advisory:nth-child(10) {
      grid-column-start: 3;
    }
  }
</style>
