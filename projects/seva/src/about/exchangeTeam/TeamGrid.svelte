<script lang="ts">
  import type { Person } from './Info';
  import Image from '$ui/image/Image.svelte';

  export let people: Person[];
  export let title: string;
</script>

<div class="flex flex-col gap-16 md:gap-24 pt-8 sm:pt-16">
  <div class="flex flex-col gap-8 md:gap-12">
    <div class="flex justify-center"><h1 class="text-3xl sm:text-4xl font-semibold opacity-80 mb-2">{title}</h1></div>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-x-6 md:gap-y-10 max-w-6xl mx-auto">
      {#each people as person}
        <div class="flex flex-col gap-4 items-center text-center">
          <div>
            <Image src={person.photo} class="rounded-lg" />
          </div>
          <div class="flex flex-col w-56">
            <span class="text-xl md:text-2xl font-medium">{person.name}</span>
            <span class="text-sm md:text-xl " style="color:#7852fd">{person.position}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
