<svelte:options immutable={true} />

<script lang="ts">
  import type { TooltipInput } from '$ui/tooltip';
  import useTooltip from '$ui/tooltip';
  import useActions from '$util/useActions';
  import { styles } from '$util/styles';
  import IconsDefs from '$ui/icon/IconsDefs.svelte';

  export let actions = [];

  export let path: string | string[] | { [key: string]: string } | { [key: string]: string }[]; // https://materialdesignicons.com
  export let size: number | string = 1;
  export let color: string = undefined;
  export let flip: boolean | 'v' | 'h' = undefined;
  export let rotate = 0;
  export let spin: boolean | number = false;
  export let title = '';
  export let tooltip: TooltipInput = undefined;
  export let viewBox: string = undefined;

  // SPIN properties
  $: inverse = typeof spin !== 'boolean' && spin < 0 ? true : false;
  $: spintime = Math.abs(spin === true ? 2 : spin || 0);
  $: spinfunc = inverse ? 'spin-inverse' : 'spin';
  // size
  if (Number(size)) size = Number(size);

  const getStyles = (_size: string | number, _flip: string | boolean, _rotate: number) => {
    const _styles: { [key: string]: string | number } = {};
    if (_size) {
      const width = typeof _size === 'string' ? _size : `${_size * 1.5}rem`;
      _styles.width = width;
      _styles.height = width;
    }

    const transform = [];
    if (_flip === true || _flip === 'h') {
      transform.push('scaleX(-1)');
    }
    if (_flip === true || _flip === 'v') {
      transform.push('scaleY(-1)');
    }
    if (_rotate !== 0) {
      transform.push(`rotate(${_rotate}deg)`);
    }
    if (transform.length > 0) {
      _styles.transform = transform.join(' ');
      _styles['transform-origin'] = 'center';
    }

    return styles(_styles);
  };

  $: style = getStyles(size, flip, rotate);
  $: _actions = [...actions, tooltip ? [useTooltip, tooltip] : undefined];
  $: paths = [path]
    .flat()
    .map((p) => ({ fill: color || 'currentColor', ...(typeof p === 'string' ? { d: p } : { ...p }) }));
</script>

<svg viewBox={viewBox ? viewBox : '0 0 24 24'} {style} {...$$restProps} on:click use:useActions={_actions}>
  {#if title}<title>{title}</title>{/if}
  <IconsDefs />
  {#if spin !== false}
    {#if inverse}
      <style>
        @keyframes spin-inverse {
          to {
            transform: rotate(-360deg);
          }
        }
      </style>
    {:else}
      <style>
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      </style>
    {/if}
    <g style={`animation: ${spinfunc} linear ${spintime}s infinite; transform-origin: center`}>
      {#each paths as pathAttrs}
        <path {...pathAttrs} />
      {/each}
    </g>
  {:else}
    {#each paths as pathAttrs}
      <path {...pathAttrs} />
    {/each}
  {/if}
</svg>

<style>
  svg {
    vertical-align: middle;
  }
</style>
