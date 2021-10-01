<script language="ts">
  import { media } from '$lib/media-query.store';
  import SimpleAccordion from '../../landing/faq-section/SimpleAccordion.svelte';
  import { Info } from './Info';
  import emilia from './assets/emilia.png';
  import emiliaMobile from './assets/emiliaMobile.png';
  import drops from './assets/drops.png';
  import dropsMobile from './assets/dropsMobile.png';
  import ArrowDown from './assets/arrowDown.png';
  import ArrowUp from './assets/arrowUp.png';

  $: open = 0;
  let infoWithId = Info.map((element, index) => {
    return { id: index, ...element };
  });
  let width;
</script>

<svelte:window bind:innerWidth={width} />
<div class="container mt-24 mb-24 lg:mb-0">
  <div class="flex flex-col items-center">
    <div class="font-medium text-4xl sm:text-6xl text-center mb-9 max-w-4xl">The goodness exchange team</div>
    <div class="text-center mb-20 max-w-3xl font-medium">
      Aenean vel porttitor magna, vitae scelerisque ipsum. Pellentesque {#if $media.md} <br /> {/if}aliquam purus quam,
      et molestie diam aliquet eget.
    </div>
  </div>
  <div class="flex justify-center">
    <div
      style="background-color:#7852fd; min-height:500px"
      class="w-full rounded-2xl flex flex-col-reverse md:flex-row max-w-7xl"
    >
      <div
        style="max-height:35em"
        class="max-w-7xl px-6 md:px-16 py-2 md:pt-12 md:w-1/2 h-2/3 sm:h-full w-full flex flex-col justify-center "
      >
        {#each infoWithId as el}
          <SimpleAccordion
            title={el.title}
            imageClosedSource={ArrowDown}
            imageOpenedSource={ArrowUp}
            textColor="white"
            selectedColor="#FFD54E"
            active={open === el.id}
            setSelected={() => (open = el.id)}
          >
            <div>{el.text}</div>
          </SimpleAccordion>
        {/each}
      </div>
      <div class="w-full md:w-1/2 h-1/3 sm:h-full">
        <div class="h-0 w-full flex flex-1 justify-end">
          <img src={drops} alt={drops} class="relative z-20 2xl:block hidden h-24" style="left: 2em; bottom:2em" />
          <img
            src={drops}
            alt={drops}
            class="relative z-20 hidden sm:block 2xl:hidden h-20"
            style="left: 0em; bottom:2em"
          />
          <img src={dropsMobile} alt={drops} class="relative z-20 sm:hidden h-12" style=" bottom:-0.5em" />
        </div>
        <img
          src={emilia}
          srcset={emilia + ' 670w,' + emiliaMobile + ' 366w'}
          alt="emilia pic"
          class="object-cover h-full w-full md:rounded-t-none md:rounded-r-2xl rounded-t-2xl"
        />
      </div>
    </div>
  </div>
</div>
