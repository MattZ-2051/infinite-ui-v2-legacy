export type FaqLine = {
  title: string;
  content: string[];
};

const htmlifyContent = (text) => {
  const splittedText = text.split('\n');
  return splittedText
    .map((paragraph, index) => `<p class="${index !== splittedText.length - 1 && 'mb-6'}">${paragraph}</p>`)
    .join('');
};

export const FaqInfo: FaqLine[] = [
  {
    title: 'What is an NFT?',
    text: `An NFT (Non-Fungible Token) is a non-interchangeable unit of data stored on a blockchain, a form of digital ledger, that can be sold and traded to represent ownership of unique items. 
    \n
    Types of NFT data units may be associated with digital files such as photos, videos, audio & even real estate. Because each token is uniquely identifiable, NFTs differ from blockchain cryptocurrencies, such as Ethereum. `,
  },
  {
    title: 'What is a (crypto) wallet? & Why do I need one?',
    text: `A crypto wallet is similar to your physical wallet, containing money (in the form of cryptocurrency) & form of ID. Your crypto wallet does the same thing as a physical wallet but on the blockchain. 
    \n
    Your wallet will have an "ID" (a long sequence of numbers & letters), your cryptocurrency balance & any NFTs you have bought with those cryptocurrencies. There are a number of crypto wallet providers, including Metamask which is the most popular and user-friendly. 
    \n
    When you create a crypto wallet, you'll get what is called a “seed phrase”, this is made up of a series of words which will let you recover your cryptocurrency or NFTs if you lose access. It is important that you NEVER give this phrase to anyone.
    \n
    Anyone who knows your “seed phrase” can gain full access to your wallet and could buy, sell or transfer any funds or assets so it's important to keep this safe. `,
  },
  {
    title: 'What is a marketplace?',
    text: `The marketplace is where you can buy McLaren NFTs.
    \n
    Please note, the marketplace may be affected by maintenance as well as cooldown periods during times of high traffic (such as Genesis Drop).`,
  },
].map((article) => ({ ...article, content: htmlifyContent(article.text) }));
