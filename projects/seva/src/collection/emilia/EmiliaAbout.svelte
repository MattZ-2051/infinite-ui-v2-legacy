<script>
  import AboutImage from './assets/about-emilia.svg';
</script>

<div class="grid grid-cols-1 md:grid-cols-2">
  <div class="relative w-full px-4 justify-self-end pb-12" style="max-width: calc(var(--container-max-width)/2);">
    <div class="absolute bottom-0 right-0 top-0 left-0 md:left-1/4 mt-32 md:mt-20" style="background-color: #ffd54e;" />
    <div class="w-full h-full relative">
      <img src={AboutImage} alt="about" class="object-contain rounded-xs" />
    </div>
  </div>
  <div class="flex">
    <div class="w-full pb-16 pt-8 md:pt-16 pl-4 md:pl-8 mt-0 md:mt-20" style="background-color: #ffd54e;">
      <div class="border-b border-black border-opacity-20 md:text-4xl text-xl pb-8">
        <span class="pr-4" style="max-width: calc(var(--container-max-width)/2);">About Emilia’s Collection</span>
      </div>
      <div class="pr-4" style="max-width: calc(var(--container-max-width)/2);">
        <div class="mt-8 md:text-4xl text-2xl font-medium leading-10">
          Phasellus fermentum accumsan ligula, eget iaculis eros elementum id. Integer et quam sapien. Morbi condimentum
          vel elit sit laoreet.
        </div>
        <div class="mt-8 text-base leading-7 font-medium text-black text-opacity-90">
          Brain injury represents a global health problem bigger than dementia - but still many people remain unaware of
          the sheer scale of the problem. Brain injuries are so widespread it is genuinely shocking that brain injury
          recovery services remain practically non-existent compared to more visible chronic health problems.
        </div>
        <div class="mt-4 text-base leading-7 font-medium text-black text-opacity-90">
          <p>For millions worldwide - survivors, their families and carers - the lack of brain injury provision is</p>
          <p>nothing short of an invisible healthcare crisis.</p>
          <p />
        </div>
      </div>
    </div>
  </div>
</div>
