<script lang="ts">
  import Icon from '$ui/icon/Icon.svelte';
  import caretRight from '$project/assets/lib/caret-right';
  import Divider from '../common/Divider.svelte';

  type Step = {
    title: string;
    description: string;
  };
  type Phase = {
    addPrefix?: boolean;
    title: string;
    description?: string;
    steps: Step[];
  };

  const phases: Phase[] = [
    {
      title: 'Community Launch',
      steps: [
        {
          title: 'Discord',
          description: 'McLaren Automotive Discord channel launched.',
        },
        {
          title: 'Launch',
          description:
            'McLaren Automotive’s first NFT collection is launched through an invite-only mint. NFT holders are granted Category One membership to the MSO LAB community.',
        },
        {
          title: 'Members room',
          description:
            'MSO LAB members-only room launched on the McLaren Automotive Discord channel, providing unique access to McLaren Automotive teams and discussions.',
        },
      ],
    },
    {
      title: 'Exclusive Rewards',
      steps: [
        {
          title: 'Digital Sketch Drop',
          description:
            'Digital sketches illustrating the design process will be dropped to all first-generation owners of the NFT Collection.',
        },
        {
          title: 'Members-only Airdrop',
          description:
            'A limited number of tickets to exclusive McLaren events will be airdropped to selected active members of the MSO LAB community.',
        },
        {
          title: 'Virtual Tour',
          description: 'A behind-the-scenes virtual tour of McLaren HQ, led by some of the McLaren team.',
        },
      ],
    },
    {
      title: 'Pinnacle Drop',
      steps: [
        {
          title: 'Pinnacle Drop',
          description:
            'The first McLaren Automotive pinnacle drop  will be launched with a groundbreaking one-of-one MSO LAB NFT mint. MSO LAB members will receive early intel and exclusive access to a Q&A with the design team.',
        },
        {
          title: 'Allowlist',
          description: 'Allowlist for early access to all future McLaren Automotive collections and collaborations.',
        },
      ],
    },
    {
      title: 'Into The Future',
      steps: [
        {
          title: 'Future Access',
          description:
            'Exclusive member airdrops and exclusive access to physical and digital McLaren events and experiences.',
        },
        {
          title: 'Metaverse Integration',
          description: 'Integration into existing and evolving metaverse platforms.',
        },
      ],
    },
    {
      addPrefix: true,
      title: 'Roadmap 2.0',
      description: 'A fully defined calendar of digital and physical events and experiences.',
      steps: [],
    },
  ];

  $: selectedPhase = phases[0];
  $: selectedPhaseIndex = `0${phases.findIndex((phase) => phase.title === selectedPhase.title) + 1}`;
  $: selectedStep = phases[0].steps[0];

  let navWrapper: HTMLElement;
  let phaseBlock: HTMLElement;
  let isAutoScrolling = false;

  function onScrollPhases(target: EventTarget & HTMLElement) {
    const listElements = target.querySelectorAll('li');
    const phaseBlockStart = phaseBlock.getBoundingClientRect().left;

    // eslint-disable-next-line unicorn/no-array-for-each
    listElements.forEach((element, index) => {
      const { left, width, right } = element.getBoundingClientRect();
      if (left - phaseBlockStart <= width * 0.5 && right - phaseBlockStart > width * 0.5 && !isAutoScrolling) {
        selectedPhase = phases[index];
        selectedStep =
          selectedPhase.steps?.length > 0
            ? (selectedStep = selectedPhase.steps[0])
            : (selectedStep = { title: '', description: '' });
      }
    });
  }

  function onSelectPhase(phase: Phase, target: EventTarget & HTMLElement) {
    const autoScrollHandler = () => {
      if (Math.round(target.getBoundingClientRect().left) === phaseBlock.getBoundingClientRect().left) {
        target.removeEventListener('scroll', autoScrollHandler);
        isAutoScrolling = false;
      }
    };

    navWrapper.scrollBy({
      left: target.getBoundingClientRect().left - phaseBlock.getBoundingClientRect().left,
      behavior: 'smooth',
    });
    selectedPhase = phase;
    selectedStep =
      selectedPhase.steps?.length > 0
        ? (selectedStep = selectedPhase.steps[0])
        : (selectedStep = { title: '', description: '' });

    isAutoScrolling = true;
    navWrapper.addEventListener('scroll', autoScrollHandler);
  }
</script>

