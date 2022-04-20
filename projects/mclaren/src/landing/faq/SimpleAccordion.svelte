<script>
  import { blur, slide } from 'svelte/transition';
  import { media } from '$lib/media-query.store';
  import Icon from '$ui/icon/Icon.svelte';
  import arrowDown from '$project/assets/lib/chevron-down';

  export let title;
  export let textColor = 'black';
  export let selectedColor = 'black';
  export let active = false;
  export let setSelected = undefined;
  export let underlined = true;

  const handleOpen = () => {
    if (setSelected) {
      active = !active;
      setSelected();
    }

    if (!setSelected) active = !active;
  };
</script>

<div
  class={(underlined ? 'border-b-2 ' : '') + 'cursor-pointer pb-8 border-black-100 mb-8 text-black-opacity-10'}
  on:click={handleOpen}
>
  <div style="color:{textColor};">
    <div class="flex justify-between items-center" style="color:{active ? selectedColor : textColor}">
      <div class="text-2xl lg:text-[38px] font-light pr-2 second-font text-white">{title}</div>
      <div class={`${active ? 'arrow-down' : 'arrow-base'}`}>
        <Icon path={arrowDown} size={$media.md ? 1.3 : 1} class="text-white" />
      </div>
    </div>
    {#if active}
      <div class="mt-6" transition:slide={{ duration: 300 }}>
        <div class="pt-2" transition:blur={{ amount: 10, duration: 200 }}>
          <slot />
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  .arrow-base {
    transition-duration: 400ms;
    transform: rotate(0deg);
    transition: ease-out 300ms;
  }

  .arrow-down {
    transform: rotate(180deg);
    transition-duration: 400ms;
  }
</style>
