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
  import { FormElement } from '$lib/components/form';
  import tooltip from '$ui/tooltip';
  import { creditCardFundsAddFx, creditCardRemoveFx } from './card.store';
  import CreditCardComponent from './CreditCard.svelte';
  import CircleContainer from './CircleContainer.svelte';
  import CardFundSuccess from './CardFundSuccess.svelte';
  import CardFundError from './CardFundError.svelte';

  export let card: CreditCard;

  $: isActive = card.status === 'complete' && card.verification?.cvv === 'pass';
  $: isPending = card.status === 'pending';

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
  <div class="text-gray-500 mt-4 mb-6">Add funds into your wallet</div>

  <div class="flex justify-center">
    <CreditCardComponent {card} />
  </div>

  <div class="flex justify-between mt-6">
    <span class="text-sm text-current font-medium"
      >Status:
      {#if isActive}
        <span class="text-green-500">Active</span>
      {:else if card.status === 'pending'}
        <span class="text-gray-500">Pending</span>
      {:else}
        <span class="text-red-500">Failed</span>
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
      class="text-sm text-gray-500 hover:text-default">Remove card</button
    >
  </div>

  <form use:form class="mt-6 flex flex-col gap-6 items-start" autocomplete="off">
    <div class="w-full">
      <FormElement class="w-1/3" name="cvv" placeholder="Enter CVV" />
    </div>
    <span class="text-start text-md font-extralight" style="color: var(--red)">
      Withdrawal of credit card deposits can be initiated 30 days after deposit
    </span>
    <div class="w-full">
      <FormElement
        variant="rounded"
        class="bg-gray-50 py-2 text-center"
        name="amount"
        type="number"
        placeholder="Enter Amount"
        min="0"
        before="$"
      />
    </div>
    <div
      use:tooltip={isPending
        ? 'Please wait a few moments while your credit card is activated. This can take up to 2 minutes.'
        : ''}
      class="w-full"
    >
      <Button --button-padding="13px 32px" class="w-full" variant="brand" type="submit" disabled={!isActive || $saving}
        >Add Funds</Button
      >
    </div>
  </form>
</CircleContainer>
