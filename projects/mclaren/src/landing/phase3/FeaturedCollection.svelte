<script lang="ts">
  import curvedBorder from './images/curved-border.svg';
  import upcomingDropVideo from './images/UPCOMING_DROP.mp4';
</script>

<div class="w-full h-full relative">
  <div class="h-72 relative w-full mt-32 sm:mt-72">
    <img src={curvedBorder} alt="curverd-border-img" class="absolute w-full -top-10" />
    <div class="h-full flex flex-col items-center justify-end container pb-14">
      <p
        class="font-normal second-font text-5xl text-white text-center uppercase"
        style="letter-spacing: 0.07em; line-height: 4rem;"
      >
        upcoming drop
      </p>
    </div>
  </div>
  <div class="pb-24 sm:pb-72 bg-black">
    <video
      class="content-height w-full relative container flex justify-center max-w-4xl hidden md:block"
      autoplay
      loop
      muted
    >
      <source src={upcomingDropVideo} type="video/mp4" class="h-full w-full" />
    </video>
    <video class="w-full absolute top-12 -z-1 object-cover h-full md:hidden" autoplay loop muted>
      <source src={upcomingDropVideo} type="video/mp4" />
    </video>
  </div>
</div>

<style lang="postcss">
  .content-height {
    height: 40rem;
    margin-bottom: -2.5rem;
  }
</style>
