<script lang="ts">
  import { SingleCheckbox } from '$ui/checkbox';
  import routes from '$project/routes';

  export let acceptedTerms: boolean;
  export let onCheckedTerms: (event: Event) => void;
</script>

<SingleCheckbox class="mb-2" on:change={(event) => onCheckedTerms(event)} checked={acceptedTerms}>
  <span class="text-gray-500">Read and agree to</span>
  <a href={routes.terms} class="ml-1 text-default" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
  <span class="text-gray-500">and</span>
  <a href={routes.privacy} class="text-default" target="_blank" rel="noopener noreferrer">Privacy Policy.</a>
</SingleCheckbox>
