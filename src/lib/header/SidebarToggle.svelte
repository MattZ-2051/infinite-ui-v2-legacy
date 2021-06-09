<script lang="ts">
  export let isOpen: boolean;
</script>

<div>
  <button class:open={isOpen} type="button" class="menu">
    <span>Menu</span>
  </button>
</div>

<style>
  .menu {
    border: none;
    width: 30px;
    height: 24px;
    padding: 0;
    outline: none;
    position: relative;
    z-index: 2000;
  }

  .menu::before,
  .menu::after,
  .menu span {
    background: #5f656f;
  }

  .menu::before,
  .menu::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    left: 0;
    top: 50%;
    transform-origin: 50% 50%;
    transition: transform 0.5s;
  }

  .menu span {
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    overflow: hidden;
    text-indent: 200%;
    transition: opacity 0.25s;
  }

  .menu::before {
    transform: translate3d(0, -10px, 0);
  }

  .menu::after {
    transform: translate3d(0, 10px, 0);
  }
  .open.menu span {
    opacity: 0;
  }

  .open.menu::before {
    transform: rotate3d(0, 0, 1, 45deg);
  }

  .open.menu::after {
    transform: rotate3d(0, 0, 1, -45deg);
  }
</style>
