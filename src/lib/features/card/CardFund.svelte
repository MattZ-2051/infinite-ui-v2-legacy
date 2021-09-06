<script lang="ts">
  import type { CreditCard } from '../wallet/types';
  import { setContext } from 'svelte';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import { user } from '$lib/user';
  import { openModal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';
  import ConfirmModal from '$lib/components/ConfirmModal.svelte';
  import FormInput from '$lib/components/form/FormInput.svelte';
  import { creditCardFundsAddFx, creditCardRemoveFx } from './card.store';
  import CreditCardComponent from './CreditCard.svelte';
  import CircleContainer from './CircleContainer.svelte';
  import CardFundSuccess from './CardFundSuccess.svelte';
  import CardFundError from './CardFundError.svelte';

  export let card: CreditCard;

  $: isActive = card.status === 'complete' && card.verification?.cvv === 'pass';

  const saving = creditCardFundsAddFx.pending;
  const removing = creditCardRemoveFx.pending;

  const schema = yup.object({
    amount: yup
      .number()
      .typeError('Amount is not a valid number.')
      .positive('Amount must be greater than zero.')
      .required('Amount is required.'),
    cvv: yup
      .mixed()
      .test('validCvv', 'CVV is a number with 3 to 4 digits', (value) => /^\d{3,4}$/.test(value))
      .required('CVV is required.'),
  });

  const { form, errors, reset } = createForm<{ amount: string; cvv: string }>({
    onSubmit: async ({ cvv, amount }) => {
      try {
        await creditCardFundsAddFx({ card, amount, email: $user.email, cvv: cvv });
        openModal(CardFundSuccess);
        reset();
      } catch (error) {
        CardFundError;
        openModal(CardFundError, { error });
      }
    },
    validate: validateSchema(schema),
  });

  setContext('errors', errors);

  async function removeCard() {
    await creditCardRemoveFx({ card });
  }
</script>

<CircleContainer>
  <div class="text-gray-500 font-extrabold italic my-6">Add funds into your wallet</div>

  <CreditCardComponent {card} />

  <div class="flex justify-between mt-3">
    <span class="text-sm font-extrabold italic text-black"
      >Credit Card
      {#if isActive}
        <span class="text-green-500">(Active)</span>
      {:else if card.status === 'pending'}
        <span class="text-gray-400">(Pending)</span>
      {:else}
        <span class="text-red-500">(Failed)</span>
      {/if}
    </span>
    <button
      type="button"
      on:click={() =>
        openModal(ConfirmModal, {
          title: 'Remove Credit Card?',
          message: `You are going to delete card ending ${card.last4}.`,
          onConfirm: removeCard,
        })}
      disabled={$removing}
      class="text-sm font-extrabold italic text-gray-500 hover:text-black">Remove card</button
    >
  </div>

  <form use:form class="mt-6 flex flex-col gap-6 items-center" autocomplete="off">
    <div class="cvv-container">
      <FormInput name="cvv" placeholder="Enter CVV" />
    </div>
    <span class="text-gray-400 text-center"
      >Withdrawal of credit card deposits can be initiated 30 days after deposit</span
    >
    <div class="input-container w-full flex flex-col items-center relative">
      <input
        name="amount"
        type="number"
        placeholder="Enter Amount"
        class="relative w-full bg-gray-100 py-3 pl-8 pr-2 outline-none rounded-full text-center border-0 text-xl"
        class:border-red-600={!!$errors.amount}
      />
    </div>
    {#if $errors.amount}
      <div class="text-red-500 font-extrabold italic text-sm">{$errors.amount}</div>
    {/if}
    <Button type="submit" disabled={!isActive || $saving}>Add Funds</Button>
  </form>
</CircleContainer>

<style>
  .input-container::before {
    content: '$';
    position: absolute;
    left: 12px;
    bottom: 12px;
    z-index: 1;
    @apply text-xl;
    @apply text-gray-400;
  }
  .cvv-container {
    --input-text-align: center;
  }
</style>
