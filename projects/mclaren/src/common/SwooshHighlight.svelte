<script lang="ts">
  import Swoosh from './assets/swoosh';

  export let color: string;
  export let position: 'right' | 'left';

  const positionClasses = {
    right: 'right-0 translate-x-1/4',
    left: 'left-0 -translate-x-1/4 -scale-x-100',
  };
</script>

<div class="relative" style={`--dominant-color:${color};`}>
  <div class="absolute top-[-50%] left-0 right-0 bottom-[-50%] overflow-hidden">
    <svg
      viewBox={Swoosh.viewBox}
      class={`h-[50%] w-auto absolute top-1/2 transform -translate-y-2/3 ${
        positionClasses[position]
      } z-[auto] blur-[120px] ${color ? 'opacity-30' : 'opacity-0'} transition-opacity duration-200`}
    >
      <path {...Swoosh.path} style="fill: var(--dominant-color)" />
    </svg>
  </div>
  <div class="relative">
    <slot />
  </div>
</div>
