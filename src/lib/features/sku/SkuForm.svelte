<script lang="ts">
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
  import { CLIENT_API_HEADER } from '$project/variables';
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
  import { put } from '$lib/api';
  import { media } from '$lib/media-query.store';
  import { createSku, uploadAsset } from './sku.api';

  registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize, FilePondPluginImagePreview);

  const hasCloseButton = browser && history.length > 1;
  const ACCEPTED_FILE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'video/quicktime',
    'video/mov',
    'video/mp4',
    'audio/mpeg',
  ];
  const NAME_MAX_CHARS = 45;
  const DESCRIPTION_MAX_CHARS = 2100;
  const ROYALTY_FEE_PERCENTAGE_MAX_VAL = 20;
  const FILe_MAX_SIZE = 10;
  const formatLabel = 'JPEG, PNG, GIF, MOV, MP4 or MP3';
  const fileValidateTypeLabelExpectedTypes = `Expects ${formatLabel}`;
  const labelIdle = 'Drag & Drop your file or <span class="filepond--label-action"> Browse </span>';

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
      .max(
        ROYALTY_FEE_PERCENTAGE_MAX_VAL,
        `Royalties must be less than or equal to ${ROYALTY_FEE_PERCENTAGE_MAX_VAL}.`
      ),
    maxSupply: yup.number().oneOf([1], 'Supply must be 1.'),
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

  const { form, errors, data, isSubmitting, isValid, setTouched, setData, setErrors } = createForm<{
    name: string;
    description: string;
    supplyType: SupplyType;
    currency: CurrencyType;
    issuer: string;
    issuerName: string;
    maxSupply: number;
    featured: boolean;
    royaltyFeePercentage?: number;
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
      // eslint-disable-next-line unicorn/no-null
      nftPublicAssets: null,
      // eslint-disable-next-line unicorn/no-null
      nftPrivateAssets: null,
    },
    onSubmit: async ({ nftPublicAssets, nftPrivateAssets, hasUnlockableContent, royaltyFeePercentage, ...rest }) => {
      try {
        const { _id } = await createSku({
          royaltyFeePercentage: royaltyFeePercentage || 0,
          nftPublicAssets: [
            {
              url: await getAssetUrl(nftPublicAssets, 'public'),
            },
          ],
          ...(hasUnlockableContent && {
            nftPrivateAssets: [
              {
                url: await getAssetUrl(nftPrivateAssets, 'private'),
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
        if (error.data) {
          if (error.data.args && Object.keys(error.data.args).length > 0) {
            setErrors(error.data.args);
          } else {
            toast.danger(error.data.message);
          }
        } else {
          toast.danger('Whoops, something went wrong - please try again.');
        }
      }
    },
    validate: validateSchema(schema),
  });

  async function getAssetUrl(asset: File, assetType: 'public' | 'private'): Promise<string> {
    const { presignedUrl, attachmentUrl } = await uploadAsset({
      assetType,
      fileName: asset.name,
      tenant: CLIENT_API_HEADER,
    });

    await put(presignedUrl, asset);
    return attachmentUrl;
  }

  function onClose() {
    history.back();
  }

  function checkIfFileIsTooBig(file?: File): boolean {
    const size = file ? file.size / 1024 / 1024 : 0;
    return size <= FILe_MAX_SIZE;
  }

  function checkIfFileIsCorrectType(file?: File): boolean {
    return !file || ACCEPTED_FILE_TYPES.includes(file.type);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleAddFile(asset: 'nftPublicAssets' | 'nftPrivateAssets', error: any, fileItem: any): void {
    if (!error) {
      setData(asset, fileItem.file);
    }
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
    <div class="text-center text-sm text-gray-500 my-6">Create a new Item that will appear on your collection.</div>
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
      <div class="text-2xl">Upload a file</div>
      <div class="text-sm	text-gray-500 flex justify-between">
        <div>
          Format: {formatLabel}
          <div>Max size: {FILe_MAX_SIZE}MB.</div>
        </div>
        <div>*Mandatory</div>
      </div>
    </div>
    <div class="flex flex-col">
      <FilePond
        {labelIdle}
        {fileValidateTypeLabelExpectedTypes}
        name="nftPublicAssets"
        acceptedFileTypes={ACCEPTED_FILE_TYPES}
        maxFileSize="{FILe_MAX_SIZE}MB"
        credits={false}
        onaddfile={handleAddFile.bind(undefined, 'nftPublicAssets')}
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
      helperText="Suggested: 0%, 2%, 5%, 10%, 15%. Max: {ROYALTY_FEE_PERCENTAGE_MAX_VAL}%."
      after="%"
    />
    <FormElement
      type="number"
      label="Supply"
      name="maxSupply"
      helperText="Amount of copies that can be minted."
      disabled
    />

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
        <div class="text-sm	text-gray-500 flex justify-between">
          <div>
            Format: {formatLabel}.
            <div>Max size: {FILe_MAX_SIZE}MB.</div>
          </div>
        </div>
        <div class="flex flex-col">
          <FilePond
            {labelIdle}
            {fileValidateTypeLabelExpectedTypes}
            name="nftPrivateAssets"
            acceptedFileTypes={ACCEPTED_FILE_TYPES}
            maxFileSize="{FILe_MAX_SIZE}MB"
            credits={false}
            onaddfile={handleAddFile.bind(undefined, 'nftPrivateAssets')}
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
