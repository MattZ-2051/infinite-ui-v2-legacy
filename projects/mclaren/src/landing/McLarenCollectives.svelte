<script lang="ts">
  // import Button from '$lib/components/Button.svelte';
  import SwooshHighlight from '$project/common/SwooshHighlight.svelte';
  import collectiveSvg from './images/collective-img.svg';
</script>

<SwooshHighlight color="#133198" position="right">
  <div class="w-full py-16 sm:py-72 flex justify-center align-center">
    <div class="flex flex-col lg:grid grid-cols-2 h-full text-black items-center container px-6 lg:px-44">
      <div class="text-left lg:text-left sm:text-left md:text-center">
        <p
          class="text-base sm:text-lg font-normal pb-2 uppercase second-font  text-white opacity-80"
          style="letter-spacing: 0.2em;"
        >
          discover the new world of
        </p>
        <p class="text-3xl sm:text-5xl font-light tracking-widest pb-10 second-font text-white opacity-80">
          McLAREN COLLECTIVES
        </p>
        <div class="w-full lg:w-2/3 font-light text-sm sm:text-base leading-7">
          <p class="leading-7 pb-6 text-white opacity-80">
            McLaren Racing today announced the creation of the McLaren Racing Collective, a global community of
            collectors and fans served through an innovative digital platform, where fans can buy McLaren Racing digital
            collectibles in the form of non-fungible tokens (NFTs).
          </p>
          <p class="leading-7 md:pb-6 text-white opacity-80">
            The platform will be McLaren Racing’s primary location to allow fans and blockchain enthusiasts alike to
            engage with the brand, with the first drop featuring different digital components of the MCL35M 2021 Formula
            1 race cars, originated from the McLaren Racing CAD system.
          </p>
          <p class="leading-7 pb-10 text-white opacity-80 hidden sm:block">
            The McLaren Racing Collective is operated on the energy-efficient blockchain of the team’s Official
            Technical Partner, InfiniteWorld, who are collaborating with McLaren to create the limited digital assets so
            that fans can connect directly with the brand.
          </p>
          <!-- <Button
          variant="brand"
          class="hidden w-full h-12 mb-14 lg:mb-0 lg:h-16 lg:w-80 font-bold text-xs tracking-widest uppercase second-font"
          >see our journey</Button
        > -->
        </div>
      </div>
      <div class="justify-self-end img-card rounded-3xl z-1">
        <img src={collectiveSvg} width="100%" alt="mclaren collective" class="img-card sm:object-cover rounded-3xl" />
      </div>
    </div>
  </div>
</SwooshHighlight>

<style lang="postcss">
  .img-card {
    height: 43rem;
    box-shadow: 0px 40px 50px rgb(0 0 0 / 50%);
  }
</style>
