<script lang="ts">
  export let images = [];
  export let featuredImage;

  const setFeaturedImage = (image) => {
    featuredImage = image;
  };
</script>

<div class="relative">
  {#if featuredImage}
    <img src={featuredImage} alt="preview" class="m-auto relative" />
  {/if}
  {#if images.length}
    <div class="absolute gap-2 bottom-3 left-5 hidden lg:flex">
      {#each images as image}
        <img
          src={image}
          alt="thumbnail"
          class="w-16 h-16 border border-black cursor-pointer"
          on:click={() => setFeaturedImage(image)}
        />
      {/each}
    </div>
  {/if}
</div>
