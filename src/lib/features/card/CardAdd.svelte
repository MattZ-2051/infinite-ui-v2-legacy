<script lang="ts">
  import type { NewCreditCard } from './types';
  import { setContext } from 'svelte';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';

  import { user } from '$lib/user';
  import Button from '$lib/components/Button.svelte';
  import FormInput from '$lib/components/form/FormInput.svelte';
  import FormCountriesSelect from '$lib/components/form/FormCountriesSelect.svelte';
  import FormDistrictsSelect from '$lib/components/form/FormDistrictsSelect.svelte';
  import CircleContainer from './CircleContainer.svelte';
  import { creditCardInsertFx } from './card.store';

  $: isDistrictRequired = ['US', 'CA'].includes($data.billingDetails?.country);

  const phoneOrEmailValidateFunction = function () {
    return this.parent.phone || this.parent.email;
  };

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
      district: yup.string().when('country', () => {
        return isDistrictRequired ? yup.string().required('State/Province is required') : yup.string().notRequired();
      }),
    }),
    metadata: yup.object({
      phone: yup.string().test('emailOrPhone', 'Email or phone is required', phoneOrEmailValidateFunction),
      email: yup
        .string()
        .email('Is not a valid email')
        .test('emailOrPhone', 'Phone or email is required', phoneOrEmailValidateFunction),
    }),
  });

  const saving = creditCardInsertFx.pending;

  const { form, data, errors, reset } = createForm<NewCreditCard>({
    initialValues: {
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvv: '',
      metadata: {
        email: $user.email,
        phone: '',
      },
      billingDetails: {
        name: '',
        line1: '',
        line2: '',
        postalCode: '',
        city: '',
        country: 'US',
        district: '',
      },
    },
    onSubmit: async (values) => {
      await creditCardInsertFx({
        ...values,
        expMonth: +values.expMonth,
        expYear: +values.expYear,
        cvv: values.cvv,
        metadata: {
          email: values.metadata.email,
          phone: values.metadata.phone,
        },
      });
      reset();
    },
    validate: validateSchema(schema),
  });

  setContext('errors', errors);
</script>

<CircleContainer>
  <div class="text-gray-600 font-extrabold mt-4">Enter the card details below</div>
  <form use:form class="mt-6 flex flex-col gap-3" autocomplete="off">
    <FormInput name="cardNumber" label="Credit card number *" />
    <FormInput name="expMonth" label="Exp month *" />
    <FormInput name="expYear" label="Exp year *" />
    <FormInput name="cvv" label="CCV *" />
    <FormInput name="billingDetails.name" label="Cardholder name *" />
    <FormInput name="metadata.email" label="Email" />
    <FormInput name="metadata.phone" label="Phone Number" />
    <FormInput name="billingDetails.line1" label="Address Line 1 *" />
    <FormInput name="billingDetails.line2" label="Address Line 2" />
    <FormInput name="billingDetails.postalCode" label="Postal Code *" />
    <FormInput name="billingDetails.city" label="City *" />
    <FormCountriesSelect name="billingDetails.country" label="Country *" />
    <FormDistrictsSelect
      countryISO2={$data.billingDetails?.country}
      name="billingDetails.district"
      label="State/Province{isDistrictRequired ? ' *' : ''}"
    />

    <Button type="submit" class="mt-6" disabled={$saving}>Add Card</Button>
  </form>
</CircleContainer>
