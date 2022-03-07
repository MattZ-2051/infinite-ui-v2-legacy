import { render, fireEvent, screen } from '@testing-library/svelte';
import type { StatusMintButton } from './types';
import { messages, MINT_STATUS, PROCESSED_STATUS, PROCESSING_STATUS } from './constants';
import MintButton from './mintButton.svelte';

let isMint = false;
const processed = () => {
  isMint = !isMint;
};
const toMint = () => {
  isMint = !isMint;
};

const setup = (status: StatusMintButton = MINT_STATUS) => {
  const { getByText, getByAltText, component } = render(MintButton, {
    props: { status, toMint, processed },
  });
  return { getByText, getByAltText, component };
};

describe('Mint button', () => {
  it('should be render correctly', () => {
    const { getByText, getByAltText } = setup();
    const toMintText = getByText(messages.toMint);
    const toMintAltImg = getByAltText(MINT_STATUS);
    expect(toMintText).toBeInTheDocument();
    expect(toMintAltImg).toBeInTheDocument();
  });

  it('should be render with processing status', () => {
    const { getByText } = setup(PROCESSING_STATUS);
    const toMintText = getByText(messages.processing);
    expect(toMintText).toBeInTheDocument();
  });

  it('should be render with processed status', () => {
    const { getByText, getByAltText } = setup(PROCESSED_STATUS);
    const toMintText = getByText(messages.processed);
    const toMintAltImg = getByAltText(PROCESSED_STATUS);
    expect(toMintText).toBeInTheDocument();
    expect(toMintAltImg).toBeInTheDocument();
  });

  it('should be emit click event corrently', async () => {
    const onClick = jest.fn();
    const { getByText, component } = setup(PROCESSED_STATUS);
    const toMintText = getByText(messages.processed);
    expect(toMintText).toBeInTheDocument();
    component.$on('click', onClick);
    const button: HTMLElement = screen.getByRole('button');
    button.click();
    await fireEvent.click(button as HTMLElement);
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
