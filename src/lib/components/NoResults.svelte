<script lang="ts">
  import { mdiCancel } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';

  let _class = '';
  export { _class as class };
</script>

<div class="flex flex-col gap-12 justify-center w-full text-center {_class}">
  <div class="flex justify-center"><Icon path={mdiCancel} size="8" /></div>
  <div class="text-2xl">No Matching Results</div>
  <div>
    <div class="text-2xl">Check your spelling or try adjusting keywords and/or filters.</div>
    <div class="text-xl mt-2">
      If the problem persists please contact <a href="mailto:help@infinite.com" class="text-blue-500 hover:underline"
        >help@infinite.com</a
      >
    </div>
  </div>
</div>
