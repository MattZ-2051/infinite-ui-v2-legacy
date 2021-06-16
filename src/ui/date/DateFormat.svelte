<script lang="ts">
  import { format as dateFnsFormat, parseISO } from 'date-fns';

  export let value: Date | string;
  export let format = "MMMM do, yyyy 'at' hh:mm a";
</script>

{dateFnsFormat(typeof value === 'string' ? parseISO(value) : value, format)}
