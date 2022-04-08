<script lang="ts">
  import routes from '$project/routes';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import { allSkuCollections } from '$lib/features/collections/collections.store';
  import CollectionContainer from '../collections/CollectionContainer.svelte';
</script>

<div class="z-0">
  <CollectionContainer />
  {#if $allSkuCollections?.length !== undefined}
    {#each $allSkuCollections as collection}
      {#if collection.descriptionShort !== 'some short description'}
        <!-- the if should be erased once the databse is fixed -->
        <article class="container text-center space-y-5 mb-16">
          <h3 class="text-5xl">{collection.name}</h3>
          <p class="text-base md:text-xl">{collection.descriptionShort}</p>
          <Button variant="outline-brand" on:click={() => goto(routes.skuCollection(collection._id))}
            >Go to collection</Button
          >
        </article>
      {/if}
    {/each}
  {/if}
</div>