<section class="my-72">
  <h2
    class="uppercase text-center text-[32px] md:text-5xl font-light second-font flex flex-col justify-center tracking-widest mb-8 relative"
  >
    <span class="text-base md:text-lg tracking-[0.2em] mb-2 md:mb-1 font-normal">The Mso Lab </span>
    <span class="px-6">Community Roadmap 1.0 </span>
    <Divider class="max-w-full absolute bottom-0" />
  </h2>
  <p class="text-left sm:text-center font-light text-gray-800 container mx-auto max-w-5xl leading-7">
    McLaren Automotive has always been a family, providing unparalleled access to the pinnacle of independent British
    design, engineering and experience. Our community will build on these foundations, beginning with MSO LAB. The
    utility we create will evolve and grow as we explore the possibilities of the Web3 era, harnessing new and
    innovative ways to push the boundaries of access, ownership and experience.
  </p>
  <article
    bind:this={phaseBlock}
    class="phase-block rounded-3xl shadow-[0_40px_80px_rgba(0, 0, 0, 0.3)] flex flex-col lg:flex-row lg:flex-nowrap items-center mt-8 mb-16 mx-6 lg:mx-auto max-w-screen-lg min-h-fit"
  >
    <h3
      class="text-[10rem] sm:text-[13.75rem] leading-none flex-[1_1_fit-content] lg:flex-grow-0 text-center second-font font-light tracking-widest m-8 sm:my-20 sm:mx-8"
    >
      {selectedPhaseIndex}
    </h3>
    <div
      class="flex flex-col items-center md:items-start min-h-[11rem] py-2 space-y-6 sm:space-y-3 mx-8 sm:mx-12 lg:mx-0 mb-20 lg:mb-0 px-8 lg:px-0 w-full"
    >
      <h4 class="tracking-[0.2em] text-lg second-font text-center">
        {#if selectedPhase.addPrefix}
          <span>McLAREN</span>
        {/if}
        <span class="uppercase">{selectedStep.title || selectedPhase.title}</span>
      </h4>

      <p class="flex-grow text-gray-800 leading-7">{selectedStep.description || selectedPhase.description}</p>
      <ol class="steps-list list-inside flex space-x-6 lg:space-x-3">
        {#each selectedPhase.steps as step, index}
          <li
            class="second-font text-xl md:text-[0.8125rem] uppercase tracking-[.2em] opacity-30 hover:opacity-100 min-w-max block cursor-pointer leading-none"
            class:highlighted={selectedStep.title === step.title}
            on:click={() => (selectedStep = step)}
          >
            <span class="mr-3 hidden md:inline max-w-fit whitespace-nowrap">{step.title}</span>
            {#if index !== 2}
              <Icon path={caretRight} size="1em" class="ml-6 md:ml-0 pb-[2px] inline-block max-w-fit" />
            {/if}
          </li>
        {/each}
      </ol>
    </div>
  </article>
  <div
    class="nav-overlay relative after:pointer-events-none after:absolute after:h-full after:top-0 after:left-0 after:right-0 after:bottom-0"
  >
    <div
      bind:this={navWrapper}
      on:scroll={({ currentTarget }) => onScrollPhases(currentTarget)}
      class="nav-wrapper overflow-scroll"
    >
      <nav
        class="second-font tracking-widest sm:tracking-[0.2em] text-default text-lg sm:text-xl overflow-visible ml-6 lg:mx-auto max-w-full lg:max-w-screen-lg"
      >
        <ol class="flex flex-row space-x-8 sm:space-x-16 relative left-0" style="width: calc(100vw + 1024px)">
          {#each phases as phase}
            <li
              class="relative min-w-max cursor-pointer opacity-30 hover:opacity-100 transition-opacity duration-500 before:block before:border-b before:pb-3 before:mb-3 before:w-full"
              class:active-phase={selectedPhase.title === phase.title}
              on:click={({ currentTarget }) => onSelectPhase(phase, currentTarget)}
            >
              {#if phase.addPrefix}
                <span>McLAREN</span>
              {/if}
              <span class="uppercase text-base">{phase.title}</span>
            </li>
          {/each}
        </ol>
      </nav>
    </div>
  </div>
</section>

<style lang="postcss">
  .steps-list {
    counter-reset: steps;
  }
  .steps-list li {
    display: inline-block;
  }

  .steps-list li::before {
    counter-increment: steps;
    content: counter(steps, upper-roman);
    display: inline;
    max-width: fit-content;
  }

  @screen md {
    .steps-list li::before {
      content: counter(steps, upper-roman) '.';
      margin-right: 0.25rem;
    }
  }

  nav ol {
    counter-reset: phases;
  }
  nav li::before {
    counter-increment: phases;
    content: '0' counter(phases);
    border-image: linear-gradient(91.92deg, #c8d0d5 9.5%, rgba(200, 208, 213, 0.4) 100%) 1;
  }

  .active-phase {
    opacity: 1;
  }
  .active-phase::before {
    border-image: linear-gradient(78.37deg, #ff8d1c 0%, #ff5e17 44.52%, rgba(255, 52, 20, 0) 89.04%) 2;
  }

  .phase-block {
    background-image: linear-gradient(116.17deg, #212121 9.28%, rgba(33, 33, 33, 0) 100%);
  }

  .nav-wrapper {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }
  .nav-wrapper::-webkit-scrollbar {
    display: none;
  }

  .nav-overlay::after {
    background-image: linear-gradient(
      90deg,
      rgb(0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 5%,
      rgba(0, 0, 0, 0) 85%,
      rgb(0, 0, 0) 100%
    );
  }

  .highlighted {
    --icons-fill: url(#mclarenOrangeChevron);
    @apply text-transparent bg-clip-text;
    background-image: linear-gradient(78.89deg, #ff8d1c 0%, #ff5e17 50%, #ff3414 100%);
    opacity: 1;
    display: inline-block;
  }
</style>
