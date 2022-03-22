<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import classicsImg from './images/bg-classics-img.png';
  import classicsImgMobile from './images/bg-classics-img-mobile.png';
</script>

<div class="bg-black">
  <div class="relative z-0 img-container">
    <div class="flex justify-center items-center h-full">
      <div
        class="text-white w-full z-10 flex flex-col max-w-6xl items-start sm:items-center justify-center container h-full"
      >
        <p class="text-base sm:text-lg font-normal pb-2 uppercase second-font" style="letter-spacing:0.2em;">
          featured collection
        </p>
        <p class="tracking-widest sm:text-5xl text-3xl font-light pb-8 second-font leading-10 sm:leading-normal">
          McLAREN <span class="block sm:inline">F1 CLASSICS</span>
        </p>
        <div class="text-lg text-center font-light max-w-8xl leading-9 hidden sm:block">
          <p class="pb-10 text-center">
            Nam a tellus mollis nisi laoreet rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. In at
            purus ut orci aliquam egestas at id arcu. Curabitur iaculis orci enim, auctor tempus lorem mattis non. Morbi
            eget mauris et augue hendrerit venenatis. Proin mi dolor, consequat quis vehicula nec, malesuada ut lorem.
          </p>
        </div>
        <div class="text-base font-light max-w-8xl leading-7 block sm:hidden">
          <p class="pb-6 text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit urna nulla, in pretium orci
            sollicitudin sed. Nunc sed purus et nunc sollicitudin.
          </p>
          <p class="pb-10 text-left">
            Proin mi dolor, consequat quis vehicula nec, malesuada ut lorem. Nam vitae erat et leo accumsan viverra
            vitae a nisl. Fusce sit amet interdum nibh. Aenean et consectetur enim.
          </p>
        </div>
        <Button
          variant="brand"
          class="h-12 sm:h-16 w-full sm:w-fit font-bold text-xs tracking-widest uppercase"
          on:click={() => goto('https://cars.mclaren.com/us-en')}>discover genesis collection</Button
        >
      </div>
    </div>
    <img
      alt="mclaren card classics"
      src={classicsImg}
      class="absolute top-0 -z-1 h-full object-cover hidden md:block w-full"
    />
    <img
      alt="mclaren card clasiics mobile"
      src={classicsImgMobile}
      class="w-full absolute top-0 -z-1 object-cover h-full md:hidden"
    />
  </div>
</div>

<style lang="postcss">
  .img-container {
    height: 70rem;
  }

  @media screen and (max-width: 768px) {
    .img-container {
      height: 50rem;
    }
  }
</style>
