<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { time } from './clock';
  import { timeRemainingFormat } from './time.service';

  export let date: Date | string;

  const dispatch = createEventDispatcher();

  let _$time;

  const unsubscribe = time.subscribe((value) => {
    _$time = value;
  });

  $: _date = typeof date === 'string' ? new Date(date) : date;
  let difference: { days: number; hours: number; minutes: number; seconds: number };

  $: {
    const delta = (+_date - +_$time) / 1000;
    difference = timeRemainingFormat(Math.max(delta, 0));
    if (delta <= 0) {
      dispatch('zero');
      unsubscribe();
    }
  }
</script>

<span class="tabular-nums">
  {#if difference.days > 0}
    {difference.days}d
  {/if}
  {difference.hours}h {`${difference.minutes}`.padStart(2, '0')}m
  {#if difference.days < 1}
    {`${difference.seconds}`.padStart(2, '0')}s
  {/if}
</span>
