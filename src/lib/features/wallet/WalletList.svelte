<script lang="ts">
  import { Tabs, Tab } from '$ui/tabs';

  let dummyContent = [
    {
      message: 'You bought Goat IV #2321 from @jamesjean',
      date: 'Apr 20,2021',
      amount: -200,
      img: '/c.png',
    },
    {
      message: 'You added funds by depositing 1.123 BTC using Coinbase',
      date: 'May 20,2021',
      amount: 490,
      img: '/arrow-right.png',
    },
    {
      message: 'You withdrew funds to your bank account ending 5678',
      date: 'Apr 29,2021',
      amount: 800,
      img: '/arrow-left.png',
    },
    {
      message: 'You sold K8IROS 8.1 — BK Shadow #2468 to @drbrown',
      date: 'June 24,2021',
      amount: -700,
      img: '/dollar.png',
    },
  ];
</script>

<div>
  <Tabs itemClass={'tracking-tighter text-2xl pb-5 tab-header'}>
    <Tab title="Latest Transactions">
      <ul class="mt-3">
        {#each dummyContent as example}
          <li class="py-6 flex li-style">
            <img class="w-8 h-8" src={example.img} alt="img" />
            <div class="flex flex-wrap flex-col sm:flex-row gap-x-12 gap-y-2 ml-5 w-full">
              <span style="flex-grow: 9999;">{example.message}</span>
              <div class="flex-grow sm:w-80 flex flex-wrap justify-between">
                <span class="message font-extrabold italic">{example.date}</span>
                <span class="text-right {example.amount < 0 ? 'withdraw-color' : 'deposit-color'}"
                  >{example.amount < 0 ? `-$` : `+$`}{Math.abs(example.amount)}</span
                >
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </Tab>
    <Tab title="Active Bids">
      <ul>
        <li>YOOO ASDSADA2</li>
        <li>YOOO ASDSADA2</li>
        <li>YOOO ASDSADA2</li>
        <li>YOOO ASDSADA2</li>
        <li>YOOO ASDSADA2</li>
      </ul>
    </Tab>
  </Tabs>
</div>

<style>
  .li-style {
    border-bottom: 1px solid #ebebeb;
  }
  .message {
    color: #9e9e9e;
  }
  .deposit-color {
    color: #00c44f;
  }
  .withdraw-color {
    color: #da1010;
  }
</style>
