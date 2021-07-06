<script lang="ts">
  import { time } from './clock';
  import { timeRemaining } from './time.service';

  export let date: Date | string;
  $: _date = typeof date === 'string' ? new Date(date) : date;

  $: difference = timeRemaining(_date, $time);
</script>

<span class="tabular-nums">
  {#if difference[0] > 0}
    {difference[0]}d
  {/if}
  {difference[1]}h {`${difference[2]}`.padStart(2, '0')}m
  {#if difference[0] < 1}
    {`${difference[3]}`.padStart(2, '0')}s
  {/if}
</span>
