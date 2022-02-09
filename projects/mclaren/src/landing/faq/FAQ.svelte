<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import SimpleAccordion from './SimpleAccordion.svelte';
  import { FaqInfo } from './FAQInfo';
</script>

<div class="py-24 md:py-80 bg-white">
  <div class="container flex flex-col items-center px-6">
    <div class=" max-w-5xl relative z-10 w-full">
      <div class="font-normal text-4xl mb-20 sm:text-5xl text-center tracking-widest">FREQUENTLY ASKED QUESTIONS</div>
      <div class="w-full">
        {#each FaqInfo as el}
          <SimpleAccordion title={el.title}>
            <div class="text-black-opacity-80 font-light">
              <p>{el.text}</p>
              <p class="pt-6">{el?.subText}</p>
            </div>
          </SimpleAccordion>
        {/each}
        <div class="flex flex-1 items-center justify-center mt-14">
          <Button
            variant="brand"
            class="whitespace-nowrap h-16 md:w-80 w-64 py-12 md:py-0 tracking-widest font-bold text-xs"
            type="submit"
          >
            SEE ALL</Button
          >
        </div>
      </div>
    </div>
  </div>
</div>
