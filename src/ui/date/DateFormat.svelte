<script lang="ts">
  import { formatDate } from '$util/format';

  export let value: Date | string;
  export let format = "MMMM do, yyyy 'at' hh:mm a";

  $: date = formatDate(value, format);
</script>

{date}
