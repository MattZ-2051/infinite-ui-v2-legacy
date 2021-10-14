<script lang="ts">
  import type { AchAccount } from '../types';

  export let account: AchAccount;
  let { metadata, institution_logo } = account.plaidInfo;
</script>

<div style="color:#7c7c7c">
  <div name="message" class="pb-9">Are you sure you want to remove this account?</div>
</div>
<div class="flex items-center">
  <img src={`data:image/png;base64,${institution_logo}`} alt="bank icon" class="w-8" />
  <div class="ml-1">{`${metadata.institution.name} account xxxx${metadata.account.mask}`}</div>
</div>
