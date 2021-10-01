<script lang="ts">
  export const skus = [];
  import HeartSurgery from './heart-surgery/HeartSurgerySection.svelte';
  import FAQ from './faq-section/FAQ.svelte';
  import Mission from './mission-section/Mission.svelte';
  import LandingHead from './first-section/LandingHead.svelte';
  import SkuGrid from './second-section/LandingSkuGrid.svelte';
  import Subscribe from './subscribe/Subscribe.svelte';
</script>

<LandingHead />
<SkuGrid />
<HeartSurgery />
<FAQ />
<Mission />
<Subscribe />
