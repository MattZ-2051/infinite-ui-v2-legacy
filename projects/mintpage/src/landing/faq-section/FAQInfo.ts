export type FaqLine = {
  title: string;
  text: string;
};

export const FaqInfo: FaqLine[] = [
  {
    title: 'How can I buy NFTs on the Exchange?',
    text: 'There are two ways to buy NFTs on the Exchange. Buying from original Creators or buying from Collectors. Please refer to the More FAQs button for further information.',
  },
  {
    title: 'What is the difference between a Creator and a Collector?',
    text: 'A Creator is an issuer of an NFT, while a Collector is someone who bought an NFT (that was issued by the Creator) and is holding onto it or is reselling it on the Exchange.',
  },
  {
    title: 'What is Hedera Token Service (HTS)?',
    text: 'Hedera Token Service, or HTS for short, is the standard that is used to create Hedera NFTs. You can think of HTS similar to how you would think of ERC721 and Ethereum NFTs.',
  },
];
