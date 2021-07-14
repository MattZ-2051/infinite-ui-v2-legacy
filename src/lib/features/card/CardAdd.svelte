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
  import Circle from '$lib/features/wallet/deposit/circle-avatar.png?w=48&format=avif;webp;png&metadata';
  import FormInput from '$lib/components/form/FormInput.svelte';
  import FormCountriesSelect from '$lib/components/form/FormCountriesSelect.svelte';
  import FormDistrictsSelect from '$lib/components/form/FormDistrictsSelect.svelte';
  import Image from '$ui/image/Image.svelte';

  import { addCreditCard } from './card.api';

  const schema = yup.object({
    cardNumber: yup
      .string()
      .required('Credit card number is required.')
      .matches(/^\d{16}$/, 'Please enter a valid card number'),
    expMonth: yup
      .number()
      .typeError('Enter a valid month format MM')
      .min(1, 'Enter a valid month format MM')
      .max(12, 'Enter a valid month format MM')
      .required(),
    expYear: yup.number().typeError('Enter a valid year format YYYY').min(new Date().getFullYear()).required(),
    cvv: yup
      .string()
      .matches(/^\d{3,4}$/, 'Enter a valid ccv number')
      .required('Ccv is required'),
    billingDetails: yup.object({
      name: yup.string().required('Name is required'),
      line1: yup.string().required('Address is required'),
      line2: yup.string(),
      postalCode: yup.string().required('Postal code is required'),
      city: yup.string().required('City is required'),
      country: yup.string().required('Country is required'),
      district: yup.string(),
    }),
  });

  let selectedCountryISO2: string;
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
          cvv: values.cvv,
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
      <FormInput name="cardNumber" label="Credit card number" />
      <FormInput name="expMonth" label="Exp month" />
      <FormInput name="expYear" label="Exp year" />
      <FormInput name="cvv" label="CCV" />
      <FormInput name="billingDetails.name" label="Cardholder name" />
      <FormInput name="billingDetails.line1" label="Address Line 1" />
      <FormInput name="billingDetails.line2" label="Address Line 2" />
      <FormInput name="billingDetails.postalCode" label="Postal Code" />
      <FormInput name="billingDetails.city" label="City" />
      <FormCountriesSelect bind:value={selectedCountryISO2} name="billingDetails.country" label="Country" />
      <FormDistrictsSelect countryISO2={selectedCountryISO2} name="billingDetails.district" label="State/Province" />

      <Button type="submit" class="mt-6" disabled={!!saving}>Add Card</Button>
    </form>
  </div>
</div>
