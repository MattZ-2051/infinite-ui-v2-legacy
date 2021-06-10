<script lang="ts" context="module">
  import { time } from './clock';
</script>

<script lang="ts">
  import { timeRemaining } from './clock';
  export let date: Date;
  $: difference = timeRemaining(date, $time);
</script>

{difference[1]}h {difference[2]}m {difference[3]}s
