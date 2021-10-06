<script context="module" lang="ts">
  declare const hbspt: {
    forms: {
      create: (config: unknown) => void;
    };
  };
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import injectScript from '$util/injectScript';

  onMount(async () => {
    await injectScript({ id: 'hubspot-form', url: '//js.hsforms.net/forms/v2.js' });
    hbspt.forms.create({
      region: import.meta.env.VITE_HUBSPOT_REGION,
      portalId: import.meta.env.VITE_HUBSPOT_PORTAL_ID,
      formId: import.meta.env.VITE_HUBSPOT_FORM_ID,
      target: '#embed-hubspot',
    });
  });
</script>

<div class="container flex flex-col  mt-12 gap-12 md:flex-row">
  <div class="flex flex-col flex-1 gap-10 font-black">
    <div class="text-2xl border-b-2 border-gray-300 pb-6">How can we help you?</div>
    <span class="text-gray-400">
      Before submitting the contact/support form, please search the
      <a
        class="text-black underline cursor-pointer mx-1 hover:no-underline"
        href="https://support.suku.world/infinite-powered-by-suku">FAQ/Knowledge Base</a
      >
      for information on common questions.
    </span>
    <span class="text-gray-400">
      If you still have a question or suggestion, please submit the contact/support form or email us at
      <a class="text-black underline cursor-pointer mx-1 hover:no-underline" href="mailto:support@goinfinite.com"
        >support@goinfinite.io</a
      >
    </span>
  </div>
  <div class="flex flex-col flex-1 gap-10 font-black">
    <div class="text-2xl border-b-2 border-gray-300 pb-6">Contact/Support Form</div>
    <div id="embed-hubspot" />
  </div>
</div>
