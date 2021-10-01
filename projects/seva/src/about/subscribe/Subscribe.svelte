<script>
  import Subscribe from '../../commonComponents/Subscribe.svelte';
  import Intersect from './assets/Intersect.svg';
</script>

<div style="background: #5739C1">
  <div class="container flex justify-center px-6 relative z-1">
    <Subscribe />
  </div>
</div>

<div class="w-full flex flex-col flex-end">
  <img
    src={Intersect}
    alt="curved purple line"
    class="hidden 2xl:block object-cover absolute bottom-0 z-0 right-0 w-full "
  />
  <img
    src={Intersect}
    alt="curved purple line"
    class="hidden md:block 2xl:hidden object-cover absolute bottom-0 z-0 right-0 w-full "
  />
</div>
