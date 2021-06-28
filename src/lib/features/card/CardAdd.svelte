<script lang="ts">
  import type { NewCreditCard } from './types';
  import type { CreditCard } from '../wallet/types';
  import { setContext } from 'svelte';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';

  import { user } from '$lib/user';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import Image from '$ui/image/Image.svelte';
  import Circle from '$lib/features/wallet/deposit/circle-avatar.png?w=48&format=avif;webp;png&metadata';

  import CardFormInput from './CardFormInput.svelte';
  import CardFormCountriesSelect from './CardFormCountriesSelect.svelte';
  import { addCreditCard } from './card.api';

  const schema = yup.object({
    cardNumber: yup.string().required('Credit card number is required.'),
    expMonth: yup.number().typeError('Month is not a number.').required(),
    expYear: yup.number().required(),
    cvv: yup.number().required(),
    billingDetails: yup.object({
      name: yup.string().required(),
      line1: yup.string().required(),
      line2: yup.string(),
      postalCode: yup.string().required(),
      city: yup.string().required(),
      country: yup.string().required(),
      district: yup.string(),
    }),
  });

  let saving: Promise<CreditCard>;

  const { form, errors, reset } = createForm<NewCreditCard>({
    // initialValues: {
    //   cardNumber: '4757140000000001',
    //   expMonth: '01',
    //   expYear: '2025',
    //   cvv: '123',
    //   billingDetails: {
    //     name: 'Test Name',
    //     line1: 'My Line 1',
    //     line2: '',
    //     postalCode: '12345',
    //     city: 'My city',
    //     country: 'AU',
    //     district: '',
    //   },
    // },
    onSubmit: async (values) => {
      try {
        await (saving = addCreditCard({
          ...values,
          expMonth: +values.expMonth,
          expYear: +values.expYear,
          cvv: +values.cvv,
          metadata: { email: $user.email },
        }));
        toast.success('Card added successfully.');
        reset();
      } catch {
        toast.danger(`There was a problem adding your card.`);
      } finally {
        saving = undefined;
      }
    },
    validate: validateSchema(schema),
  });

  setContext('errors', errors);
</script>

<div class="container flex flex-col gap-2 items-center">
  <div class="w-80">
    <div class="flex items-center gap-2 text-xl border-b-2 border-black pb-3">
      <Image src={Circle} class="flex-none w-8 h-8" /> Circle Payments
    </div>
    <div class="text-gray-500 font-extrabold italic mt-4">Enter the card details below</div>
    <form use:form class="mt-6 flex flex-col gap-3">
      <CardFormInput name="cardNumber" label="Credit card number" />
      <CardFormInput name="expMonth" label="Exp month" />
      <CardFormInput name="expYear" label="Exp year" />
      <CardFormInput name="cvv" label="CCV" />
      <CardFormInput name="billingDetails.name" label="Cardholder name" />
      <CardFormInput name="billingDetails.line1" label="Address Line 1" />
      <CardFormInput name="billingDetails.line2" label="Address Line 2" />
      <CardFormInput name="billingDetails.postalCode" label="Postal Code" />
      <CardFormInput name="billingDetails.city" label="City" />
      <CardFormCountriesSelect name="billingDetails.country" label="Country" />
      <CardFormInput name="billingDetails.district" label="State/Province" />

      <Button type="submit" class="mt-6" disabled={!!saving}>Add Card</Button>
    </form>
  </div>
</div>
