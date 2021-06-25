<script lang="ts"></script>

<div {...$$restProps} />

<style>
  div {
    --_lds-color: var(--lds-color, currentColor);
    --_lds-size: var(--lds-size, 3rem);
    display: inline-block;
    width: var(--_lds-size);
    height: var(--_lds-size);
  }

  div:after {
    content: ' ';
    display: block;
    width: calc(var(--_lds-size) * 0.8);
    height: calc(var(--_lds-size) * 0.8);
    margin: calc(var(--_lds-size) / 10);
    border-radius: 50%;
    border: calc(var(--_lds-size) * 0.075) solid var(--_lds-color);
    border-color: var(--_lds-color) transparent var(--_lds-color) transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
