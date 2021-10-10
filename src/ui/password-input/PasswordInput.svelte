<script lang="ts">
  import { mdiEye, mdiEyeOff } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { Input } from '$lib/components/form';

  let showPassword = false;
</script>

<Input type={showPassword ? 'text' : 'password'} autocomplete="off" on:input on:focus on:blur {...$$restProps}>
  <Icon
    slot="after"
    path={showPassword ? mdiEyeOff : mdiEye}
    size="1.2"
    on:click={() => (showPassword = !showPassword)}
    class="cursor-pointer"
  />
</Input>
