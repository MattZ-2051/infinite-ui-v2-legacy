<script lang="ts">
  import visa from '../assets/visa-icon.svg';
  import mastercard from '../assets/mastercard-icon.svg';
  import amex from '../assets/amex-icon.svg';
  import applePay from '../assets/applepay-icon.svg';
  import gPay from '../assets/gpay-icon.svg';

  let _class = '';
  export { _class as class };
</script>

<div class="flex flex-row gap-x-2 {_class}">
  <img src={applePay} alt="applePay" class="w-7 dark-color-inversion" />
  <img src={gPay} alt="gpay" class="w-7 dark-color-inversion" />
  <img src={visa} alt="visa" class="w-7" />
  <img src={mastercard} alt="mastercard" class="w-7" />
  <img src={amex} alt="amex" class="w-7" />
</div>

<style>
  .dark-color-inversion {
    filter: var(--payment-btn-credit-card-icons-color-invert); /* icons color inversion for dark backgrounds */
  }
</style>
