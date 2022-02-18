<script>
  import Icon from '$ui/icon/Icon.svelte';
  import arrowDown from '$project/assets/lib/chevron-down';
  import arrowUp from '$project/assets/lib/arrow-up';

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
    <div class=" flex justify-between items-center" style="color:{active ? selectedColor : textColor}">
      <div class="text-2xl lg:text-3xl font-light pr-1 second-font">{title}</div>
      {#if !active}
        <Icon path={arrowDown} size={1} class="sm:hidden" />
        <Icon path={arrowDown} size={1.3} class="sm:block hidden" />
      {:else}
        <Icon path={arrowUp} size={1} class="sm:hidden" />
        <Icon path={arrowUp} size={1.3} class="sm:block hidden" />
      {/if}
    </div>
    {#if active}
      <div class="mt-6">
        <slot />
      </div>
    {/if}
  </div>
</div>
