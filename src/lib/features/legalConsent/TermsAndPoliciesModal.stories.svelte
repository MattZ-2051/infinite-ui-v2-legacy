<script lang="ts">
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import LegalConsentModal from './LegalConsentModal.svelte';
</script>

<Meta title="Lib / features / LegalConsentModal" component={LegalConsentModal} />

<Template let:args>
  <LegalConsentModal
    type="firstTime"
    user={{ activeLegalConsentIds: ['testId'], acceptedLegalConsentIds: [] }}
    legalConsentRecord={{ title: 'Acceptance of the Terms of Service' }}
    signIn={() => {
      alert('handleSignIn');
    }}
    closeModal={() => {
      alert('handleClosed');
    }}
    {...args}
  />
</Template>

<Story name="TermsAndPolicies First Time" />

<Story
  name="TermsAndPolicies Update"
  args={{
    type: 'update',
    legalConsentRecord: { title: 'Acceptance of the Terms & Policies' },
    user: { activeLegalConsentIds: ['testId2'], acceptedLegalConsentIds: ['testId1'] },
  }}
/>

<Story
  name="Terms of Service Update"
  args={{ type: 'update', user: { activeLegalConsentIds: ['testId2'], acceptedLegalConsentIds: ['testId1'] } }}
/>

<Story
  name="Privacy Policy Update"
  args={{
    type: 'update',
    legalConsentRecord: { title: 'Acceptance of the Privacy Policy' },
    user: { activeLegalConsentIds: ['testId2'], acceptedLegalConsentIds: ['testId1'] },
  }}
/>

<Story
  name="Cookies Policy Update"
  args={{
    type: 'update',
    legalConsentRecord: { title: 'Acceptance of the Cookies Policy' },
    user: { activeLegalConsentIds: ['testId2'], acceptedLegalConsentIds: ['testId1'] },
  }}
/>
