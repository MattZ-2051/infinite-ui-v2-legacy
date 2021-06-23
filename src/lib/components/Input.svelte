<script lang="ts">
  export let before = '';
  export let after = '';

  const klass =
    'flex-grow appearance-none bg-transparent  w-full text-gray-700  leading-tight focus:outline-none';

  $: cols = +($$slots.before || before) + 1 + +($$slots.after || after);
</script>

<div class="flex flex-cols-{cols} items-center border-b border-black pb-3 pt-2 font-black italic">
  {#if $$slots.before || before}
    <div class="flex-none"><slot name="before" class="flex-none">{before}</slot></div>
  {/if}
  <slot {klass} />
  {#if $$slots.after || after}
    <div class="flex-none"><slot name="after" class="flex-none">{after}</slot></div>
  {/if}
</div>
