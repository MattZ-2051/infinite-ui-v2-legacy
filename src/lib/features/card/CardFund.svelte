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
  <div class="text-gray-500 my-6">Add funds into your wallet</div>

  <CreditCardComponent {card} />

  <div class="flex justify-between mt-3">
    <span class="text-sm text-white"
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
      class="text-sm text-gray-400 hover:text-default">Remove card</button
    >
  </div>

  <form data-style="container" use:form class="mt-6 flex flex-col gap-6 items-center" autocomplete="off">
    <div class="cvv-container">
      <FormInput name="cvv" placeholder="Enter CVV" />
    </div>
    <span class="text-gray-600 text-center"
      >Withdrawal of credit card deposits can be initiated 30 days after deposit</span
    >
    <FormInput name="amount" type="number" placeholder="Enter Amount" before="$" />
    <Button type="submit" disabled={!isActive || $saving}>Add Funds</Button>
  </form>
</CircleContainer>

<style>
  .cvv-container {
    --input-text-align: center;
  }
</style>
