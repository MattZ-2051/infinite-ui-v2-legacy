import { render, fireEvent, screen } from '@testing-library/svelte';
import type { StatusMintButton } from './types';
import { messages, MINT_STATUS, PROCESSED_STATUS } from './constants';
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
    const { getByText } = setup();
    const toMintText = getByText(messages.toMint);
    expect(toMintText).toBeInTheDocument();
  });

  it('should be render with processed status', () => {
    const { getByText } = setup(PROCESSED_STATUS);
    const toMintText = getByText(messages.processed);
    expect(toMintText).toBeInTheDocument();
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
