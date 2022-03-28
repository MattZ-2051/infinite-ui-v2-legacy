<script lang="ts">
  // TODO(vasilis): lazy load pond
  import 'filepond/dist/filepond.css';
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
  import FilePond, { registerPlugin } from 'svelte-filepond';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
  import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import { mdiArrowLeft } from '@mdi/js';
  import { slide } from 'svelte/transition';
  import { setContext } from 'svelte';
  import type { CurrencyType } from '../wallet/types';
  import type { SupplyType } from '$lib/sku-item/types';
  import { createForm } from 'felte';
  import * as yup from 'yup';
  import { validateSchema } from '@felte/validator-yup';
  import { toast } from '$ui/toast';
  import { openModal } from '$ui/modals';
  import ConfirmModal from '$lib/components/ConfirmModal.svelte';
  import { browser } from '$app/env';
  import { FormElement, Textarea } from '$lib/components/form';
  import Icon from '$ui/icon/Icon.svelte';
  import Button from '$lib/components/Button.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import { user } from '$lib/user';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import Switch from '$lib/components/Switch.svelte';
  import { media } from '$lib/media-query.store';
  import { createSku } from './sku.api';

  registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize, FilePondPluginImagePreview);

  const hasCloseButton = browser && history.length > 1;
  const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
  const NAME_MAX_CHARS = 45;
  const DESCRIPTION_MAX_CHARS = 2100;

  const schema = yup.object({
    name: yup
      .string()
      .required('Full name is required.')
      .max(NAME_MAX_CHARS, `Full name must be shorter than ${NAME_MAX_CHARS} characters.`),
    description: yup
      .string()
      .required('Description is required.')
      .max(DESCRIPTION_MAX_CHARS, `Description must be shorter than ${DESCRIPTION_MAX_CHARS} characters.`),
    royaltyFeePercentage: yup
      .number()
      .min(0, 'Royalties must be greater than or equal to 0.')
      .max(100, 'Royalties must be less than or equal to 100.'),
    nftPublicAssets: yup
      .mixed()
      .required('Public asset is required.')
      .test('is-big-file', ' ', checkIfFileIsTooBig)
      .test('is-correct-file', ' ', checkIfFileIsCorrectType),
    nftPrivateAssets: yup.mixed().when('hasUnlockableContent', {
      is: true,
      // eslint-disable-next-line unicorn/no-thenable
      then: yup
        .mixed()
        .required('Private asset is required.')
        .test('is-big-file', ' ', checkIfFileIsTooBig)
        .test('is-correct-file', ' ', checkIfFileIsCorrectType),
    }),
  });

  const { form, errors, data, isSubmitting, isValid, setData, setTouched, setErrors } = createForm<{
    name: string;
    description: string;
    supplyType: SupplyType;
    currency: CurrencyType;
    issuer: string;
    issuerName: string;
    maxSupply: number;
    featured: boolean;
    royaltyFeePercentage: number;
    hasUnlockableContent: boolean;
    nftPublicAssets: File;
    nftPrivateAssets?: File;
  }>({
    initialValues: {
      name: '',
      description: '',
      supplyType: 'fixed',
      currency: 'USD',
      issuer: $user._id,
      issuerName: $user.username,
      maxSupply: 1,
      featured: false,
      hasUnlockableContent: false,
      royaltyFeePercentage: 0,
      // eslint-disable-next-line unicorn/no-null
      nftPublicAssets: null,
      // eslint-disable-next-line unicorn/no-null
      nftPrivateAssets: null,
    },
    onSubmit: async ({ nftPublicAssets, nftPrivateAssets, hasUnlockableContent, ...rest }) => {
      try {
        const { _id } = await createSku({
          nftPublicAssets: [
            {
              url: 'https://infinite-digital-dev.s3.amazonaws.com/Untitled.mov',
            },
          ],
          ...(hasUnlockableContent && {
            nftPrivateAssets: [
              {
                url: 'https://infinite-digital-dev.s3.amazonaws.com/Untitled.mov',
              },
            ],
          }),
          ...rest,
        });
        openModal(ConfirmModal, {
          title: 'NFT Succesfully Created!',
          message:
            'Your newly created NFT will be shown as “Pending for Approval” until the administrator validates it.',
          labels: { confirm: 'Continue' },
          closeButton: false,
          persistent: true,
          onConfirm: async () => {
            await goto(routes.sku(_id));
          },
        });
      } catch (error) {
        if (error?.data?.args && Object.keys(error.data.args).length === 0) {
          toast.danger(error.data.message);
        } else {
          setErrors(error.data.args);
        }
      }
    },
    validate: validateSchema(schema),
  });

  function onClose() {
    history.back();
  }

  function handleAddFile(property: 'nftPublicAssets' | 'nftPrivateAssets', error, fileItem) {
    setTouched(property, true);
    setErrors(property, error);
    setData(property, fileItem.file);
  }

  function handleRemoveFile(property: 'nftPublicAssets' | 'nftPrivateAssets') {
    setErrors(property, undefined);
    setData(property, undefined);
  }

  function checkIfFileIsTooBig(file?: File): boolean {
    const size = file ? file.size / 1024 / 1024 : 0;
    return size <= 10;
  }

  function checkIfFileIsCorrectType(file?: File): boolean {
    return !file || ['image/gif', 'image/jpeg', 'image/png'].includes(file.type);
  }

  setContext('errors', errors);

  // Don't show `required` error message when `hasUnlockableContent` becomes true after the form is submitted at least once.
  $: if ($data.hasUnlockableContent) {
    setTouched('nftPrivateAssets', false);
  }
