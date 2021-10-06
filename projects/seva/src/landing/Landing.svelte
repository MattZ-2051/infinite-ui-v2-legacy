<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import HeartSurgery from './heart-surgery/HeartSurgerySection.svelte';
  import FAQ from './faq-section/FAQ.svelte';
  import Mission from './mission-section/Mission.svelte';
  import LandingHead from './first-section/LandingHead.svelte';
  import LandingSkuGrid from './second-section/LandingSkuGrid.svelte';
  import Subscribe from './subscribe/Subscribe.svelte';

  export let skus: Sku[];
</script>

<LandingHead sku={skus[2]} />
<LandingSkuGrid {skus} />
<HeartSurgery />
<FAQ />
<Mission />
<Subscribe />
