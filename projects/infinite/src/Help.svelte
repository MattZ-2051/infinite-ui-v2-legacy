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
  import { CLIENT_SUPPORT_URL, CLIENT_SUPPORT_EMAIL, HUBSPOT_FORM_URL } from '$project/variables';

  onMount(async () => {
    await injectScript({ id: 'hubspot-form', url: HUBSPOT_FORM_URL });
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
      <a class="text-black underline cursor-pointer mx-1 hover:no-underline" href={CLIENT_SUPPORT_URL}
        >FAQ/Knowledge Base</a
      >
      for information on common questions.
    </span>
    <span class="text-gray-400">
      If you still have a question or suggestion, please submit the contact/support form or email us at
      <a
        class="text-black underline cursor-pointer mx-1 hover:no-underline"
        href={`mailto:${CLIENT_SUPPORT_EMAIL}?subject=Website Inquiry`}
        target="_blank">{CLIENT_SUPPORT_EMAIL}</a
      >
    </span>
  </div>
  <div class="flex flex-col flex-1 gap-10 font-black">
    <div class="text-2xl border-b-2 border-gray-300 pb-6">Contact/Support Form</div>
    <div id="embed-hubspot" />
  </div>
</div>
