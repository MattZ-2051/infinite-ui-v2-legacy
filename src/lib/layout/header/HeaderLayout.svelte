<script lang="ts">
  import type { User } from '$lib/user/types';
  import type { Link } from './types';
  import Logo from '$project/Logo.svelte';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import SidebarToggle from '$ui/sidebar-toggle/SidebarToggle.svelte';
  import routes from '$project/routes';
  import Sidebar from '$lib/layout/header/Sidebar.svelte';
  import Links from './Links.svelte';

  let showSidebar = false;
  export let user: User;
  export let links: Link[];

  // TODO (Matt) - comment out to not break storybook finding solution for env vars and storybook
  // afterUpdate(async () => {
  //   const isUserloggedIn = user?.username;
  //   if (variables.maintenance.maintenanceMode === 'true' && isUserloggedIn) {
  //     routes.signout();
  //     toast.warning(
  //       `The site is currently in maintenance mode, sign-ups and sign-ins are temporarily disabled. We'll be back shortly.`
  //     );
  //   }
  // });
</script>

<ThemeContext id="header">
  <header class="w-full flex flex-col">
    <div class="w-full h-full flex">
      {#if showSidebar}
        <div class="fixed top-0 right-0 left-0 bottom-0 z-40 md:hidden">
          <Sidebar {user} {links} on:close={() => (showSidebar = false)} />
        </div>
      {/if}
      <div class="container links-container flex justify-between items-center py-3">
        <a href={routes.index} aria-label="Home" class="flex gap-1 mr-2 sm:mr-3 items-end"><Logo /> </a>
        <slot name="support" klass="text-current ml-auto mr-3 sm:mr-5 md:hidden" size={1.25} />
        <div class="flex md:hidden">
          {#if $$slots.credits}
            <div class="self-center mr-2 sm:mr-4 sm:block">
              <slot name="credits" />
            </div>
          {/if}
          <SidebarToggle
            isOpen={showSidebar}
            on:toggle={(event) => (showSidebar = event.detail)}
            class="md:hidden text-default"
          />
        </div>
        <div class="hidden md:flex gap-1 md:gap-5 lg:gap-12 md:items-center min-w-0">
          <Links {links} {user} />
          <slot name="support" klass="header-link" size="1.25rem" />
        </div>
        {#if $$slots.credits}
          <div class="self-center hidden md:flex md:items-center ml-2">
            <slot name="credits" />
          </div>
        {/if}
      </div>
    </div>
    <div class="separator" />
  </header>
</ThemeContext>

<style lang="postcss">
  header {
    @apply sticky top-0 z-40 bg-black;
    height: var(--header-height);
  }

  @screen md {
    .links-container {
      align-items: var(--header-links-align-items, center);
    }
  }
</style>
