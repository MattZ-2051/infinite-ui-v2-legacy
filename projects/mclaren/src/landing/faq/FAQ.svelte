<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import routes from '$project/routes';
  import SimpleAccordion from '$project/landing/faq/SimpleAccordion.svelte';
  import { FaqInfo } from './FAQInfo';
</script>

<div class="py-44 sm:py-72 relative">
  <div class="flex flex-col items-center">
    <div class="max-w-5xl relative z-10 w-full container">
      <div
        class="font-light text-[32px] mb-20 sm:text-5xl md:text-center tracking-widest uppercase second-font text-white"
      >
        frequently asked questions
      </div>
      <div class="w-full text-white-opacity-80">
        {#each FaqInfo as el}
          <SimpleAccordion title={el.title} textColor="rgba(255,255,255,0.8)" selectedColor="white">
            <div class="font-light text-sm sm:text-base leading-7">
              {@html el.content}
            </div>
          </SimpleAccordion>
        {/each}
        <div class="flex flex-1 items-center justify-center mt-14">
          <Button
            variant="brand"
            class="whitespace-nowrap h-12 md:h-16 w-full md:w-80 sm:w-64 py-12 md:py-0 tracking-widest font-bold text-xs uppercase"
            type="submit"
            on:click={() => window.open(routes.faq)}
          >
            see all</Button
          >
        </div>
      </div>
    </div>
  </div>
</div>
