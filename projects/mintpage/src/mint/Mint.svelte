<script lang="ts">
  import { onMount } from 'svelte';
  import { formatCurrency } from '$util/format';
  import { MintPageABI } from '$lib/web3/contracts/mintPage/MintPageABI';
  import Button from '$lib/components/Button.svelte';
  import {
    checkNetwork,
    getNumberOfTokensOwned,
    getPendingTransaction,
    getSaleStatus,
    getTotalSupply,
    getWalletInfo,
    handleWalletConnection,
    mintTo,
    walletConnected,
  } from '$lib/web3';
  import { variables } from '$lib/variables';
  import { toast } from '$ui/toast';
  import Minus from './Minus.svelte';
  import Plus from './Plus.svelte';
  import metamaskLogo from '../assets/metamask-logo.png';
  import {
    MP_MINT_TITLE,
    MP_MAX_SUPPLY,
    MP_MINT_PRICE,
    MP_MAX_PER_WALLET,
    MP_PREFERRED_WALLET,
    MP_CONTRACT_ADDRESS,
  } from '../variables';

  const etherscanUrl = variables.ethNetwork.nftExplorerUrl;
  const isProduction = variables.ethNetwork.mmNetwork === 'mainnet';
  const contractAddress = MP_CONTRACT_ADDRESS;
  const contractAbi = MintPageABI;
  const contractParamaters = {
    contractAddress: MP_CONTRACT_ADDRESS,
    contractAbi: MintPageABI,
  };

  let saleStatus = false;
  let tokenCount = 1;
  let supplyLeft = undefined;
  $: total = (tokenCount * MP_MINT_PRICE).toFixed(2);
  $: userTokenCount = 0;

  async function getUserTokensNumber() {
    userTokenCount = await getNumberOfTokensOwned(contractParamaters).then((result) => result.toNumber());
  }

  async function getUserInfo() {
    await getWalletInfo();
    await getUserTokensNumber();
  }

  async function checkPendingTransaction(receipt) {
    try {
      const mintingReceipt = await getPendingTransaction(receipt.hash);
      toast.success(
        `Successful Mint! View your transaction on etherscan <a href=${etherscanUrl}${mintingReceipt} target="_blank" rel="noopener noreferrer">${receipt.hash}</a>`
      );
    } catch {
      return;
    }
  }

  async function mint() {
    let errorMessage: string;
    saleStatus = await getSaleStatus(contractParamaters);
    try {
      const receipt = await mintTo({ contractAddress, contractAbi, price: total.toString(), amount: tokenCount });
      toast.success(
        `Your transaction has been submitted <a href=${etherscanUrl}${receipt.hash} target="_blank" rel="noopener noreferrer">${receipt.hash}</a>`
      );
      await checkPendingTransaction(receipt);
      await getUserInfo();
    } catch (error) {
      errorMessage = error.message;
      if (error.message.includes('insufficient funds for intrinsic')) {
        errorMessage = 'Insufficient Funds.';
      } else if (error.message.includes('The sale is paused')) {
        errorMessage = 'The sale is paused.';
      } else if (error.message.includes('Ownable: caller is not the owner')) {
        errorMessage = 'You must be the owner to use this method';
      } else if (error.message.includes('Not more than 5')) {
        errorMessage = `You cannot mint more than ${MP_MAX_PER_WALLET}`;
      }
      toast.danger(errorMessage, { toastId: 'mintError' });
    }
  }

  async function mintHandler() {
    if (!$walletConnected) {
      const result = await handleWalletConnection();
      if (isProduction) {
        const network = await checkNetwork();
        if (network.chainId !== 1) {
          toast.danger('Please connect to Ethereum Mainnet.', { toastId: 'WRONG_NETWORK' });
          return;
        }
      }
      if (result) {
        toast.success('MetaMask Connected', { toastId: 'walletConnect' });
      }
    } else {
      if ($walletConnected) {
        await getUserInfo();
        if (userTokenCount >= MP_MAX_SUPPLY) {
          return;
        } else {
          await mint();
        }
      }
    }
  }

  onMount(async () => {
    try {
      const response = await getTotalSupply({ contractAddress });
      supplyLeft = MP_MAX_SUPPLY - Number.parseInt(response.result);
    } catch {
      supplyLeft = undefined;
    }
  });

  function add(diff: 1 | -1) {
    tokenCount = Math.max(1, Math.min(tokenCount + diff, MP_MAX_PER_WALLET - userTokenCount));
  }
</script>

<div class="flex flex-col items-center lg:flex-row {$$props.class}">
  <div class="font-bold text-black font-lora-serif text-2xl mt-12 capitalize">
    {MP_MINT_TITLE}
  </div>
  <div class="flex flex-col items-center mt-3 lg:flex-row">
    <span class="font-normal text-black">Collection: {supplyLeft === undefined ? MP_MAX_SUPPLY : supplyLeft}</span>
    <div class="border-l-2 border-black mr-4 ml-4 h-4 rotate-90 lg:rotate-0" />
    <span class="font-normal text-black">Max: {MP_MAX_PER_WALLET} per wallet</span>
    <div class="border-l-2 border-black mr-4 ml-4 h-4 rotate-90 lg:rotate-0" />
    <span class="font-normal text-black">
      Mint price: <strong>{MP_MINT_PRICE} ETH</strong>
    </span>
  </div>
  <div class="flex flex-col mt-6 pr-4 pl-4 lg:pr-0 lg:pl-0 lg:flex-row">
    <div class="flex mt-2 mb-6 lg:mb-0 lg:mt-0">
      <div class="flex items-center pl-6 pr-6 rounded-l-xl bg-[#F5F5F5] stepper">
        <button type="button" class="h-8 px-4" on:click={() => add(-1)}>
          <Minus />
        </button>
        <span class="text-black text-3xl font-lora-serif font-bold">{tokenCount}</span>
        <button type="button" class="h-8 px-4" on:click={() => add(1)}>
          <Plus />
        </button>
      </div>
      <div class="flex flex-col items-center justify-center lg:mr-6 pl-10 pr-10 border-l-0 rounded-r-xl stepper">
        <div class="text-black opacity-80">Total:</div>
        <div class="text-black"><strong>{formatCurrency(total, { currency: 'ETH' })}</strong></div>
      </div>
    </div>
    <Button variant="brand" on:click={mintHandler}>
      <span class="capitalize text-white font-lora-serif font-bold text-lg">Mint now</span>
    </Button>
  </div>
  <div class="flex items-center mt-6 mb-12 pr-4 pl-4 lg:pr-0 lg:pl-0 lg:mb-0">
    <span class="text-black opacity-50 italic capitalize">{MP_PREFERRED_WALLET}</span>
    <img src={metamaskLogo} alt="Metamask logo" class="ml-3 h-6" />
  </div>
</div>

<style>
  .stepper {
    border: 1px solid #ebebeb;
  }
</style>
