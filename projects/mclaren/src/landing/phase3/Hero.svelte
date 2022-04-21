<script lang="ts">
  export let urlAsset;
</script>

<video class="w-full object-cover h-auto" autoplay loop muted>
  <source src={urlAsset} type="video/mp4" />
</video>
