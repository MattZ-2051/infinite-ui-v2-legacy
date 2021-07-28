<script lang="ts">
  import type { CreditCard } from '../wallet/types';
  import { setContext } from 'svelte';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import { mdiLightbulbOnOutline } from '@mdi/js';

  import { user } from '$lib/user';
  import Icon from '$ui/icon/Icon.svelte';
  import { openModal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';
  import ConfirmModal from '$lib/components/ConfirmModal.svelte';
  import FormInput from '$lib/components/form/FormInput.svelte';
  import { creditCardFundsAddFx, creditCardRemoveFx } from './card.store';
  import CardFundResult from './CardFundResult.svelte';
  import CreditCardComponent from './CreditCard.svelte';
  import CircleContainer from './CircleContainer.svelte';

  export let card: CreditCard;

  const saving = creditCardFundsAddFx.pending;
  const removing = creditCardRemoveFx.pending;

  const schema = yup.object({
    amount: yup
      .number()
      .typeError('Amount is not a valid number.')
      .positive('Amount must be greater than zero.')
      .required('Amount is required.'),
  });

  const { form, errors, reset } = createForm<{ amount: string }>({
    initialValues: {
      amount: '0',
    },
    onSubmit: async ({ amount }) => {
      let status: 'success' | 'error';
      try {
        await creditCardFundsAddFx({ card, amount, email: $user.email });
        status = 'success';
        reset();
      } catch {
        status = 'error';
      } finally {
        openModal(CardFundResult, { status });
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
      >Credit Card <span class="text-green-500">(Active)</span></span
    >
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

  <div class="mt-10 flex flex-col items-center text-base font-extrabold italic text-gray-500">
    <Icon path={mdiLightbulbOnOutline} />
    <div>Remember to account for the 5% service fee when choosing your deposit amount.</div>
  </div>

  <form use:form class="mt-6 flex flex-col gap-3" autocomplete="off">
    <FormInput name="amount" label="Enter Amount" />
    <Button type="submit" class="mt-6" disabled={$saving}>Add Funds</Button>
  </form>
</CircleContainer>
