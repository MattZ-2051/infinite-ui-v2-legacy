<script lang="ts">
  import { time, timeRemaining } from './clock';

  export let date: Date;

  $: difference = timeRemaining(date, $time);
</script>

<span class="tabular-nums"
  >{difference[1]}h {`${difference[2]}`.padStart(2, '0')}m {`${difference[3]}`.padStart(2, '0')}s</span
>
