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
  import Modal from '$ui/modal/Modal.svelte';
  import { toast } from '$ui/toast';
  import Image from '$ui/image/Image.svelte';
  import Circle from '$lib/features/wallet/deposit/circle-avatar.png?w=48&format=avif;webp;png&metadata';
  import Button from '$lib/components/Button.svelte';
  import CardFormInput from './CardFormInput.svelte';
  import { addCreditCardFunds, deleteCreditCard } from './card.api';

  export let card: CreditCard;

  let saving: Promise<unknown>;
  let removing: Promise<unknown>;
  let showSuccessModal = false;
  let showErrorModal = false;

  const schema = yup.object({
    amount: yup.number().min(0).required('Amount is required.'),
  });

  const { form, errors, reset } = createForm<{ amount: string }>({
    initialValues: {
      amount: '0',
    },
    onSubmit: async ({ amount }) => {
      try {
        await (saving = addCreditCardFunds(card.id, { amount, email: $user.email }));
        showSuccessModal = true;
        reset();
      } catch {
        showErrorModal = true;
      } finally {
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
      goto(`/wallet`);
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
        on:click={removeCard}
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

<Modal bind:open={showSuccessModal}>
  <div class="flex flex-col justify-center items-center gap-4 mt-2 text-base max-w-sm text-center py-4">
    <div class="text-2xl text-black">🤘 Yeah! Funds added.</div>
    <div class="text-gray-500 font-extrabold italic text-base">
      Check your open tabs to refresh your previous screen to see your added funds.<br />
      or
    </div>
    <Button type="button" on:click={() => goto('/marketplace')}>Go to Marketplace</Button>
    <a href="/u/wallet" class="text-black text-xl">View Wallet</a>
  </div>
</Modal>

<Modal bind:open={showErrorModal}>
  <div class="flex flex-col justify-center items-center gap-4 mt-2 text-base max-w-sm text-center py-4">
    <div class="text-2xl text-black">⚠️ Whoops, something went wrong.</div>
    <div class="text-gray-500 font-extrabold italic text-base">
      We couln’t process your payment and the transaction was cancelled.
    </div>
    <Button type="button" on:click={() => (showErrorModal = false)}>Try again</Button>
    <a href="/u/wallet" class="text-black text-xl">Select Another Payment Methood</a>
  </div>
</Modal>
