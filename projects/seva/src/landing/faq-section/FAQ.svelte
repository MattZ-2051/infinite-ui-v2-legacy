<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import SimpleAccordion from './SimpleAccordion.svelte';
  import { FaqInfo } from './FAQInfo';
  import ArrowDown from './assets/arrowDown.png';
  import ArrowUp from './assets/arrowUp.png';
</script>

<div class="py-32 md:py-48" style="background-color:#FFD54E;">
  <div class="container flex flex-col items-center">
    <div class=" max-w-3xl relative z-10 w-full">
      <div class="font-medium text-4xl mb-14 sm:text-6xl text-center md:text-left">Frequently asked questions</div>
      <div class="w-full max-w-3xl">
        {#each FaqInfo as el}
          <SimpleAccordion title={el.title} imageClosedSource={ArrowDown} imageOpenedSource={ArrowUp}>
            <div class="font-medium text-black-opacity-80">{el.text}</div>
          </SimpleAccordion>
        {/each}
        <div class="flex flex-1 items-center justify-center mt-14">
          <Button
            --button-padding="12px 32px"
            --button-border-radius="999px"
            --button-brand-bg-color="rgba(0,0,0)"
            --button-brand-color="rgba(255,255,255)"
            --button-brand-border-color-hover="#7852FD"
            --button-brand-border-color="transparent"
            --button-brand-bg-color-hover="#7852FD"
            --button-brand-color-hover="rgba(255,255,255)"
            animate={false}
            variant="brand"
            class="whitespace-nowrap  md:w-56 w-44 py-12 md:py-0"
            type="submit"
            on:click={() => window.open('https://support.suku.world/infinite-powered-by-suku')}
          >
            Read more FAQs</Button
          >
        </div>
      </div>
    </div>
  </div>
</div>
