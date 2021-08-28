<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import TalentLink from './TalentLink.svelte';

  const profile = { username: 'username', profilePhotoUrl: 'https://image.flaticon.com/icons/png/512/147/147144.png' };
</script>

<Meta title="Lib / components / TalentLink" />

<Template let:args>
  <div class="flex flex-col gap-2">
    <TalentLink {profile} />
    <TalentLink {profile} hideImage />
    <TalentLink {profile} class="text-red-600 text-3xl font-bold" imageClass="w-10 h-10" />
  </div>
</Template>

<Story name="Default" />
