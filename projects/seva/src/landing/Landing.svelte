<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import type { SkuV2 } from '$lib/infinite-api-sdk/types';
  import HeartSurgery from './heart-surgery/HeartSurgerySection.svelte';
  import FAQ from './faq-section/FAQ.svelte';
  import Mission from './mission-section/Mission.svelte';
  import LandingHead from './first-section/LandingHead.svelte';
  import LandingSkuGrid from './second-section/LandingSkuGrid.svelte';
  import Subscribe from './subscribe/Subscribe.svelte';

  export let singleSkuData: Sku;
  export let skus: SkuV2[];
</script>

<LandingHead sku={singleSkuData} />
<LandingSkuGrid {skus} />
<HeartSurgery />
<FAQ />
<Mission />
<Subscribe />
