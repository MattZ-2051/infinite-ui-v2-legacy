<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  export let title1: string;
  export let title2: string;
  export let title3: string;
  export let photo: string;
  export let link: string;
</script>

<div class="grid grid-cols-1 md:grid-cols-2">
  <div class="relative w-full px-4 justify-self-end pb-12" style="max-width: calc(var(--container-max-width)/2);">
    <div class="absolute bottom-0 right-0 top-0 left-0 md:left-1/4 mt-32 md:mt-20" style="background-color: #FFD54E;" />
    <div class="w-full h-full relative">
      <img src={photo} alt="about" class="object-contain rounded-xs" />
    </div>
  </div>
  <div class="flex">
    <div class="w-full pb-16 pt-8 md:pt-16 pl-4 md:pl-8 mt-0 md:mt-20" style="background-color: #FFD54E;">
      <div class="border-b border-black border-opacity-20 md:text-4xl text-xl pb-8">
        <span class="pr-4" style="max-width: calc(var(--container-max-width)/2);">{title1}</span>
      </div>
      <div class="pr-4" style="max-width: calc(var(--container-max-width)/2);">
        <div class="mt-8 md:text-4xl text-2xl font-medium leading-10">
          {title2}
        </div>
        <div class="mt-8 text-base leading-7 font-medium text-black text-opacity-90">
          {title3}
        </div>
        <div class="mt-4">
          <Button variant="brand" href={link} target="_blank" rel="noopener noreferrer" class="mb-8">Learn more</Button>
        </div>
      </div>
    </div>
  </div>
</div>
