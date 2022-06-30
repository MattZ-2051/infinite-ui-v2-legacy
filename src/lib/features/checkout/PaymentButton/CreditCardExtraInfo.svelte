<script lang="ts">
  import visa from '../assets/visa-icon.svg';
  import mastercard from '../assets/mastercard-icon.svg';
  import amex from '../assets/amex-icon.svg';
  import applePay from '../assets/applepay-icon.svg';
  import gPay from '../assets/gpay-icon.svg';
</script>

<div class="flex flex-row gap-x-2">
  <img src={applePay} alt="applePay" class="w-7" />
  <img src={gPay} alt="gpay" class="w-7" />
  <img src={visa} alt="visa" class="w-7" />
  <img src={mastercard} alt="mastercard" class="w-7" />
  <img src={amex} alt="amex" class="w-7" />
</div>

<style>
  img:first-child,
  img:nth-child(2),
  img:nth-child(3) {
    filter: var(--credit-card-icons-color-invert); /* color inversion for black backgrounds */
  }
</style>
