<script lang="ts">
  import ExchangingGoodness from './exchangingGoodness/ExchangingGoodness.svelte';
  import ExchangeTeam from './exchangeTeam/ExchangeTeam.svelte';
  import NftDetails from './NftDetails.svelte';
  import GetInTouch from './GetInTouch.svelte';
  import Subscribe from './subscribe/Subscribe.svelte';
  import { skuLandingHeadData } from '../landing/utils/landingData';

  const skuData = skuLandingHeadData();
</script>

<ExchangingGoodness />
<ExchangeTeam />
<NftDetails {skuData} />
<GetInTouch />
<Subscribe />
