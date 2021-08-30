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
    'flex-grow appearance-none bg-transparent w-full leading-tight focus:outline-none px-0.5 border-0 focus:ring-0 text-white placeholder-white-opacity-50';

  $: cols = +($$slots.before || before) + 1 + +($$slots.after || after);
</script>

<div {...$$restProps}>
  {#if label}
    <label for={id} class="text-sm font-medium text-white-opacity-40"><slot name="label">{label}</slot></label>
  {/if}
  <div
    class="flex flex-cols-{cols} items-center border-b-2 border-white-opacity-30 text-white-opacity-80 {error
      ? 'border-red-500'
      : 'border-gray-200'} px-0.5 pb-1"
  >
    {#if $$slots.before || before}
      <div class="flex-none mr-4"><slot name="before" class="flex-none">{before}</slot></div>
    {/if}
    <slot {klass} {id} />
    {#if $$slots.after || after}
      <div class="flex-none"><slot name="after" class="flex-none">{after}</slot></div>
    {/if}
  </div>
  {#if error}
    <div class="text-red-500 text-sm pt-0.5">{error}</div>
  {/if}
</div>