</script>

<div class="container max-w-xl py-10 md:py-16">
  <div class="flex flex-col">
    <div class="relative">
      {#if hasCloseButton && $media.sm}
        <button type="button" on:click={onClose} class="absolute rounded-full text-default">
          <Icon path={mdiArrowLeft} size="1.75" class="transform scale-90 sm:scale-100 md:scale-110 p-1 rounded-full" />
          <span class="sr-only">Back</span>
        </button>
      {/if}
      <h2 class="text-center text-4xl">Create new item</h2>
    </div>
    <div class="text-center text-sm text-gray-500 my-6">
      Create a new Item that will appear on your collection. You can edit the Item later on the collection page.
    </div>
  </div>
  <form
    use:form
    autocomplete="off"
    class="flex flex-col gap-6 relative border border-solid border-gray-100 rounded-md py-10 px-7"
  >
    {#if $isSubmitting}
      <div class="form-overlay" />
    {/if}

    <div class="flex flex-col gap-3">
      <div class="text-2xl">Upload an image</div>
      <div class="text-sm	text-gray-500 flex justify-between">
        <div>Format: JPG, PNG or GIF. Max size: 10MB.</div>
        <div>*Mandatory</div>
      </div>
    </div>
    <div class="flex flex-col">
      <FilePond
        onaddfile={(error, fileItem) => handleAddFile('nftPublicAssets', error, fileItem)}
        onremovefile={() => handleRemoveFile('nftPublicAssets')}
        acceptedFileTypes={ACCEPTED_FILE_TYPES}
        maxFileSize="10MB"
        credits={false}
      />
      {#if $errors.nftPublicAssets}
        <div class="text-red-500 text-xs pt-1">{$errors.nftPublicAssets}</div>
      {/if}
    </div>

    <div class="text-2xl">Item Details</div>
    <FormElement label="Full name*" name="name" helperText={`${$data.name.length} / ${NAME_MAX_CHARS}`} />
    <FormElement
      label="Description*"
      name="description"
      component={Textarea}
      helperText={`${$data.description.length} / ${DESCRIPTION_MAX_CHARS}`}
      rows={3}
    />
    <FormElement
      type="number"
      label="Royalties"
      name="royaltyFeePercentage"
      helperText="Suggested: 0%, 2%, 5%, 10%, 15%. Max: 100%."
      after="%"
    />
    <FormElement label="Supply" name="maxSupply" disabled helperText="Amount of copies that can be minted." />

    <div class="flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <div class="text-2xl">Unlockable Content</div>
        <Switch name="hasUnlockableContent" />
      </div>
      <div class="text-sm	text-gray-500 flex justify-between">
        <div>Add unlockable content that can only be revealed by the owner of the item.</div>
      </div>
    </div>

    {#if $data.hasUnlockableContent}
      <div class="flex flex-col gap-3" transition:slide>
        <div class="text-xl">Add File</div>
        <div class="text-sm	text-gray-500 flex justify-between">Format: JPG, PNG, GIF or PDF. Max size: 10MB.</div>
        <div class="flex flex-col">
          <FilePond
            onaddfile={(error, fileItem) => handleAddFile('nftPrivateAssets', error, fileItem)}
            onremovefile={() => handleRemoveFile('nftPrivateAssets')}
            acceptedFileTypes={ACCEPTED_FILE_TYPES}
            maxFileSize="10MB"
            credits={false}
          />
          {#if $errors.nftPrivateAssets}
            <div class="text-red-500 text-xs pt-1">{$errors.nftPrivateAssets}</div>
          {/if}
        </div>
      </div>
    {/if}

    <div class="flex flex-col gap-4 sm:pt-4 pt-5">
      <Button variant="brand" type="submit" class="flex gap-2 text-2xl leading-7" disabled={$isSubmitting}>
        {#if $isSubmitting && $isValid}
          <DualRingLoader --lds-size="1.75rem" />
        {/if}
        {$isSubmitting && $isValid ? 'Creating new item' : 'Create'}</Button
      >
    </div>
  </form>
</div>
