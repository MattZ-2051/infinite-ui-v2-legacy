import { render } from '@testing-library/svelte';
import UserLink from './UserLink.svelte';
import UserLinkPrefixSlot from './testComponents/UserLinkPrefixSlotTest.svelte';

const username = 'username';
const prefix = 'prefix';
const sharedProperties = { username };

describe('UserLink', () => {
  it('renders when username', () => {
    const { getByText } = render(UserLink, { props: sharedProperties });
    const { nodeName, textContent } = getByText('@' + username);
    expect(nodeName).toBe('A');
    expect(textContent).toBe(`@${username}`);
  });

  it('does not render when no username', () => {
    const { queryByText } = render(UserLink, { props: {} });
    const anchorElement = queryByText(`@${username}`);
    expect(anchorElement).not.toBeInTheDocument();
  });

  it('renders with prefix', () => {
    const { getByText } = render(UserLink, { props: { ...sharedProperties, prefix } });
    const { nodeName, textContent } = getByText(prefix);
    expect(nodeName).toBe('SPAN');
    expect(textContent).toBe(`${prefix} @${username}`);
  });

  it('renders without prefix', () => {
    const { queryByText } = render(UserLink, { props: sharedProperties });
    const prefixElement = queryByText(prefix);
    expect(prefixElement).not.toBeInTheDocument();
  });

  it('should support passing of a class prop', () => {
    const { getByText } = render(UserLink, { props: { ...sharedProperties, class: 'my-custom-class' } });
    const anchorElement = getByText(`@${username}`);

    expect(anchorElement).toHaveClass('my-custom-class');
  });

  it('renders with prefix slot', () => {
    const { getByText } = render(UserLinkPrefixSlot);
    const { nodeName, textContent } = getByText('from');
    expect(nodeName).toBe('SPAN');
    expect(textContent).toBe('from');
  });
});
