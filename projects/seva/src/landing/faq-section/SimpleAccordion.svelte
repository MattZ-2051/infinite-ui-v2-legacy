<script>
  export let title;
  export let imageClosedSource;
  export let imageOpenedSource;
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
      <div class="text-xl sm:text-3xl font-medium pr-1">{title}</div>
      {#if !active}
        <img class="sm:hidden" src={imageClosedSource} alt="open" width="20px" height="20px" />
        <img class="sm:block hidden" src={imageClosedSource} alt="open" width="30px" height="30px" />
      {:else}
        <img class="sm:hidden" src={imageOpenedSource} alt="close" width="20px" height="20px" />
        <img class="sm:block hidden" src={imageOpenedSource} alt="close" width="30px" height="30px" />
      {/if}
    </div>
    {#if active}
      <div class="mt-6">
        <slot />
      </div>
    {/if}
  </div>
</div>
