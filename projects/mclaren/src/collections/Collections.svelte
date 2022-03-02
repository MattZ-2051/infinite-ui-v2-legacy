<script lang="ts">
  import routes from '$project/routes';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import { allSkuCollections } from '$lib/features/collections/collections.store';
  import NewCollectionsInfo from './NewCollectionsInfo.svelte';
  import McLarenCollectionMain from './McLarenCollectionMain.svelte';
  import MultipleDevelopmentHistorical from './MultipleDevelopmentHistorical.svelte';
</script>

<div class="z-0">
  <NewCollectionsInfo />
  <McLarenCollectionMain />
  <MultipleDevelopmentHistorical />

  {#if $allSkuCollections?.length !== undefined}
    {#each $allSkuCollections as collection}
      <article class="container text-center space-y-5 mb-16">
        <h3 class="text-5xl">{collection.name}</h3>
        <p>{collection.descriptionShort}</p>
        <Button variant="outline-brand" on:click={() => goto(routes.skuCollection(collection._id))}
          >Go to collection</Button
        >
      </article>
    {/each}
  {/if}
</div>
