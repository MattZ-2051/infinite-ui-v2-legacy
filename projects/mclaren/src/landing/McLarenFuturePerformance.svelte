<script lang="ts">
  import Image from '$ui/image/Image.svelte';
  import futurePerformanceImg from '$project/assets/aws/landing/MSO_LAB_Asset_1400x1120.png?w=800;600&format=avif;webp;jpg&metadata=src;format;width;height';
</script>

<div class="w-full py-20 sm:py-48 flex justify-center align-center">
  <div
    class="flex flex-col lg:grid grid-cols-[1fr_auto] gap-x-2 h-full text-black items-center container px-6 md:px-16 xl:px-44"
  >
    <div class="text-left lg:text-left sm:text-left md:text-center">
      <p class="text-base sm:text-lg font-normal pb-2 second-font text-white opacity-80 tracking-[.2em]">
        McLAREN AUTOMOTIVE
      </p>
      <p class="text-3xl sm:text-5xl font-light tracking-widest pb-10 second-font text-white opacity-80">
        ENTERS THE METAVERSE
      </p>
      <div class="w-full lg:w-5/6 lg:max-w-[580px] font-light text-sm sm:text-base leading-7">
        <p class="leading-7 pb-6 text-white opacity-80">
          From its inception, McLaren has existed to push boundaries, bringing together the pinnacle of engineering and
          design to drive progress through performance. It is this pioneering spirit that propels McLaren forward into
          the Web3 era.
        </p>
        <p class="leading-7 pb-6 text-white opacity-80">
          MSO LAB marks the first chapter in McLaren's ambitious metaverse roadmap. McLaren Special Operations,
          McLaren’s bespoke division, has always sat at the extreme edge; combining performance, innovation and
          craftsmanship to deliver ‘the art of the possible’. MSO LAB will continue this mission, exploring the future
          of performance in a digital realm.
        </p>
        <p class="leading-7 pb-10 text-white opacity-80">
          The first in a series of rare and ultra-exclusive NFT drops, launching 11.05.22, will extend this vision to
          more people than ever before. McLaren NFT ownership will grant membership to the MSO LAB community and an
          evolving array of benefits that will unlock new frontiers of access and experience.
        </p>
      </div>
    </div>
    <div class="justify-self-end img-card rounded-3xl z-1">
      <Image
        src={futurePerformanceImg}
        alt="future performance"
        class="img-card sm:object-cover rounded-3xl max-w-lg w-full"
      />
    </div>
  </div>
</div>
