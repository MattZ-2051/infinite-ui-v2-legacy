<script lang="ts">
  import SwooshHighlight from '$project/common/SwooshHighlight.svelte';
  import futurePerformanceSvg from './images/future-performance-img.svg';
</script>

<SwooshHighlight color="#FF5E17" position="right">
  <div class="w-full py-16 sm:py-72 flex justify-center align-center">
    <div class="flex flex-col lg:grid grid-cols-2 h-full text-black items-center container px-6 md:px-16 xl:px-44">
      <div class="text-left lg:text-left sm:text-left md:text-center">
        <p
          class="text-base sm:text-lg font-normal pb-2 uppercase second-font text-white opacity-80"
          style="letter-spacing: 0.2em;"
        >
          mso lab
        </p>
        <p class="text-3xl sm:text-5xl font-light tracking-widest pb-10 second-font text-white opacity-80">
          FUTURE PERFORMANCE
        </p>
        <div class="w-full xl:w-3/4 font-light text-sm sm:text-base leading-7">
          <p class="leading-7 pb-6 text-white opacity-80">
            From its inception, McLaren Special Operations has existed to push boundaries combining bleeding edge
            design, engineering and craftsmanship to deliver the ‘art of the possible’.
          </p>
          <p class="leading-7 md:pb-6 text-white opacity-80">
            The first chapter in McLaren Automotive’s ambitious metaverse roadmap, MSO LAB continues this mission into
            the web3 era. A platform for innovation and collaboration, exploring the future of performance in automotive
            and beyond.
          </p>
          <p class="leading-7 pb-10 text-white opacity-80 hidden sm:block">
            Accessed through a series of ultra-exclusive NFT collections, MSO LAB membership will provide holders with
            an evolving range of benefits - harnessing new and innovative ways to push the boundaries of access and
            experience.
          </p>
        </div>
      </div>
      <div class="justify-self-end img-card rounded-3xl z-1">
        <img
          src={futurePerformanceSvg}
          width="100%"
          alt="future performance"
          class="img-card sm:object-cover rounded-3xl"
        />
      </div>
    </div>
  </div>
</SwooshHighlight>
