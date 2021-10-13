<script lang="ts">
  import type { NewCreditCard } from './types';
  import { setContext } from 'svelte';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import dayjs from 'dayjs';
  import { user } from '$lib/user';
  import Button from '$lib/components/Button.svelte';
  import { FormElement, Select, FormCountriesSelect, FormDistrictsSelect } from '$lib/components/form';
  import CircleContainer from './CircleContainer.svelte';
  import { creditCardInsertFx } from './card.store';

  $: isDistrictRequired = ['US', 'CA'].includes($data.billingDetails?.country);

  const months = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: dayjs().month(index).format('MMMM'),
  }));
  const years = Array.from({ length: 26 }, (_, index) => dayjs().add(index, 'year').year());

  const phoneOrEmailValidateFunction = function () {
    return this.parent.phone || this.parent.email;
  };
  const isFirstAndLastName = function () {
    return this.originalValue.split(/\s+/g).filter(Boolean).length >= 2;
  };

  const schema = yup.object({
    cardNumber: yup
      .string()
      .required('Credit card number is required.')
      .matches(/^\d{16}$/, 'Please enter a valid card number'),
    expMonth: yup.number().typeError('Expiration month is required'),
    expYear: yup.number().typeError('Expiration year is required'),
    cvv: yup
      .string()
      .matches(/^\d{3,4}$/, 'Enter a valid ccv number')
      .required('CCV is required'),
    billingDetails: yup.object({
      name: yup
        .string()
        .required('Name is required')
        .test(
          'isFirstAndLastName',
          'Cardholder name must have a first and last name, separated by a space.',
          isFirstAndLastName
        ),
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
      phone: yup
        .string()
        .matches(/^\+?[1-9]\d{1,14}$/, { message: 'Is not a valid phone number.', excludeEmptyString: true })
        .test('emailOrPhone', 'Email or phone is required', phoneOrEmailValidateFunction),
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
    <FormElement name="cardNumber" label="Credit card number *" />
    <FormElement component={Select} name="expMonth" label="Exp month *">
      {#each months as month}
        <option value={month.value}>{month.label}</option>
      {/each}
    </FormElement>
    <FormElement component={Select} name="expYear" label="Exp year *">
      {#each years as year}
        <option value={year}>{year}</option>
      {/each}
    </FormElement>
    <FormElement name="cvv" label="CCV *" />
    <FormElement name="billingDetails.name" label="Cardholder name *" />
    <FormElement name="metadata.email" label="Email" />
    <FormElement name="metadata.phone" label="Phone Number" />
    <FormElement name="billingDetails.line1" label="Address Line 1 *" />
    <FormElement name="billingDetails.line2" label="Address Line 2" />
    <FormElement name="billingDetails.city" label="City *" />
    <FormElement name="billingDetails.postalCode" label="Postal Code *" />
    <FormCountriesSelect name="billingDetails.country" label="Country *" />
    <FormDistrictsSelect
      countryISO2={$data.billingDetails?.country}
      name="billingDetails.district"
      label="State/Province{isDistrictRequired ? ' *' : ''}"
    />

    <Button variant="brand" type="submit" class="mt-6" disabled={$saving}>Add Card</Button>
  </form>
</CircleContainer>
