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
    text: `An NFT (Non-Fungible Token) is a one-of-a-kind unit of data that can be sold or traded to represent ownership of unique items. NFTs can be attached to any digital file, including photos, videos, audio, or even virtual real estate. These assets are the building blocks of a connected virtual world called the ‘metaverse’, and are bought and sold with cryptocurrency on an infrastructure known as the blockchain. 
    \n
    All NFTs are stored on the blockchain, which records ownership of digital assets through records that are near-impossible to hack. Every time an NFT is traded or sold, that transaction is stored for all to see - adding another 'block' of data to the 'chain'. NFTs are bought and sold with cryptocurrency, such as Ethereum. `,
  },
  {
    title: 'What is a crypto wallet and how do I set one up?',
    text: `There are two ways of buying a  McLaren NFT: via card payment, or by using cryptocurrency with a MetaMask wallet. If you choose to purchase the NFT with a card payment, you will still need to create a MetaMask wallet to generate (or 'mint') your NFT once your purchase has been completed. A crypto wallet is similar to your physical wallet, containing money (in the form of cryptocurrency) and a form of ID. Your crypto wallet does the same thing as a physical wallet, but on the blockchain. 
    \n
    Your wallet will have  its own 'ID' and contains both your cryptocurrency balance and any NFTs you have bought with those cryptocurrencies. There are a number of crypto wallet providers, including MetaMask, which is widely-used, secure, and user-friendly. 
    \n
    When you create a crypto wallet, you’ll get what is called a 'seed phrase'. This  phrase is made up of a series of words which will let you recover your cryptocurrency or NFTs if you lose access. It is important that you never give this phrase to anyone.
    \n
    Anyone who knows your 'seed phrase' can gain full access to your wallet and could buy, sell or transfer any funds or assets so it’s important to keep this safe. It’s important to remember that McLaren will never ask for your seed phrase.
    \n
    To create your MetaMask wallet, <a class="font-bold" href="https://metamask.io/" target="_blank">click here</a>.`,
  },
  {
    title: 'How can I buy a McLaren NFT?',
    text: `Our first NFT Collection will be available via an invite-only model. Those who own a physical McLaren car and are signed up to the McLaren mailing list will gain immediate access to Phase 1, with Phase 2 access opening to specially invited individuals 48  hours later. McLaren NFTs follow the ERC-721 standard and will be minted on the Ethereum blockchain.  At the time of minting, the user will be able to select what wallet address the NFTs will be minted to.
    \n
    Once those who have been invited are registered for the allowlist, you’ll be sent a unique code along with instructions on how to access the marketplace. This is where you can buy McLaren NFTs once the Collection goes live.
    \n
    It’s also where you can stay up-to-date on the latest news from MSO LAB and see the development of our Roadmap. Please note, the marketplace may be affected by maintenance as well as cooldown periods during times of high traffic (such as the launch of the Collection). 
    \n
    For those who do not receive an invite to the Genesis Collection mint, there will be future public McLaren Automotive drops that you can be a part of.
    \n
    For more information on purchasing your NFT and creating a crypto wallet, see <a class="font-bold" href="https://cars.mclaren.com/gb-en/nft-faqs" target="_blank">What is a crypto wallet and how do I set one up?</a>
    \n
    If you’d like to review the McLaren Privacy Policy, please follow this link <a class="font-bold" href="https://cars.mclaren.com/gb-en/privacy-policy" target="_blank">here</a>.`,
  },
].map((article) => ({ ...article, content: htmlifyContent(article.text) }));
