<script lang="ts">
  import { variables } from '$lib/variables';
</script>

<div class="flex flex-col gap-5 md:gap-10 items-center justify-center text-center h-screen bg-black text-white">
  <div class="text-6xl font-extrabold text-gradient-primary">Maintenance Notice</div>
  <div class="flex flex-col gap-4 md:gap-8 max-w-6xl">
    <div class="text-2xl md:text-3xl font-semibold">
      {variables.maintenance.maintenanceMessage ||
        'The marketplace is currently undergoing scheduled maintenance and will be unavailable.'}
    </div>
    <div class="text-2xl md:text-3xl font-semibold">Thank you for your patience.</div>
  </div>
</div>
