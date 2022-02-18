<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<div>
  <form autocomplete="off" class="flex flex-col lg:flex-row justify-between">
    <div class="w-full rounded-full flex justify-between p-1 mb-6 mr-10  lg:mb-0 border border-white-opacity-20">
      <input
        type="text"
        name="email"
        class="focus:outline-none rounded-full w-full p-3 pl-4  text-white bg-transparent placeholder-white border-none"
        placeholder="Enter your email"
      />
      <Button
        type="submit"
        class="text-xs w-52 h-14 font-medium tracking-widest hidden md:block"
        variant="brand"
        --button-brand-bg="linear-gradient(161.99deg, #FFFFFF -1.04%, #F8F8F8 111.86%)">Subscribe</Button
      >
    </div>
    <Button
      type="submit"
      variant="brand"
      class=" md:hidden h-14 min-w-0"
      --button-brand-bg="linear-gradient(161.99deg, #FFFFFF -1.04%, #F8F8F8 111.86%)">Subscribe</Button
    >
  </form>
</div>
