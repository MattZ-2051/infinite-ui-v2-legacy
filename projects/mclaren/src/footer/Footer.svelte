<script lang="ts">
  import routes from '$project/routes';
  import poweredByInfinite from '$project/poweredByInfiniteLogo';
  import Icon from '$ui/icon/Icon.svelte';
  import { SocialLinks, FooterLayout } from '$lib/layout/footer';
  import FooterLogo from './assets/FooterLogo.svelte';
  import { links } from './social-links';
</script>

<div class="bg-black ">
  <div class="container pt-0 md:py-0 flex flex-col items-center">
    <div class="flex flex-col items-start max-w-7xl w-full">
      <div class="bg-black text-white pt-16 lg:pb-28 pb-8 w-full">
        <div class="w-full grid  gap-x-12 sm:gap-x-16 gap-y-12 sm:gap-y-28 grid-container grid-cols-1 sm:grid-cols-2">
          <div class="w-full first-box">
            <div class="footer-title">McLAREN CORPORATE</div>
            <div
              class="footer-links grid grid-rows-4 gap-y-4 gap-x-10 grid-flow-col sm:grid-rows-5 sm:max-w-fit"
              style="max-height:12rem"
            >
              <a href={routes.faq} target="_blank" rel="noreferrer" style="max-width:138px; width:100%">Partners</a>
              <a href={routes.faq} target="_blank" rel="noreferrer">Careers</a>
              <a href={routes.faq} target="_blank" rel="noreferrer">Media</a>
              <a href={routes.faq} target="_blank" rel="noreferrer">Mclaren Group</a>
              <a href={routes.faq} target="_blank" rel="noreferrer">McLaren Racing</a>
              <a href={routes.faq} target="_blank" rel="noreferrer">Mclaren Applied</a>
              <a href={routes.faq} target="_blank" rel="noreferrer">Investors</a>
            </div>
          </div>
          <div class="">
            <div class="footer-title">OUR POLICY</div>
            <div
              class=" footer-links grid grid-rows-3  gap-y-4 gap-x-12 grid-flow-col sm:grid-rows-5 "
              style="max-height:12rem"
            >
              <a href={routes.faq} target="_blank" rel="noreferrer">Cookie Policy</a>
              <a href={routes.faq} target="_blank" rel="noreferrer">Privacy Policy</a>
              <a href={routes.faq} target="_blank" rel="noreferrer">Gender Gap Report</a>
              <a href={routes.faq} target="_blank" rel="noreferrer">Terms and Conditions</a>
              <a href={routes.faq} target="_blank" rel="noreferrer">Anti-Slavery statement</a>
            </div>
          </div>
          <div class="grid grid-flow-col grid-cols-2 sm:col-span-2 gap-x-8 sm:gap-x-16 xl:gap-x-8">
            <div>
              <div class="text-xl footer-title">CONTACT</div>
              <div class="link-container" style="max-height:12rem">
                <a href={routes.faq} target="_blank" rel="noreferrer">Contact US</a>
                <a href={routes.faq} target="_blank" rel="noreferrer">Enquire</a>
                <a href={routes.faq} target="_blank" rel="noreferrer">Find a retailer</a>
              </div>
            </div>
            <div>
              <div class="footer-title">FOLLOW US</div>
              <div class="flex relative -top-2"><SocialLinks {links} /></div>
            </div>
          </div>
        </div>
      </div>
      <div class="sm:hidden pb-8 self-end">
        <FooterLogo />
      </div>
      <FooterLayout useContainer={false}>
        <svelte:fragment slot="start">
          <a href={routes.faq} target="_blank" rel="noreferrer">FAQ</a>
          <a href={routes.careers}>Careers</a>
          <a href={routes.help}>Help</a>
          <a href={routes.privacy}>Privacy Policy</a>
          <a href={routes.terms}>Terms & Conditions</a>
          <a href="https://infiniteworld.com" class="sm:flex items-center hidden ">
            <Icon path={poweredByInfinite} class="-mr-1" />
            <span class="block md:hidden lg:block"> Powered by infiniteworld </span>
          </a>
        </svelte:fragment>

        <div slot="end" class="relative md:-top-4 lg:-top-2 hidden sm:block">
          <FooterLogo />
        </div>
      </FooterLayout>
      <div class="flex justify-center sm:hidden footer-links w-full mb-2">
        <a href="https://infiniteworld.com" class="flex items-center">
          <Icon path={poweredByInfinite} class="-mr-1" />
          <span class="block md:hidden lg:block"> Powered by infiniteworld </span>
        </a>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  a:hover {
    color: var(--footer-color-hover);
  }

  @screen lg {
    .grid-container {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  @screen xl {
    .grid-container {
      grid-template-columns: repeat(4, max-content);
    }
  }

  .footer-title {
    letter-spacing: 0.36em;
    font-family: McLaren;
    @apply text-lg pb-6;
  }

  @screen sm {
    .footer-title {
      letter-spacing: 0.4em;
      @apply text-xl pb-8;
    }
  }

  .footer-links {
    color: var(--footer-color);
    font-family: NotoSans;
  }
  .link-container {
    @apply flex flex-col flex-wrap footer-links gap-y-4;
  }
  @screen sm {
    .link-container {
      @apply gap-x-16;
    }
  }
</style>
