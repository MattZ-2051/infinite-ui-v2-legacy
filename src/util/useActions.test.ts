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

  it('will add actions on update if new', async () => {
    const updateFunction = jest.fn();
    const customAction = jest.fn().mockReturnValue({ update: updateFunction }) as jest.Mock<{
      update: () => void;
    }>;
    const actions = useActions(element, [[customAction, 10]]);

    const newUpdateFunction = jest.fn();
    const newCustomAction = jest.fn().mockReturnValue({ update: newUpdateFunction }) as jest.Mock<{
      update: () => void;
    }>;

    expect(updateFunction).not.toHaveBeenCalled();
    actions.update([
      [customAction, 20],
      [newCustomAction, 'abc'],
    ]);

    expect(newCustomAction).toHaveBeenCalledWith(element, 'abc');
    expect(newUpdateFunction).not.toHaveBeenCalledWith('abc');

    actions.update([
      [customAction, 30],
      [newCustomAction, 'dec'],
    ]);
    expect(updateFunction).toHaveBeenCalledWith(30);
    expect(newUpdateFunction).toHaveBeenCalledWith('dec');
  });

  it('will destroy actions', async () => {
    const destroyFunction = jest.fn();
    const customAction = jest.fn().mockReturnValue({ destroy: destroyFunction }) as jest.Mock<{
      destroy: () => void;
    }>;
    const actions = useActions(element, [customAction]);

    expect(destroyFunction).not.toHaveBeenCalled();
    actions.destroy();
    expect(destroyFunction).toHaveBeenCalled();
  });
});
