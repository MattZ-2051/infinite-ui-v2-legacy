<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import collectiveSvg from './images/collective-img.svg';
</script>

<div class="h-full w-full bg-white py-24 flex justify-center align-center">
  <div class="flex flex-col lg:grid grid-cols-2 h-full text-black items-center max-w-7xl container">
    <div class="text-center lg:text-left sm:text-left md:text-center">
      <p class="text-sm sm:text-base font-normal pb-2 uppercase second-font" style="letter-spacing: 0.2em;">
        discover the new world of
      </p>
      <p class="text-4xl sm:text-5xl font-light tracking-widest pb-10 second-font">McLAREN COLLECTIVES</p>
      <div class="w-full lg:w-2/3 font-light text-sm sm:text-base leading-7">
        <p class="leading-7 pb-6">
          McLaren Racing today announced the creation of the McLaren Racing Collective, a global community of collectors
          and fans served through an innovative digital platform, where fans can buy McLaren Racing digital collectibles
          in the form of non-fungible tokens (NFTs).
        </p>
        <p class="leading-7 pb-6">
          The platform will be McLaren Racing’s primary location to allow fans and blockchain enthusiasts alike to
          engage with the brand, with the first drop featuring different digital components of the MCL35M 2021 Formula 1
          race cars, originated from the McLaren Racing CAD system.
        </p>
        <p class="leading-7 pb-10">
          The McLaren Racing Collective is operated on the energy-efficient blockchain of the team’s Official Technical
          Partner, InfiniteWorld, who are collaborating with McLaren to create the limited digital assets so that fans
          can connect directly with the brand.
        </p>
        <Button
          variant="brand"
          class="w-full h-12 mb-14 lg:mb-0 lg:h-16 lg:w-80 font-bold text-xs tracking-widest uppercase"
          >see our journey</Button
        >
      </div>
    </div>
    <div class="justify-self-end">
      <img src={collectiveSvg} alt="mclaren collective" class="img-card rounded-3xl" />
    </div>
  </div>
</div>

<style lang="postcss">
  .img-card {
    width: 47rem;
    box-shadow: 0px 40px 50px rgb(0 0 0 / 50%);
  }
</style>
