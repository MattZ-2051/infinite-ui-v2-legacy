<script lang="ts">
  import { mdiEye, mdiEyeOff } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import Input from '$lib/components/Input.svelte';

  let _class = '';
  export { _class as class };

  let showPassword = false;
</script>

<Input let:klass let:id>
  <input
    type={showPassword ? 'text' : 'password'}
    {id}
    autocomplete="off"
    class="{klass} {_class}"
    on:input
    on:focus
    on:blur
    {...$$restProps}
  />
  <Icon
    slot="after"
    path={showPassword ? mdiEyeOff : mdiEye}
    size="1.2"
    on:click={() => (showPassword = !showPassword)}
    class="cursor-pointer"
  />
</Input>
