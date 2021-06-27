<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  export let id = `input-${uid++}`;
  export let label = '';
  export let before = '';
  export let after = '';
  export let error: string | string[] = '';

  const klass =
    'flex-grow appearance-none bg-transparent w-full text-gray-700  leading-tight focus:outline-none font-black';

  $: cols = +($$slots.before || before) + 1 + +($$slots.after || after);
</script>

<div>
  {#if label}
    <label for={id} class="text-sm font-extrabold italic text-gray-500"><slot name="label">{label}</slot></label>
  {/if}
  <div
    class="flex flex-cols-{cols} items-center border-b {error
      ? 'border-red-500'
      : 'border-black'} pb-2 pt-1 font-black italic"
  >
    {#if $$slots.before || before}
      <div class="flex-none"><slot name="before" class="flex-none">{before}</slot></div>
    {/if}
    <slot {klass} {id} />
    {#if $$slots.after || after}
      <div class="flex-none"><slot name="after" class="flex-none">{after}</slot></div>
    {/if}
  </div>
  {#if error}
    <div class="text-red-500 font-extrabold italic">{error}</div>
  {/if}
</div>
