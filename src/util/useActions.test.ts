import useActions from './useActions';

describe('useActions', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  afterEach(() => {
    element.remove();
  });

  it('pass action to the element', async () => {
    const customAction = jest.fn();
    useActions(element, [[customAction, 10]]);

    expect(customAction).toHaveBeenCalledWith(element, 10);
  });

  it('call update for actions', async () => {
    const updateFunction = jest.fn();
    const customAction = jest.fn().mockReturnValue({ update: updateFunction }) as jest.Mock<{
      update: () => void;
    }>;
    const actions = useActions(element, [[customAction, 10]]);

    expect(updateFunction).not.toHaveBeenCalled();
    actions.update([[customAction, 20]]);
    expect(customAction).not.toHaveBeenCalledWith(20);
    expect(updateFunction).toHaveBeenCalledWith(20);
  });
});
