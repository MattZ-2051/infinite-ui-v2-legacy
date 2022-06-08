<script lang="ts">
  import { handleResentEmail } from '$lib/user';

  export let email = '';

  let seconds = 60;
  let disabledButton = false;

  const TIME_OUT_SECONDS = 1000;

  const subtractSeconds = () => (seconds = seconds - 1);

  let startTimer = undefined;

  const removeTimer = () => {
    clearInterval(startTimer);
    seconds = 60;
  };

  const handleResendEmail = async () => {
    disabledButton = true;
    const { success } = await handleResentEmail(email);
    disabledButton = !success;
    if (success) {
      startTimer = setInterval(() => {
        seconds > 0 && subtractSeconds();
        seconds === 0 && removeTimer();
      }, TIME_OUT_SECONDS);
    }
  };
</script>

<div
  class="container flex flex-col font-medium justify-center justify-items-center content-center main-container text-primary-dark"
>
  <h2 class="text-4xl py-4 title">Please verify your email address to continue</h2>
  <p class="text-base">
    We've sent and email to <span class="font-bold">{email}</span> with instructions to verify your account.
  </p>
  {#if seconds === 60}
    <p class="text-sm py-4">
      Didn't receive an email yet?
      <button
        class="font-bold cursor-pointer resend-button"
        disabled={disabledButton}
        on:click={() => handleResendEmail()}>Resend email</button
      >
    </p>
  {:else}
    <p class="text-sm py-4">
      Check your inbox ({seconds}s)
    </p>
  {/if}
</div>

<style>
  .main-container {
    height: 80vh;
    width: 100%;
    align-items: center;
    text-align: center;
    background-color: #ffffff;
    color: #000000;
  }
  .title {
    max-width: 40%;
  }

  .resend-button {
    all: unset;
    cursor: pointer;
    font-weight: 600;
  }
</style>
