import { render, fireEvent } from '@testing-library/svelte';
import Gallery from './Gallery.svelte';

const items = [
  {
    height: 550,
    type: 'image/jpg',
    url: 'https://static01.nyt.com/images/2015/09/20/magazine/20abduljabbar1/20mag-20abdul-jabbar-t_CA0-facebookJumbo.jpg',
    width: 1050,
  },
  {
    height: 550,
    type: 'image/jpg',
    url: 'https://static01.nyt.com/images/2019/06/05/business/00tesla1/00tesla1-facebookJumbo-v2.jpg',
    width: 1050,
  },
  {
    height: 550,
    type: 'image/jpg',
    url: 'https://static01.nyt.com/images/2020/01/31/arts/29jlo-notebook1/29jlo-notebook1-facebookJumbo.jpg',
    width: 1050,
  },
  {
    height: 550,
    type: 'image/jpg',
    url: 'https://static01.nyt.com/images/2017/07/01/upshot/up30-video-games/up30-video-games-facebookJumbo.jpg',
    width: 1050,
  },
];

const unRecognizedItems = [
  {
    bucket: 's3-bucket',
    hash: 'hash1235',
    height: 100,
    key: '1234',
    size: 100,
    type: 'type',
    url: 'http://google.com',
    width: 100,
  },
];

const setup = () => {
  const { getAllByRole, container, getByText, component } = render(Gallery, { props: { items: items } });
  const images = getAllByRole('img');
  const imagesTobeSelected = [...images].splice(1, images.length - 2);
  return {
    images,
    container,
    getAllByRole,
    getByText,
    imagesTobeSelected,
    component,
  };
};

describe('Gallery', () => {
  it('should be render correctly with Unrecognized section', () => {
    const { getByText } = render(Gallery, { props: { items: unRecognizedItems } });
    const unRecognized = getByText('Unrecognized type');
    expect(unRecognized).toBeInTheDocument();
  });

  it('should be render correctly', () => {
    const { images, imagesTobeSelected } = setup();
    const imgSelect = images[0];
    const background = images[images.length - 1];
    expect(images).toHaveLength(items.length + 2);
    expect(imgSelect).toHaveAttribute('alt', 'preview');
    expect(imgSelect).toHaveAttribute('src', items[0].url);
    expect(background).toHaveAttribute('src', items[0].url);
    let index = 0;
    for (const img of imagesTobeSelected) {
      expect(img).toHaveAttribute('src', items[index].url);
      expect(img).toHaveAttribute('alt', '');
      index++;
    }
  });

  it('click in images should be the main image', async () => {
    const onClick = jest.fn();
    const { imagesTobeSelected, component, getAllByRole } = setup();
    component.$on('click', onClick);
    const imgToBeClicked = imagesTobeSelected[1];
    await fireEvent.click(imgToBeClicked);
    const imgs = getAllByRole('img');
    expect(imgs[0]).toHaveAttribute('src', items[1].url);
  });

  it('click in images should be the background image', async () => {
    const onClick = jest.fn();
    const { imagesTobeSelected, component, getAllByRole } = setup();
    component.$on('click', onClick);
    const imgToWillBeBackground = imagesTobeSelected[1];
    await fireEvent.click(imgToWillBeBackground);
    const imgs = getAllByRole('img');
    expect(imgs[0]).toHaveAttribute('src', items[1].url);
  });
});
