<script lang="ts" context="module">
  function timeRemaining(_date: Date) {
    let now = +new Date();

    let delta = Math.abs(+_date - now) / 1000;

    // calculate (and subtract) whole days
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    let seconds = Math.floor(delta % 60);
    console.log(days, hours, minutes, seconds);
    return [days, hours, minutes, seconds];
  }
</script>

<script lang="ts">
  export let date: Date;
  const difference = timeRemaining(date);
</script>

<!-- {difference[0]}d,,{difference[3]} s -->
{difference[1]}h {difference[2]}m
