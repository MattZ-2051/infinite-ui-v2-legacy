<script lang="ts">
  import { Tabs, Tab } from '$ui/tabs';
</script>

<div class="">
  <div>
    <Tabs
      class="text-xl md:text-2xl"
      itemClass={'tracking-tighter pb-5 tab-header'}
      deactivateSignle={false}
    >
      <Tab title="Total Balance">
        <p class="text-5xl py-4 tracking-tight">$4500</p>
      </Tab>
    </Tabs>
  </div>
  <div class="mt-4">
    <p class="available">Available:</p>
    <p class="money">
      $3750<span class="text-sm explanation">(Excludes pending transactions)</span>
    </p>
  </div>
  <div class="flex flex-col mt-10">
    <button class="mb-8 rounded-full py-4 text-white deposit text-xl tracking-tight "
      >Deposit</button
    >
    <button class="rounded-full withdrawal py-4 text-xl tracking-tight">Withdrawal</button>
  </div>
</div>

<style>
  .available {
    color: #9e9e9e;
  }
  .money {
    color: #000000;
  }
  .explanation {
    color: #9e9e9e;
  }
  .deposit {
    background: #000000;
  }
  .withdrawal {
    border: 2px solid #000000;
    color: #000000;
  }
</style>
