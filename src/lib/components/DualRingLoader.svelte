<div class="lds-dual-ring" />

<style>
  .lds-dual-ring {
    display: inline-block;
    width: var(--lds-size);
    height: var(--lds-size);
  }

  .lds-dual-ring:after {
    content: ' ';
    display: block;
    width: calc(var(--lds-size) * 0.8);
    height: calc(var(--lds-size) * 0.8);
    margin: calc(var(--lds-size) / 10);
    border-radius: 50%;
    border: calc(var(--lds-size) * 0.075) solid var(--lds-color);
    border-color: var(--lds-color) transparent var(--lds-color) transparent;
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
