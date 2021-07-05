<script lang="ts">
  import type { CreditCard } from '../wallet/types';
  import { setContext } from 'svelte';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import { mdiLightbulbOnOutline } from '@mdi/js';

  import { goto } from '$app/navigation';
  import { user } from '$lib/user';
  import Icon from '$ui/icon/Icon.svelte';
  import { openModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import Image from '$ui/image/Image.svelte';
  import Circle from '$lib/features/wallet/deposit/circle-avatar.png?w=48&format=avif;webp;png&metadata';
  import Button from '$lib/components/Button.svelte';
  import ConfirmModal from '$lib/components/ConfirmModal.svelte';
  import CardFormInput from './CardFormInput.svelte';
  import { addCreditCardFunds, deleteCreditCard } from './card.api';
  import CardFundResult from './CardFundResult.svelte';

  export let card: CreditCard;

  let saving: Promise<unknown>;
  let removing: Promise<unknown>;

  const minAmount = 1;
  const schema = yup.object({
    amount: yup
      .number()
      .typeError('Amount is not a valid number.')
      .min(minAmount, `Amount must be greater than ${minAmount}.`)
      .required('Amount is required.'),
  });

  const { form, errors, reset } = createForm<{ amount: string }>({
    initialValues: {
      amount: '0',
    },
    onSubmit: async ({ amount }) => {
      let status: 'success' | 'error';
      try {
        await (saving = addCreditCardFunds(card.id, { amount, email: $user.email }));
        status = 'success';
        reset();
      } catch {
        status = 'error';
      } finally {
        openModal(CardFundResult, { status });
        saving = undefined;
      }
    },
    validate: validateSchema(schema),
  });

  setContext('errors', errors);

  async function removeCard() {
    try {
      await (removing = deleteCreditCard(card.id));
      toast.success('Card was removed successfully.');
      goto(`/u/wallet`);
    } catch {
      toast.danger(`There was a problem removing your card ending on ${card.last4}.`);
    } finally {
      removing = undefined;
    }
  }
</script>

<div class="container flex flex-col items-center">
  <div class="w-80">
    <div class="flex items-center gap-2 text-xl border-b-2 border-black pb-3">
      <Image src={Circle} class="flex-none w-8 h-8" /> Circle Payments
    </div>
    <div class="text-gray-500 font-extrabold italic mt-4">Add funds into your wallet</div>

    <div
      class="flex flex-col justify-between bg-black text-gray-500 w-80 h-44 rounded-2xl px-6 py-2 font-extrabold mt-6"
    >
      <div class="text-white text-2xl text-right">{card.network}</div>

      <div>
        <span class="text-sm italic">CARD NUMBER</span>
        <div class="flex items-center gap-4 tracking-widest">
          <span>••••</span><span>••••</span><span>••••</span><span class="text-white text-xl font-normal"
            >{card.last4}</span
          >
        </div>
      </div>
      <div class="flex justify-end">
        <div>
          <div class="text-xs italic">EXP</div>
          <div class="text-white text-base font-normal">{card.expMonth}/{card.expYear}</div>
        </div>
      </div>
    </div>

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
        disabled={!!removing}
        class="text-sm font-extrabold italic text-gray-500 hover:text-black">Remove card</button
      >
    </div>

    <div class="mt-10 flex flex-col items-center text-base font-extrabold italic text-gray-500">
      <Icon path={mdiLightbulbOnOutline} />
      <div>Remember to account for the 5% service fee when choosing your deposit amount.</div>
    </div>

    <form use:form class="mt-6 flex flex-col gap-3">
      <CardFormInput name="amount" label="Enter Amount" />
      <Button type="submit" class="mt-6" disabled={!!saving}>Add Funds</Button>
    </form>
  </div>
</div>
