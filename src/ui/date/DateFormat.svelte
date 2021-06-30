<script lang="ts">
  import { formatDate } from '$util/format';

  export let value: Date | string;
  export let format: string = undefined;

  $: date = formatDate(value, format);
</script>

{date}
