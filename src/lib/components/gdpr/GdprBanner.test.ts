import { render, fireEvent } from '@testing-library/svelte';
import { readable } from 'svelte/store';
import * as gdprStore from './gdpr.store';
import GdprBanner from './GdprBanner.svelte';

jest.mock('./gdpr.store', () => {
  return { isBannerVisible: readable(true), hideBanner: jest.fn(), initializeBanner: jest.fn() };
});

describe('GdprBanner', () => {
  afterEach(() => jest.clearAllMocks());

  it('renders correctly', async () => {
    const { container, getByText } = render(GdprBanner);
    const cookiePolicyLink = getByText('Cookie Policy.');

    expect(container).toHaveTextContent('We value your privacy');
    expect(container).toHaveTextContent(
      'We use cookies to operate our services. We also share information about your use of our site with our advertising and analytics partners in the United States. By clicking “Accept” you agree to our use of cookies.'
    );
    expect(gdprStore.initializeBanner).toHaveBeenCalled();
    expect(cookiePolicyLink.tagName).toBe(`A`);
    expect(cookiePolicyLink).toHaveAttribute('href', '/cookies');
    expect(getByText('Reject').tagName).toBe(`BUTTON`);
    expect(getByText('Accept').tagName).toBe(`BUTTON`);
  });

  it('handles accept action', async () => {
    const { getByText } = render(GdprBanner);
    const acceptButton = getByText('Accept');
    await fireEvent.click(acceptButton);

    expect(gdprStore.hideBanner).toHaveBeenCalled();
  });

  it('handles reject action', async () => {
    const { getByText } = render(GdprBanner);
    const rejectButton = getByText('Reject');
    await fireEvent.click(rejectButton);

    expect(gdprStore.hideBanner).toHaveBeenCalled();
  });
});
