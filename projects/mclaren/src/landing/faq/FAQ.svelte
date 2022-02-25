<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import SimpleAccordion from './SimpleAccordion.svelte';
  import { FaqInfo } from './FAQInfo';
</script>

<div class="bg-white py-44 sm:py-48">
  <div class="flex flex-col items-center">
    <div class="max-w-5xl relative z-10 w-full container">
      <div class="font-normal text-3xl mb-20 sm:text-5xl text-center tracking-widest uppercase second-font">
        frequently asked questions
      </div>
      <div class="w-full">
        {#each FaqInfo as el}
          <SimpleAccordion title={el.title}>
            <div class="text-black-opacity-70 font-light text-sm sm:text-base">
              <p>{el.text}</p>
            </div>
          </SimpleAccordion>
        {/each}
        <div class="flex flex-1 items-center justify-center mt-14">
          <Button
            variant="brand"
            class="whitespace-nowrap h-16 w-full md:w-80 sm:w-64 py-12 md:py-0 tracking-widest font-bold text-xs uppercase"
            type="submit"
            --button-brand-bg="linear-gradient(161.99deg, #FFFFFF -1.04%, #F8F8F8 111.86%)"
            on:click={() => window.open('https://www.mclaren.com/racing/inside-the-mtc/nft-guide/')}
          >
            see all</Button
          >
        </div>
      </div>
    </div>
  </div>
</div>
