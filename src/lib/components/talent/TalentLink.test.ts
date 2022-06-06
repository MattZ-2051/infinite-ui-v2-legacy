import { render } from '@testing-library/svelte';
import routes from '$project/routes';
import TalentLink from './TalentLink.svelte';

const profile = {
  username: 'test',
  profilePhotoUrl: 'test.jpg',
  verified: true,
};

jest.mock('$lib/variables', () => {
  return { variables: { issuerPageEnabled: true } };
});

describe('TalentLink', () => {
  it('renders correctly with all components', () => {
    const { getByText, getByTestId } = render(TalentLink, {
      props: { profile },
    });
    const Link = getByText(profile.username);
    const ProfilePhoto = getByTestId('talentlink-profile-photo');
    const VerifiedIcon = getByTestId('icon-verified');

    expect(Link).toBeInTheDocument();
    expect(ProfilePhoto).toBeInTheDocument();
    expect(VerifiedIcon).toBeInTheDocument();
  });

  it('renders correctly with no profile img prop', () => {
    const { getByText, getByTestId, queryByTestId } = render(TalentLink, {
      props: { profile: { ...profile, profilePhotoUrl: undefined } },
    });
    const Link = getByText(profile.username);
    const ProfilePhoto = queryByTestId('talentlink-profile-photo');
    const VerifiedIcon = getByTestId('icon-verified');

    expect(Link).toBeInTheDocument();
    expect(ProfilePhoto).not.toBeInTheDocument();
    expect(VerifiedIcon).toBeInTheDocument();
  });

  it('renders correctly with no img due to hideImg prop', () => {
    const { getByText, getByTestId, queryByTestId } = render(TalentLink, {
      props: { profile, hideImage: true },
    });
    const Link = getByText(profile.username);
    const ProfilePhoto = queryByTestId('talentlink-profile-photo');
    const VerifiedIcon = getByTestId('icon-verified');

    expect(Link).toBeInTheDocument();
    expect(ProfilePhoto).not.toBeInTheDocument();
    expect(VerifiedIcon).toBeInTheDocument();
  });

  it('renders correctly with no verified icon due to no verified profile', () => {
    const { getByText, getByTestId, queryByTestId } = render(TalentLink, {
      props: { profile: { ...profile, verified: undefined } },
    });
    const Link = getByText(profile.username);
    const ProfilePhoto = getByTestId('talentlink-profile-photo');
    const VerifiedIcon = queryByTestId('icon-verified');

    expect(Link).toBeInTheDocument();
    expect(ProfilePhoto).toBeInTheDocument();
    expect(VerifiedIcon).not.toBeInTheDocument();
  });

  it('does not render anything when no profile prop', () => {
    const { queryByText, queryByTestId } = render(TalentLink, {
      props: { profile: undefined },
    });
    const Link = queryByText(profile.username);
    const ProfilePhoto = queryByTestId('talentlink-profile-photo');
    const VerifiedIcon = queryByTestId('icon-verified');

    expect(Link).not.toBeInTheDocument();
    expect(ProfilePhoto).not.toBeInTheDocument();
    expect(VerifiedIcon).not.toBeInTheDocument();
  });

  it('links to issuer profile page when issuerPageEnabled variable is truthy', () => {
    const { getByText } = render(TalentLink, {
      props: { profile },
    });
    const Link = getByText(profile.username) as HTMLAnchorElement;
    expect(Link.href).toBe('http://localhost' + routes.collection(profile?.username));
  });
});
