<script lang="ts">
  import DateFormat from '$ui/date/DateFormat.svelte';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrency } from '$util/format';

  export let minBidPrice: number;
  export let bidStartDate: Date;
</script>

<div class="h-24 rounded-xl flex flex-col items-center justify-center bg-white">
  <div class="text-lg">
    <span>Starts at {formatCurrency(minBidPrice)} in <TimeDifference date={new Date(bidStartDate)} on:zero /></span>
  </div>
  <span class=" italic text-sm font-black text-gray-500  ">
    (<DateFormat value={bidStartDate} />)
  </span>
</div>
